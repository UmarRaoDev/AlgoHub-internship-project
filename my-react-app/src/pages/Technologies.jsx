const CATEGORIES = [
  {
    name: "Backend & API Integration",
    icon: ServerIcon,
    badgeClass: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    hoverClass: "hover:border-blue-500/50",
    items: ["PHP", "Laravel", "Node.js", "Python", "Java", "GraphQL"],
  },
  {
    name: "Frontend Engineering",
    icon: LayoutIcon,
    badgeClass: "bg-sky-500/15 border-sky-500/30 text-sky-400",
    hoverClass: "hover:border-sky-500/50",
    items: ["React.js", "Next.js", "Vue.js", "Angular", "TypeScript", "Bootstrap"],
  },
  {
    name: "Mobile Development",
    icon: PhoneIcon,
    badgeClass: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    hoverClass: "hover:border-emerald-500/50",
    items: ["Swift", "Kotlin", "React Native", "Flutter"],
  },
  {
    name: "Databases & Caching",
    icon: DatabaseIcon,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    hoverClass: "hover:border-amber-500/50",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ElasticSearch"],
  },
  {
    name: "Cloud & DevOps",
    icon: CloudIcon,
    badgeClass: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    hoverClass: "hover:border-cyan-500/50",
    items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    name: "AI & Machine Learning",
    icon: SparkIcon,
    badgeClass: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    hoverClass: "hover:border-violet-500/50",
    items: ["TensorFlow", "PyTorch", "OpenAI / LLMs"],
  },
];

export default function Technologies() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Our Technologies
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            The tools behind resilient, enterprise-grade software.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            We leverage the most advanced, enterprise-grade technologies to build
            secure, scalable, and resilient software architectures.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {CATEGORIES.map(({ name, icon: Icon, badgeClass, hoverClass, items }) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-slate-900 p-8 transition-colors hover:border-blue-600/40"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${badgeClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-white">{name}</h2>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white ${hoverClass}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Not sure which stack fits your project?
          </h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            We'll help you pick the right technologies based on your goals, scale, and budget.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Talk to Our Team
          </a>
        </div>
      </section>
    </main>
  );
}

function ServerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="7" rx="1.5" />
      <rect x="2" y="14" width="20" height="7" rx="1.5" />
      <path d="M6 6.5h.01M6 17.5h.01" />
    </svg>
  );
}

function LayoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function DatabaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.7A4.5 4.5 0 0 0 6.5 19h11Z" />
    </svg>
  );
}

function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}