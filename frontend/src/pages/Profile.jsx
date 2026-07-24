import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfileRequest, changePasswordRequest } from "../api/profileApi";

export default function Profile() {
  const { user, accessToken, setUser } = useAuth();

  return (
    <main className="bg-slate-950 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Your Account
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Profile</h1>
        </div>

        <ProfileForm user={user} accessToken={accessToken} setUser={setUser} />
        <PasswordForm accessToken={accessToken} />
      </div>
    </main>
  );
}

function ProfileForm({ user, accessToken, setUser }) {
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [status, setStatus] = useState("idle"); // idle | saving | success | error
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const data = await updateProfileRequest(form, accessToken);
      setUser(data.user);
      setStatus("success");
      setMessage("Profile updated successfully.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border border-white/10 bg-slate-900 p-8"
    >
      <h2 className="text-lg font-semibold text-white">Profile Details</h2>

      <div className="mt-5">
        <label htmlFor="name" className="text-sm font-medium text-slate-300">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {status === "error" && <p className="mt-4 text-sm text-red-400">{message}</p>}
      {status === "success" && <p className="mt-4 text-sm text-emerald-400">{message}</p>}

      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "saving" ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

function PasswordForm({ accessToken }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (form.newPassword !== form.confirmPassword) {
      setStatus("error");
      setMessage("New passwords don't match.");
      return;
    }

    setStatus("saving");
    try {
      await changePasswordRequest(form.currentPassword, form.newPassword, accessToken);
      setStatus("success");
      setMessage("Password changed successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-8"
    >
      <h2 className="text-lg font-semibold text-white">Change Password</h2>

      <div className="mt-5">
        <label htmlFor="currentPassword" className="text-sm font-medium text-slate-300">
          Current Password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          value={form.currentPassword}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="newPassword" className="text-sm font-medium text-slate-300">
          New Password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={6}
          value={form.newPassword}
          onChange={handleChange}
          placeholder="At least 6 characters"
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-300">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {status === "error" && <p className="mt-4 text-sm text-red-400">{message}</p>}
      {status === "success" && <p className="mt-4 text-sm text-emerald-400">{message}</p>}

      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "saving" ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}