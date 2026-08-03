import { useEffect, useRef, useState } from "react";
import { getFaqsRequest } from "../api/faqApi";

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

// Groups the flat FAQ list into categories, preserving the order they
// already come back in (sorted by the backend: category name, then order).
function groupFaqs(faqs) {
  const groups = [];
  for (const faq of faqs) {
    let group = groups.find((g) => g.category === faq.category);
    if (!group) {
      group = { category: faq.category, items: [] };
      groups.push(group);
    }
    group.items.push(faq);
  }
  return groups;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getFaqsRequest();
        setFaqs(data.faqs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const groups = groupFaqs(faqs);

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
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
              {error}
            </p>
          )}
          {loading ? (
            <p className="text-center text-sm text-slate-400">Loading FAQs...</p>
          ) : (
            groups.map((group, gi) => <FAQGroup key={group.category} group={group} index={gi} />)
          )}
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
          <FAQItem key={item._id} question={item.question} answer={item.answer} />
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