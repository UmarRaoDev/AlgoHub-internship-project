import { useEffect, useRef, useState } from "react";
import { getInternshipRequest } from "../api/internshipApi";
import { getTrackIcon } from "../utils/internshipIcons";

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

export default function Internship() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getInternshipRequest();
        setData(res.internship);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-slate-950 px-6">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-slate-950 px-6">
        <p className="text-sm text-slate-400">Loading...</p>
      </main>
    );
  }

  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="i-drift-a absolute left-[8%] top-[-6rem] h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)" }}
          />
          <div
            className="i-drift-b absolute right-[6%] bottom-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.32) 0%, rgba(14,165,233,0) 70%)" }}
          />
        </div>
        <div className="i-fade-up relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            {data.heroEyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">{data.heroTitle}</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">{data.heroDescription}</p>
          <a
            href={data.heroCtaHref}
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            {data.heroCtaText}
          </a>
        </div>
      </section>

      {/* Tracks */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro eyebrow={data.tracksEyebrow} title={data.tracksTitle} />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.tracks.map((track, i) => (
              <TrackCard
                key={track._id || i}
                title={track.title}
                description={track.description}
                Icon={getTrackIcon(track.icon)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden border-t border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="i-drift-b absolute left-1/2 top-[-4rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <SectionIntro eyebrow={data.processEyebrow} title={data.processTitle} />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.process.map((step, i) => (
              <ProcessCard
                key={step._id || i}
                step={step.step}
                title={step.title}
                description={step.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro eyebrow={data.benefitsEyebrow} title={data.benefitsTitle} />

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {data.benefits.map((benefit, i) => (
              <BenefitCard key={i} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 pb-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="i-drift-a absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <InternshipCta
          title={data.ctaTitle}
          description={data.ctaDescription}
          buttonText={data.ctaButtonText}
          buttonHref={data.ctaButtonHref}
        />
      </section>

      <InternshipStyles />
    </main>
  );
}

function SectionIntro({ eyebrow, title }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`i-fade-up-scroll text-center ${inView ? "i-in" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}

function TrackCard({ title, description, Icon, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 70}ms` : "0ms" }}
      className={`i-fade-up-scroll flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-colors hover:border-blue-600/40 ${
        inView ? "i-in" : ""
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/15">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function ProcessCard({ step, title, description, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
      className={`i-fade-up-scroll rounded-xl border border-white/10 bg-slate-900 p-6 ${inView ? "i-in" : ""}`}
    >
      <span className="text-2xl font-bold text-blue-600/40">{step}</span>
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function BenefitCard({ benefit, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 60}ms` : "0ms" }}
      className={`i-fade-up-scroll flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900 p-5 ${
        inView ? "i-in" : ""
      }`}
    >
      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
      <span className="text-sm text-slate-300">{benefit}</span>
    </div>
  );
}

function InternshipCta({ title, description, buttonText, buttonHref }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`i-fade-up-scroll relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14 ${
        inView ? "i-in" : ""
      }`}
    >
      <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm text-slate-400 sm:text-base">{description}</p>
      <a
        href={buttonHref}
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
      >
        {buttonText}
      </a>
    </div>
  );
}

function InternshipStyles() {
  return (
    <style>{`
      @keyframes iFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .i-fade-up { animation: iFadeUp 0.7s ease-out both; }

      .i-fade-up-scroll { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .i-fade-up-scroll.i-in { opacity: 1; transform: translateY(0); }

      @keyframes iDriftA {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(24px, -18px) scale(1.08); }
      }
      @keyframes iDriftB {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-20px, 16px) scale(1.06); }
      }
      .i-drift-a { animation: iDriftA 13s ease-in-out infinite; }
      .i-drift-b { animation: iDriftB 15s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .i-fade-up, .i-fade-up-scroll, .i-drift-a, .i-drift-b {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}