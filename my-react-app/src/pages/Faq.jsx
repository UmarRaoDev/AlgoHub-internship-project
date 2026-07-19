import { useEffect, useRef, useState } from "react";

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}


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
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="f-drift-a absolute left-[6%] top-[-6rem] h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)" }}
          />
          <div
            className="f-drift-b absolute right-[4%] bottom-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.32) 0%, rgba(14,165,233,0) 70%)" }}
          />
        </div>
        <div className="f-fade-up relative mx-auto max-w-3xl text-center">
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
      <section className="relative px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-14">
          {FAQ_GROUPS.map((group, gi) => (
            <FAQGroup key={group.category} group={group} index={gi} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 pb-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="f-drift-b absolute left-1/2 top-[-4rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <FAQCta />
      </section>
      <FAQStyles />
    </main>
  );
}

function FAQGroup({ group, index }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const side = index % 2 === 0 ? "f-slide-left" : "f-slide-right";

  return (
    <div ref={ref} className={`${side} ${inView ? "f-in" : ""}`}>
      <h2 className="text-xl font-semibold text-white">{group.category}</h2>
      <div className="mt-5 flex flex-col gap-3">
        {group.items.map((item) => (
          <FAQItem key={item.question} {...item} />
        ))}
      </div>
    </div>
  );
}

function FAQCta() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`f-fade-up-scroll relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14 ${
        inView ? "f-in" : ""
      }`}
    >
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
          className={`h-4 w-4 shrink-0 text-blue-500 transition-transform duration-300 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ transitionDuration: "350ms" }}
      >
        <div className="min-h-0 px-6 pb-5">
          <p className="text-sm leading-relaxed text-slate-400">{answer}</p>
        </div>
      </div>
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

function FAQStyles() {
  return (
    <style>{`
      @keyframes fFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .f-fade-up { animation: fFadeUp 0.7s ease-out both; }

      .f-fade-up-scroll { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .f-fade-up-scroll.f-in { opacity: 1; transform: translateY(0); }

      .f-slide-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .f-slide-left.f-in { opacity: 1; transform: translateX(0); }

      .f-slide-right { opacity: 0; transform: translateX(28px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .f-slide-right.f-in { opacity: 1; transform: translateX(0); }

      @keyframes fDriftA {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(24px, -18px) scale(1.08); }
      }
      @keyframes fDriftB {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-20px, 16px) scale(1.06); }
      }
      .f-drift-a { animation: fDriftA 13s ease-in-out infinite; }
      .f-drift-b { animation: fDriftB 15s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .f-fade-up, .f-fade-up-scroll, .f-slide-left, .f-slide-right, .f-drift-a, .f-drift-b {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}