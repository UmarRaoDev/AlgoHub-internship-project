import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUsersRequest, updateUserRoleRequest, deleteUserRequest } from "../api/userApi";

const ROLES = ["user", "editor", "admin"];

export default function AdminUsers() {
  const { accessToken, user: currentUser } = useAuth();
  const isAdmin = currentUser.role === "admin";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllUsersRequest(accessToken);
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [accessToken]);

  async function handleRoleChange(id, role) {
    setUpdatingId(id);
    setError("");
    try {
      const data = await updateUserRoleRequest(id, role, accessToken);
      setUsers((prev) => prev.map((u) => (u._id === id ? data.user : u)));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id, name) {
    const confirmed = window.confirm(`Delete ${name}'s account? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    try {
      await deleteUserRequest(id, accessToken);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
    );
  }, [users, search]);

  return (
    <main className="bg-slate-950 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            {isAdmin ? "Admin" : "Editor"}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {isAdmin ? "Manage Users" : "View Users"}
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            {isAdmin
              ? "Change a user's role below. You can't change your own role from here."
              : "You have read-only access to this list. Contact an admin to change roles or remove accounts."}
          </p>
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="mt-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          {loading ? (
            <p className="p-8 text-center text-sm text-slate-400">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-400">No users match your search.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Joined</th>
                  {isAdmin && <th className="px-6 py-4">Role</th>}
                  {isAdmin && <th className="px-6 py-4">Actions</th>}
                  {!isAdmin && <th className="px-6 py-4">Role</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((u) => {
                  const isSelf = u._id === currentUser.id;
                  return (
                    <tr key={u._id}>
                      <td className="px-6 py-4 text-slate-200">{u.name}</td>
                      <td className="px-6 py-4 text-slate-400">{u.email}</td>
                      <td className="px-6 py-4 text-slate-400">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </td>
                      {isAdmin ? (
                        <>
                          <td className="px-6 py-4">
                            <select
                              value={u.role}
                              disabled={updatingId === u._id || isSelf}
                              onChange={(e) => handleRoleChange(u._id, e.target.value)}
                              className="rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {ROLES.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              disabled={isSelf || deletingId === u._id}
                              onClick={() => handleDelete(u._id, u.name)}
                              className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {deletingId === u._id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </>
                      ) : (
                        <td className="px-6 py-4 text-slate-300 capitalize">{u.role}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}