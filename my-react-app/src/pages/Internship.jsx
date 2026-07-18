const TRACKS = [
  {
    title: "Frontend Development",
    description: "Work on real client UI using React and Tailwind CSS alongside senior engineers.",
    icon: LayersIcon,
  },
  {
    title: "Backend Development",
    description: "Build and maintain APIs, databases, and server-side logic for live products.",
    icon: ServerIcon,
  },
  {
    title: "UI/UX Design",
    description: "Research, wireframe, and prototype interfaces in Figma for real projects.",
    icon: PenIcon,
  },
  {
    title: "AI & Data",
    description: "Assist with model integration, data pipelines, and applied ML experiments.",
    icon: SparkIcon,
  },
  {
    title: "Quality Assurance",
    description: "Write test cases and catch issues before they reach production.",
    icon: CheckShieldIcon,
  },
  {
    title: "DevOps & Cloud",
    description: "Get hands-on with CI/CD pipelines, Docker, and cloud deployments.",
    icon: CloudIcon,
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Apply Online",
    description: "Submit your resume and a short note on what you'd like to work on.",
  },
  {
    step: "02",
    title: "Screening Call",
    description: "A quick conversation to understand your background and interests.",
  },
  {
    step: "03",
    title: "Technical Task",
    description: "A small, practical task related to your chosen track.",
  },
  {
    step: "04",
    title: "Onboarding",
    description: "Join the team, get matched with a mentor, and start contributing.",
  },
];

const BENEFITS = [
  "Mentorship from senior engineers and designers",
  "Hands-on work on real client projects",
  "Certificate of completion",
  "Letter of recommendation for top performers",
  "Flexible, remote-friendly schedule",
  "Path to a full-time offer",
];

export default function Internship() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Internship Program
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Start your career building real software, not just learning about it.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            AlgoHub's internship program pairs you with experienced engineers and
            designers to work on live projects — from day one.
          </p>
          <a
            href="/internships/apply"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* Tracks */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Choose Your Path
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Internship Tracks
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-colors hover:border-blue-600/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/15">
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Application Process
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(({ step, title, description }) => (
              <div key={step} className="rounded-xl border border-white/10 bg-slate-900 p-6">
                <span className="text-2xl font-bold text-blue-600/40">{step}</span>
                <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              What You Get
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Program Benefits
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900 p-5"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span className="text-sm text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to gain real experience?
          </h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Applications are reviewed on a rolling basis — apply today to join the
            next intake.
          </p>
          <a
            href="/internships/apply"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Apply Now
          </a>
        </div>
      </section>
    </main>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LayersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </svg>
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

function PenIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 19 7-7 3 3-7 7-3-3Z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
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

function CheckShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
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