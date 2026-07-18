import { useState } from "react";

const WHATSAPP_LINK = "https://wa.me/message/ZOMUVFYRNUSBN1";

const CONTACT_DETAILS = [
  {
    label: "Office",
    value: "Software Technology Park, UET Mardan, Khyber Pakhtunkhwa, Pakistan",
    icon: PinIcon,
  },
  {
    label: "Email",
    value: "contact@algohubsmc.com",
    href: "mailto:contact@algohubsmc.com",
    icon: MailIcon,
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: WHATSAPP_LINK,
    external: true,
    icon: WhatsAppIcon,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      // TODO: wire this up to your actual backend/email service (e.g. an API route,
      // Formspree, EmailJS, etc.) — this just simulates a request for now.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Get In Touch
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Let's build something great together.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            Have a project in mind or a question about our services? Send us a
            message and we'll get back to you shortly.
          </p>
        </div>
      </section>

      {/* Form + details */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-slate-900 p-8 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ali Ahmed"
                required
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ali@company.com"
                required
              />
            </div>

            <div className="mt-6">
              <Field
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                required
              />
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="text-sm font-medium text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Tell us a bit about what you need..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm text-emerald-400">
                Thanks — your message has been sent. We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            {CONTACT_DETAILS.map(({ label, value, href, external, icon: Icon }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900 p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/15">
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="mt-1 block text-sm text-slate-200 transition-colors hover:text-white"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-slate-200">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
    </div>
  );
}

function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.13 1.02-2.42.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.18-.19.75-.87.95-1.17.2-.29.4-.24.67-.15.27.1 1.72.81 2.02.96.29.15.49.22.56.34.07.13.07.75-.17 1.42z" />
    </svg>
  );
}