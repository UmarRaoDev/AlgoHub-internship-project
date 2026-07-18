const CORE_VALUES = [
  "Innovation",
  "Integrity",
  "Quality",
  "Collaboration",
  "Continuous Learning",
  "Customer Success",
  "Transparency",
  "Excellence",
];

const LEADERSHIP = [
  {
    name: "M. Younas",
    role: "Chief Executive Officer",
    initials: "MY",
  },
];

export default function About({ teamImageSrc = "/team-photo.jpg" }) {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            About AlgoHub
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Engineering the future of enterprise software with{" "}
            <span className="text-blue-500">precision</span>,{" "}
            <span className="text-blue-500">innovation</span>, and{" "}
            <span className="text-blue-500">trust</span>.
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Our Story
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Building Intelligent Digital Solutions
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-400">
              AlgoHub is a software development company focused on building intelligent
              digital solutions for modern businesses. Our expertise spans custom software
              development, AI-powered applications, web and mobile development, cloud
              technologies, and user-centered design. We help organizations automate
              processes, improve efficiency, and accelerate digital transformation through
              scalable and secure technology.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={teamImageSrc}
              alt="AlgoHub team members sitting together"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15">
              <TargetIcon className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              To simplify technology for companies by building smart, scalable, and secure
              software solutions that empower businesses and communities.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15">
              <CompassIcon className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              To become a globally recognized technology company delivering innovative
              software, AI, and digital transformation solutions while representing
              Pakistani engineering talent on the international stage.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              What Drives Us
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Our Core Values</h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CORE_VALUES.map((value) => (
              <div
                key={value}
                className="rounded-xl border border-white/10 bg-slate-900 px-5 py-6 text-center transition-colors hover:border-blue-600/40"
              >
                <span className="text-sm font-medium text-slate-200">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-t border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              The People Behind AlgoHub
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Leadership Team</h2>
          </div>

          <div className="mt-12 flex justify-center">
            {LEADERSHIP.map((person) => (
              <div
                key={person.name}
                className="w-full max-w-xs rounded-2xl border border-white/10 bg-slate-900 p-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/15 text-lg font-semibold text-blue-500">
                  {person.initials}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{person.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TargetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function CompassIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.31 9.69-4.62 1.94-1.94 4.62 4.62-1.94 1.94-4.62Z" />
    </svg>
  );
}