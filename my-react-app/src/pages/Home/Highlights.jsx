import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Smartphone,
  Brain,
  Cloud,
  Palette,
  Building2,
  ShieldCheck,
  Users,
  Award,
  Layers,
  Search,
  PenTool,
  Hammer,
  TestTube2,
  Rocket,
  LifeBuoy,
} from "lucide-react";

/* ---------- shared scroll utilities ---------- */

function useInView(options = { threshold: 0.25 }) {
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

function useCountUp(end, inView, duration = 1800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return value;
}

/* ---------- data ---------- */

const STATS = [
  { end: 2025, prefix: "", suffix: "", label: "Founded In", isYear: true },
  { end: 1000, prefix: "", suffix: "+", label: "LinkedIn Followers" },
  { end: 50, prefix: "", suffix: "+", label: "Projects Delivered" },
  { end: 200, prefix: "", suffix: "+", label: "Team Members" },
];

const SERVICES = [
  { icon: Code2, title: "Web Development", desc: "Fast, scalable web platforms built on modern frameworks and clean architecture." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native-feel iOS and Android apps engineered for performance and retention." },
  { icon: Brain, title: "AI & Machine Learning", desc: "Custom AI models and LLM integrations that automate real business workflows." },
  { icon: Cloud, title: "Cloud & DevOps", desc: "Resilient infrastructure, CI/CD pipelines, and cost-optimized cloud architecture." },
  { icon: Palette, title: "UI/UX Design", desc: "Research-driven interfaces that balance usability with distinctive visual identity." },
  { icon: Building2, title: "Enterprise Software", desc: "Mission-critical systems built for scale, compliance, and long-term ownership." },
];

const REASONS = [
  { icon: ShieldCheck, title: "Security-First Engineering", desc: "Every build follows secure coding standards from day one, not as an afterthought." },
  { icon: Layers, title: "Scalable Architecture", desc: "Systems designed to grow from your first users to your millionth without a rebuild." },
  { icon: Users, title: "Dedicated Teams", desc: "A consistent squad that knows your product, not a rotating cast of contractors." },
  { icon: Award, title: "Global Delivery Standards", desc: "Processes benchmarked against international software delivery practices." },
];

const PROCESS = [
  { icon: Search, title: "Discover", desc: "We map your goals, users, and constraints before writing a single line of code." },
  { icon: PenTool, title: "Design", desc: "Wireframes and prototypes validate the experience before development begins." },
  { icon: Hammer, title: "Develop", desc: "Agile sprints turn designs into working software with continuous check-ins." },
  { icon: TestTube2, title: "Test & QA", desc: "Rigorous testing across devices, edge cases, and security scenarios." },
  { icon: Rocket, title: "Deploy", desc: "Smooth, monitored releases with zero-downtime deployment practices." },
  { icon: LifeBuoy, title: "Support", desc: "Ongoing monitoring, iteration, and support after launch." },
];

/* ---------- component ---------- */

export default function Highlights() {
  const [statsRef, statsInView] = useInView({ threshold: 0.4 });

  return (
    <>
      {/* Stats */}
      <section className="border-y border-white/10 bg-slate-950 py-16">
        <div ref={statsRef} className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} inView={statsInView} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Expertise"
            subtitle="Full-cycle software capability under one roof, from first sketch to production scale."
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Why AlgoHub" title="Why Choose AlgoHub" align="left" />
            <p className="mt-5 max-w-md text-slate-400">
              We treat every engagement like a long-term partnership, not a one-off delivery.
              That means fewer surprises, clearer ownership, and software that keeps working
              long after launch day.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {REASONS.map((reason, i) => (
              <ReasonCard key={reason.title} reason={reason} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Work"
            subtitle="A disciplined, six-stage pipeline that keeps every project transparent and on schedule."
          />

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block" />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6 text-3xl">
              {PROCESS.map((step, i) => (
                <ProcessStep key={step.title} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- sub-components ---------- */

function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : ""}>
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
    </div>
  );
}

function StatItem({ stat, inView }) {
  const value = useCountUp(stat.end, inView);
  const display = stat.isYear ? value : value.toLocaleString();

  return (
    <div className="text-center">
      <p className="text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl">
        {stat.prefix}
        {display}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 70}ms` : "0ms" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-600/0 blur-2xl transition-all duration-500 group-hover:bg-blue-600/20" />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="relative mt-5 text-lg font-semibold text-white">{service.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{service.desc}</p>
    </div>
  );
}

function ReasonCard({ reason, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const Icon = reason.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
      className={`rounded-xl border border-white/10 bg-black/40 p-6 transition-all duration-500 ease-out hover:border-white/20 hover:bg-white/[0.03] ${
        inView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      }`}
    >
      <Icon className="h-5 w-5 text-blue-400" />
      <h3 className="mt-3 text-sm font-semibold text-white">{reason.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{reason.desc}</p>
    </div>
  );
}

function ProcessStep({ step, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
      className={`relative flex flex-col items-start transition-all duration-500 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-950 text-blue-400">
        <Icon className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {index + 1}
        </span>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{step.desc}</p>
    </div>
  );
}
