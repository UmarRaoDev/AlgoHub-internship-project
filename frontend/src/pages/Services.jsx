import { useEffect, useRef, useState } from "react";
import { getServicesRequest } from "../api/serviceApi";
import { getServiceIcon } from "../utils/serviceIcons";

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

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getServicesRequest();
        setServices(data.services);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="sv-drift-a absolute left-[8%] top-[-6rem] h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)" }}
          />
          <div
            className="sv-drift-b absolute right-[6%] bottom-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.32) 0%, rgba(14,165,233,0) 70%)" }}
          />
        </div>
        <div className="sv-fade-up relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Enterprise Services
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Scalable software engineering, AI integration, and cloud architecture
            tailored for your industry.
          </h1>
        </div>
      </section>

      {/* Services grid */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="sv-drift-b absolute left-1/2 top-[-4rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>

        {error && (
          <p className="relative mx-auto mb-8 max-w-3xl rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        {loading ? (
          <p className="relative text-center text-sm text-slate-400">Loading services...</p>
        ) : (
          <div className="relative mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                description={service.description}
                href={service.href}
                Icon={getServiceIcon(service.icon)}
                index={i}
              />
            ))}
          </div>
        )}
      </section>

      <ServicesStyles />
    </main>
  );
}

function ServiceCard({ title, description, href, Icon, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 60}ms` : "0ms" }}
      className={`sv-fade-up-scroll flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-colors hover:border-blue-600/40 ${
        inView ? "sv-in" : ""
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/15">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
      <a
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 transition-colors hover:text-blue-400"
      >
        Learn more
        <ArrowIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function ServicesStyles() {
  return (
    <style>{`
      @keyframes svFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .sv-fade-up { animation: svFadeUp 0.7s ease-out both; }

      .sv-fade-up-scroll { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .sv-fade-up-scroll.sv-in { opacity: 1; transform: translateY(0); }

      @keyframes svDriftA {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(24px, -18px) scale(1.08); }
      }
      @keyframes svDriftB {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-20px, 16px) scale(1.06); }
      }
      .sv-drift-a { animation: svDriftA 13s ease-in-out infinite; }
      .sv-drift-b { animation: svDriftB 15s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .sv-fade-up, .sv-fade-up-scroll, .sv-drift-a, .sv-drift-b {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}