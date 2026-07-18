const LEADERSHIP = [{ name: "M. Younas", role: "Chief Executive Officer", initials: "MY" }];

const DEPARTMENTS = [
  {
    name: "Engineering",
    members: [
      { name: "Ahmad Raza", role: "Lead Software Engineer", initials: "AR" },
      { name: "Sara Khan", role: "Backend Developer", initials: "SK" },
      { name: "Bilal Hassan", role: "Frontend Developer", initials: "BH" },
    ],
  },
  {
    name: "Design",
    members: [
      { name: "Ayesha Malik", role: "UI/UX Designer", initials: "AM" },
      { name: "Usman Tariq", role: "Product Designer", initials: "UT" },
    ],
  },
  {
    name: "AI & Data",
    members: [{ name: "Hamza Iqbal", role: "AI Engineer", initials: "HI" }],
  },
  {
    name: "Operations",
    members: [{ name: "Nadia Farooq", role: "Project Coordinator", initials: "NF" }],
  },
];

export default function Team() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Our Team
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            The people building AlgoHub, one project at a time.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            A small, focused team of engineers, designers, and problem-solvers
            working together to ship reliable software.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Leading the Way
            </h2>
          </div>

          <div className="mt-12 flex justify-center">
            {LEADERSHIP.map((person) => (
              <MemberCard key={person.name} {...person} className="max-w-xs" />
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="border-t border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-16">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.name}>
              <h2 className="text-xl font-semibold text-white">{dept.name}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dept.members.map((person) => (
                  <MemberCard key={person.name} {...person} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Want to join us?</h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            We're always looking for people who care about doing great work.
          </p>
          <a
            href="/careers"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            View Open Roles
          </a>
        </div>
      </section>
    </main>
  );
}

function MemberCard({ name, role, initials, imageSrc, className = "" }) {
  return (
    <div
      className={`w-full rounded-2xl border border-white/10 bg-slate-900 p-8 text-center ${className}`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="mx-auto h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/15 text-lg font-semibold text-blue-500">
          {initials}
        </div>
      )}
      <h3 className="mt-5 text-lg font-semibold text-white">{name}</h3>
      <p className="mt-1 text-sm text-slate-400">{role}</p>
    </div>
  );
}