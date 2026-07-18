import { useState } from "react";

const FAQ_GROUPS = [
  {
    category: "General",
    items: [
      {
        question: "What services does AlgoHub offer?",
        answer:
          "We build custom software, web and mobile apps, AI-powered solutions, cloud infrastructure, and UI/UX design for businesses of all sizes.",
      },
      {
        question: "Where is AlgoHub based?",
        answer:
          "We're based in Mardan, Khyber Pakhtunkhwa, Pakistan, and work with clients both locally and internationally.",
      },
      {
        question: "Do you work with startups as well as large companies?",
        answer:
          "Yes — we work with startups, growing businesses, and enterprise organizations, and tailor our process to the scale of each project.",
      },
    ],
  },
  {
    category: "Working With Us",
    items: [
      {
        question: "How does the project process work?",
        answer:
          "We follow a structured process: Discovery, Planning, UI/UX Design, Development, QA Testing, Deployment, and ongoing Support.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Timelines vary by scope — a simple website may take a few weeks, while a full enterprise platform can take several months. We share an estimated timeline after the discovery phase.",
      },
      {
        question: "How much does a project cost?",
        answer:
          "Cost depends on complexity, features, and timeline. We provide a detailed quote after understanding your requirements — reach out via our Contact page to get started.",
      },
      {
        question: "Do you offer ongoing support after launch?",
        answer:
          "Yes, we offer maintenance and support packages to keep your software running smoothly after deployment.",
      },
    ],
  },
  {
    category: "Internships & Courses",
    items: [
      {
        question: "How do I apply for an internship at AlgoHub?",
        answer:
          "Visit our Internship page and submit an application. We review applications on a rolling basis and reach out for a screening call.",
      },
      {
        question: "Are the courses beginner-friendly?",
        answer:
          "Yes, most of our courses are designed for beginners to intermediate learners, with hands-on projects to build practical skills.",
      },
      {
        question: "Do I get a certificate after completing a course?",
        answer:
          "Yes, every course includes a certificate of completion, which can be verified through our Verify Certificate page.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            FAQ
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            Can't find what you're looking for? Reach out on our Contact page and
            we'll get back to you.
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-14">
          {FAQ_GROUPS.map((group) => (
            <div key={group.category}>
              <h2 className="text-xl font-semibold text-white">{group.category}</h2>
              <div className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <FAQItem key={item.question} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Still have questions?</h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Our team is happy to help — send us a message and we'll respond shortly.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-white sm:text-base">{question}</span>
        <ChevronIcon
          className={`h-4 w-4 shrink-0 text-blue-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-slate-400">{answer}</p>
        </div>
      )}
    </div>
  );
}

function ChevronIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}