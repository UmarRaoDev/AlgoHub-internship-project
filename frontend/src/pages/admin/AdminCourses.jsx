import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DataTable from "../../components/admin/DataTable";
import {
  getAllCoursesAdminRequest,
  createCourseRequest,
  updateCourseRequest,
  deleteCourseRequest,
} from "../../api/courseApi";
import { COURSE_ICON_OPTIONS, getCourseIcon } from "../../utils/courseIcons";

const EMPTY_FORM = {
  title: "",
  level: "",
  duration: "",
  description: "",
  icon: "code",
  order: 0,
  published: true,
};

export default function AdminCourses() {
  const { accessToken, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllCoursesAdminRequest(accessToken);
      setCourses(data.courses);
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

  function openEditForm(course) {
    setEditingId(course._id);
    setForm({
      title: course.title,
      level: course.level,
      duration: course.duration,
      description: course.description,
      icon: course.icon,
      order: course.order,
      published: course.published,
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
        const data = await updateCourseRequest(editingId, form, accessToken);
        setCourses((prev) => prev.map((c) => (c._id === editingId ? data.course : c)));
      } else {
        const data = await createCourseRequest(form, accessToken);
        setCourses((prev) => [...prev, data.course]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish(course) {
    setBusyId(course._id);
    setError("");
    try {
      const data = await updateCourseRequest(course._id, { published: !course.published }, accessToken);
      setCourses((prev) => prev.map((c) => (c._id === course._id ? data.course : c)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id, title) {
    const confirmed = window.confirm(`Delete "${title}"? This can't be undone.`);
    if (!confirmed) return;

    setBusyId(id);
    setError("");
    try {
      await deleteCourseRequest(id, accessToken);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  const columns = [
    {
      key: "icon",
      label: "Icon",
      render: (row) => {
        const Icon = getCourseIcon(row.icon);
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15">
            <Icon className="h-4 w-4 text-blue-500" />
          </div>
        );
      },
    },
    { key: "title", label: "Title" },
    { key: "level", label: "Level" },
    { key: "duration", label: "Duration" },
    { key: "order", label: "Order" },
    {
      key: "published",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            row.published ? "bg-green-500/15 text-green-400" : "bg-slate-700 text-slate-400"
          }`}
        >
          {row.published ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            {isAdmin ? "Admin" : "Editor"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Courses</h1>
          <p className="mt-2 text-sm text-slate-400">
            Only "Published" courses appear on the public "/courses" page.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          + Add Course
        </button>
      </div>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={courses}
          searchKeys={["title", "level", "description"]}
          searchPlaceholder="Search courses..."
          loading={loading}
          error={error}
          emptyMessage="No courses yet. Click 'Add Course' to create the first one."
          renderActions={(row) => (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busyId === row._id}
                onClick={() => handleTogglePublish(row)}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {row.published ? "Unpublish" : "Publish"}
              </button>
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
                  disabled={busyId === row._id}
                  onClick={() => handleDelete(row._id, row.title)}
                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {busyId === row._id ? "..." : "Delete"}
                </button>
              )}
            </div>
          )}
        />
      </div>

      {showForm && (
        <CourseFormModal
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

function CourseFormModal({ form, setForm, onSubmit, onClose, saving, error, isEditing }) {
  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">
          {isEditing ? "Edit Course" : "Add Course"}
        </h2>

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <Field label="Title">
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Level">
              <input
                type="text"
                required
                placeholder="Beginner"
                value={form.level}
                onChange={(e) => update("level", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </Field>
            <Field label="Duration">
              <input
                type="text"
                required
                placeholder="8 Weeks"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full resize-none rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Icon">
              <select
                value={form.icon}
                onChange={(e) => update("icon", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {COURSE_ICON_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Order">
              <input
                type="number"
                value={form.order}
                onChange={(e) => update("order", Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-slate-950 text-blue-600 focus:ring-blue-600"
            />
            Published (visible on the public site)
          </label>

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
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Course"}
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