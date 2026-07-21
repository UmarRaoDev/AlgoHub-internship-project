import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Code2,
  Braces,
  Database,
  Cloud,
  Container,
  GitBranch,
  Layers,
  Palette,
  Server,
  Globe,
  Bot,
  Terminal,
  FileJson,
  Boxes,
  Cpu,
} from "lucide-react";

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

const TECHNOLOGIES = [
  { icon: Code2, name: "React" },
  { icon: Globe, name: "Next.js" },
  { icon: Server, name: "Node.js" },
  { icon: Braces, name: "TypeScript" },
  { icon: Terminal, name: "Python" },
  { icon: Layers, name: "Django" },
  { icon: Palette, name: "Tailwind CSS" },
  { icon: Database, name: "PostgreSQL" },
  { icon: FileJson, name: "MongoDB" },
  { icon: Cloud, name: "AWS" },
  { icon: Container, name: "Docker" },
  { icon: GitBranch, name: "Git & GitHub" },
  { icon: Boxes, name: "Figma" },
  { icon: Cpu, name: "REST & GraphQL" },
  { icon: Bot, name: "AI / LLM Integrations" },
];

export default function VerifyAndCTA() {
  return (
    <>
      {/* Certificate verification */}
      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="pointer-events-none absolute inset-0">
        <div className="v-drift-a absolute left-[10%] top-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-[90px]" />
<div className="v-drift-b absolute right-[8%] bottom-0 h-64 w-64 rounded-full bg-blue-600/20 blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] via-slate-900 to-slate-900 p-10 sm:p-14">
            <div className="v-pulse pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Verify Your AlgoHub Certification
                </h2>
                <p className="mt-3 text-slate-400">
                  Ensure the authenticity of your achievements. Employers and institutions can
                  instantly verify AlgoHub SMC certificates through our secure,
                  enterprise-grade verification portal.
                </p>
              </div>

              <a
                href="/certificate/verify"
                className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-600/30 active:translate-y-0 active:scale-95"
              >
                Verify Certificate
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="relative overflow-hidden bg-black py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="v-drift-b absolute left-1/2 top-[-6rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
          <div className="v-drift-a absolute right-[-4rem] bottom-[-4rem] h-64 w-64 rounded-full bg-sky-500/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Our Stack
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technologies We Master
            </h2>
            <p className="mt-4 text-slate-400">
              We pick tools based on what your product needs, not what's trending &mdash; then go deep.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TECHNOLOGIES.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black px-6 pb-28 pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600 p-10 sm:p-16">
            <div
              className="v-grid-pan pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="v-drift-a pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-[90px]" />
            <div className="v-drift-b pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-[90px]" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Build Your Next Digital Product?
              </h2>
              <p className="mt-4 text-blue-100">
                Whether you're a startup validating an idea or an enterprise modernizing your
                operations, AlgoHub is ready to transform your vision into reliable, scalable
                software.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 shadow-lg shadow-black/10 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-95"
                >
                  Get a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:border-white/60 hover:bg-white/10 active:scale-95"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes vDriftA {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(24px, -16px) scale(1.08); }
        }
        @keyframes vDriftB {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-20px, 18px) scale(1.06); }
        }
        .v-drift-a { animation: vDriftA 13s ease-in-out infinite; }
        .v-drift-b { animation: vDriftB 15s ease-in-out infinite; }

        @keyframes vPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }
        .v-pulse { animation: vPulse 6s ease-in-out infinite; }

        @keyframes vGridPan {
          from { background-position: 0px 0px; }
          to { background-position: 40px 40px; }
        }
        .v-grid-pan { animation: vGridPan 16s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .v-drift-a, .v-drift-b, .v-pulse, .v-grid-pan { animation: none !important; }
        }
      `}</style>
    </>
  );
}

function TechCard({ tech, index }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const Icon = tech.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 40}ms` : "0ms" }}
      className={`group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-6 text-center transition-all duration-400 ease-out hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900 ${
        inView ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-colors duration-300 group-hover:bg-blue-600/15 group-hover:text-blue-400">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium text-slate-300">{tech.name}</span>
    </div>
  );
}