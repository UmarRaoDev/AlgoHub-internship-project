import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DataTable from "../../components/admin/DataTable";
import {
  getTeamMembersRequest,
  createTeamMemberRequest,
  updateTeamMemberRequest,
  deleteTeamMemberRequest,
} from "../../api/teamApi";

const EMPTY_FORM = {
  name: "",
  role: "",
  department: "",
  initials: "",
  imageSrc: "",
  isLeadership: false,
  order: 0,
};

export default function AdminTeam() {
  const { accessToken, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);
    setError("");
    try {
      const data = await getTeamMembersRequest();
      setMembers(data.members);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(member) {
    setEditingId(member._id);
    setForm({
      name: member.name,
      role: member.role,
      department: member.department,
      initials: member.initials,
      imageSrc: member.imageSrc || "",
      isLeadership: member.isLeadership,
      order: member.order,
    });
    setFormError("");
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      if (editingId) {
        const data = await updateTeamMemberRequest(editingId, form, accessToken);
        setMembers((prev) => prev.map((m) => (m._id === editingId ? data.member : m)));
      } else {
        const data = await createTeamMemberRequest(form, accessToken);
        setMembers((prev) => [...prev, data.member]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    const confirmed = window.confirm(`Remove "${name}" from the team page? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    try {
      await deleteTeamMemberRequest(id, accessToken);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  const columns = [
    {
      key: "avatar",
      label: "",
      render: (row) =>
        row.imageSrc ? (
          <img src={row.imageSrc} alt={row.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/15 text-xs font-semibold text-blue-500">
            {row.initials}
          </div>
        ),
    },
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    {
      key: "isLeadership",
      label: "Leadership",
      render: (row) =>
        row.isLeadership ? (
          <span className="rounded-md bg-blue-600/15 px-2.5 py-1 text-xs font-semibold text-blue-400">
            Leadership
          </span>
        ) : (
          <span className="text-slate-500">—</span>
        ),
    },
    { key: "order", label: "Order" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            {isAdmin ? "Admin" : "Editor"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Team</h1>
          <p className="mt-2 text-sm text-slate-400">
            Members marked "Leadership" show in their own section on "/team"; everyone else is
            grouped by Department.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          + Add Team Member
        </button>
      </div>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={members}
          searchKeys={["name", "role", "department"]}
          searchPlaceholder="Search team members..."
          loading={loading}
          error={error}
          emptyMessage="No team members yet. Click 'Add Team Member' to create the first one."
          renderActions={(row) => (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openEditForm(row)}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5"
              >
                Edit
              </button>
              {isAdmin && (
                <button
                  type="button"
                  disabled={deletingId === row._id}
                  onClick={() => handleDelete(row._id, row.name)}
                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {deletingId === row._id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          )}
        />
      </div>

      {showForm && (
        <TeamMemberFormModal
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          saving={saving}
          error={formError}
          isEditing={Boolean(editingId)}
        />
      )}
    </div>
  );
}

function TeamMemberFormModal({ form, setForm, onSubmit, onClose, saving, error, isEditing }) {
  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">
          {isEditing ? "Edit Team Member" : "Add Team Member"}
        </h2>

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </Field>
            <Field label="Initials">
              <input
                type="text"
                required
                maxLength={3}
                placeholder="e.g. AR"
                value={form.initials}
                onChange={(e) => update("initials", e.target.value.toUpperCase())}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </Field>
          </div>

          <Field label="Role / Title">
            <input
              type="text"
              required
              placeholder="e.g. Backend Developer"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </Field>

          <Field label="Department">
            <input
              type="text"
              required
              placeholder="e.g. Engineering, Design, AI & Data"
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </Field>

          <Field label="Photo URL (optional)">
            <input
              type="text"
              placeholder="Leave blank to show initials instead"
              value={form.imageSrc}
              onChange={(e) => update("imageSrc", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Order">
              <input
                type="number"
                value={form.order}
                onChange={(e) => update("order", Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </Field>
            <label className="flex items-end gap-2 pb-2.5 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.isLeadership}
                onChange={(e) => update("isLeadership", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-950 text-blue-600 focus:ring-blue-600"
              />
              Leadership
            </label>
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}