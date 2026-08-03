import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getInternshipRequest, updateInternshipRequest } from "../../api/internshipApi";
import { TRACK_ICON_OPTIONS } from "../../utils/internshipIcons";

const EMPTY_TRACK = { title: "", description: "", icon: "layers" };
const EMPTY_STEP = { step: "", title: "", description: "" };

export default function AdminInternship() {
  const { accessToken, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getInternshipRequest();
        setForm(data.internship);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess("");
  }

  function updateListItem(field, index, itemUpdate) {
    setForm((prev) => {
      const list = [...prev[field]];
      list[index] = { ...list[index], ...itemUpdate };
      return { ...prev, [field]: list };
    });
    setSuccess("");
  }

  function addListItem(field, emptyItem) {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], { ...emptyItem }] }));
  }

  function removeListItem(field, index) {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  }

  function updateBenefit(index, value) {
    setForm((prev) => {
      const benefits = [...prev.benefits];
      benefits[index] = value;
      return { ...prev, benefits };
    });
    setSuccess("");
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const data = await updateInternshipRequest(form, accessToken);
      setForm(data.internship);
      setSuccess("Saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400">Loading...</p>;
  }

  if (!form) {
    return (
      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        {error || "Could not load the Internship page content."}
      </p>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            {isAdmin ? "Admin" : "Editor"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Internship Page</h1>
          <p className="mt-2 text-sm text-slate-400">
            This is a single page — edits here update the live "/internships" page directly.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          {success}
        </p>
      )}

      {/* Hero */}
      <Section title="Hero Section">
        <Field label="Eyebrow">
          <TextInput value={form.heroEyebrow} onChange={(v) => update("heroEyebrow", v)} />
        </Field>
        <Field label="Headline">
          <TextArea rows={2} value={form.heroTitle} onChange={(v) => update("heroTitle", v)} />
        </Field>
        <Field label="Description">
          <TextArea rows={3} value={form.heroDescription} onChange={(v) => update("heroDescription", v)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Button Text">
            <TextInput value={form.heroCtaText} onChange={(v) => update("heroCtaText", v)} />
          </Field>
          <Field label="Button Link">
            <TextInput value={form.heroCtaHref} onChange={(v) => update("heroCtaHref", v)} />
          </Field>
        </div>
      </Section>

      {/* Tracks */}
      <Section title="Internship Tracks">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Section Eyebrow">
            <TextInput value={form.tracksEyebrow} onChange={(v) => update("tracksEyebrow", v)} />
          </Field>
          <Field label="Section Title">
            <TextInput value={form.tracksTitle} onChange={(v) => update("tracksTitle", v)} />
          </Field>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {form.tracks.map((track, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-slate-950 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_1fr_140px]">
                  <TextInput
                    placeholder="Track title"
                    value={track.title}
                    onChange={(v) => updateListItem("tracks", i, { title: v })}
                  />
                  <TextInput
                    placeholder="Description"
                    value={track.description}
                    onChange={(v) => updateListItem("tracks", i, { description: v })}
                  />
                  <select
                    value={track.icon}
                    onChange={(e) => updateListItem("tracks", i, { icon: e.target.value })}
                    className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    {TRACK_ICON_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <RemoveButton onClick={() => removeListItem("tracks", i)} />
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => addListItem("tracks", EMPTY_TRACK)} label="+ Add Track" />
      </Section>

      {/* Process */}
      <Section title="Application Process">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Section Eyebrow">
            <TextInput value={form.processEyebrow} onChange={(v) => update("processEyebrow", v)} />
          </Field>
          <Field label="Section Title">
            <TextInput value={form.processTitle} onChange={(v) => update("processTitle", v)} />
          </Field>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {form.process.map((step, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-slate-950 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="grid flex-1 gap-3 sm:grid-cols-[80px_1fr_2fr]">
                  <TextInput
                    placeholder="01"
                    value={step.step}
                    onChange={(v) => updateListItem("process", i, { step: v })}
                  />
                  <TextInput
                    placeholder="Step title"
                    value={step.title}
                    onChange={(v) => updateListItem("process", i, { title: v })}
                  />
                  <TextInput
                    placeholder="Description"
                    value={step.description}
                    onChange={(v) => updateListItem("process", i, { description: v })}
                  />
                </div>
                <RemoveButton onClick={() => removeListItem("process", i)} />
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => addListItem("process", EMPTY_STEP)} label="+ Add Step" />
      </Section>

      {/* Benefits */}
      <Section title="Program Benefits">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Section Eyebrow">
            <TextInput value={form.benefitsEyebrow} onChange={(v) => update("benefitsEyebrow", v)} />
          </Field>
          <Field label="Section Title">
            <TextInput value={form.benefitsTitle} onChange={(v) => update("benefitsTitle", v)} />
          </Field>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {form.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <TextInput
                placeholder="Benefit"
                value={benefit}
                onChange={(v) => updateBenefit(i, v)}
              />
              <RemoveButton onClick={() => removeListItem("benefits", i)} />
            </div>
          ))}
        </div>
        <AddButton onClick={() => addListItem("benefits", "")} label="+ Add Benefit" />
      </Section>

      {/* CTA */}
      <Section title="Bottom CTA">
        <Field label="Title">
          <TextInput value={form.ctaTitle} onChange={(v) => update("ctaTitle", v)} />
        </Field>
        <Field label="Description">
          <TextArea rows={2} value={form.ctaDescription} onChange={(v) => update("ctaDescription", v)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Button Text">
            <TextInput value={form.ctaButtonText} onChange={(v) => update("ctaButtonText", v)} />
          </Field>
          <Field label="Button Link">
            <TextInput value={form.ctaButtonHref} onChange={(v) => update("ctaButtonHref", v)} />
          </Field>
        </div>
      </Section>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur sm:px-8 lg:pl-72">
        <div className="mx-auto flex max-w-4xl justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-5 flex flex-col gap-4">{children}</div>
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

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
    />
  );
}

function TextArea({ value, onChange, rows = 3 }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
    />
  );
}

function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 w-fit rounded-lg border border-dashed border-white/20 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-blue-600/50 hover:text-blue-400"
    >
      {label}
    </button>
  );
}

function RemoveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-1 shrink-0 rounded-lg border border-red-500/30 px-3 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
    >
      Remove
    </button>
  );
}