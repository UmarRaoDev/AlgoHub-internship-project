import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DataTable from "../../components/admin/DataTable";
import {
  getFaqsRequest,
  createFaqRequest,
  updateFaqRequest,
  deleteFaqRequest,
} from "../../api/faqApi";

const EMPTY_FORM = { question: "", answer: "", category: "", order: 0 };

export default function AdminFaqs() {
  const { accessToken, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadFaqs();
  }, []);

  async function loadFaqs() {
    setLoading(true);
    setError("");
    try {
      const data = await getFaqsRequest();
      setFaqs(data.faqs);
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

  function openEditForm(faq) {
    setEditingId(faq._id);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
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
        const data = await updateFaqRequest(editingId, form, accessToken);
        setFaqs((prev) => prev.map((f) => (f._id === editingId ? data.faq : f)));
      } else {
        const data = await createFaqRequest(form, accessToken);
        setFaqs((prev) => [...prev, data.faq]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, question) {
    const confirmed = window.confirm(`Delete "${question}"? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    try {
      await deleteFaqRequest(id, accessToken);
      setFaqs((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  const columns = [
    {
      key: "question",
      label: "Question",
      render: (row) => <span className="line-clamp-1 max-w-sm">{row.question}</span>,
    },
    { key: "category", label: "Category" },
    { key: "order", label: "Order" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            {isAdmin ? "Admin" : "Editor"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">FAQs</h1>
          <p className="mt-2 text-sm text-slate-400">
            Grouped by Category on the public "/faq" page, in this order.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          + Add FAQ
        </button>
      </div>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={faqs}
          searchKeys={["question", "answer", "category"]}
          searchPlaceholder="Search FAQs..."
          loading={loading}
          error={error}
          emptyMessage="No FAQs yet. Click 'Add FAQ' to create the first one."
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
                  onClick={() => handleDelete(row._id, row.question)}
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
        <FaqFormModal
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

function FaqFormModal({ form, setForm, onSubmit, onClose, saving, error, isEditing }) {
  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">
          {isEditing ? "Edit FAQ" : "Add FAQ"}
        </h2>

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <Field label="Question">
            <input
              type="text"
              required
              value={form.question}
              onChange={(e) => update("question", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </Field>

          <Field label="Answer">
            <textarea
              required
              rows={4}
              value={form.answer}
              onChange={(e) => update("answer", e.target.value)}
              className="w-full resize-none rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <input
                type="text"
                required
                placeholder="e.g. General, Working With Us"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
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
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Create FAQ"}
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