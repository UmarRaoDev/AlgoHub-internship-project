import { useEffect, useRef, useState } from "react";
import { getTeamMembersRequest } from "../api/teamApi";

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

// Groups the flat member list into leadership + departments, preserving the
// order members already come back in (sorted by the backend: leadership
// first, then department name, then each member's `order`).
function groupMembers(members) {
  const leadership = members.filter((m) => m.isLeadership);
  const rest = members.filter((m) => !m.isLeadership);

  const departments = [];
  for (const member of rest) {
    let dept = departments.find((d) => d.name === member.department);
    if (!dept) {
      dept = { name: member.department, members: [] };
      departments.push(dept);
    }
    dept.members.push(member);
  }

  return { leadership, departments };
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getTeamMembersRequest();
        setMembers(data.members);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { leadership, departments } = groupMembers(members);

  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="t-drift-a absolute left-[8%] top-[-6rem] h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)" }}
          />
          <div
            className="t-drift-b absolute right-[6%] bottom-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.32) 0%, rgba(14,165,233,0) 70%)" }}
          />
        </div>
        <div className="t-fade-up relative mx-auto max-w-3xl text-center">
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

      {error && (
        <p className="mx-auto mt-8 max-w-3xl rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
          {error}
        </p>
      )}

      {loading ? (
        <p className="px-6 py-20 text-center text-sm text-slate-400">Loading team...</p>
      ) : (
        <>
          {/* Leadership */}
          {leadership.length > 0 && (
            <section className="px-6 py-20 sm:py-24">
              <div className="mx-auto max-w-6xl">
                <SectionIntro eyebrow="Leadership" title="Leading the Way" />

                <div className="mt-12 flex flex-wrap justify-center gap-6">
                  {leadership.map((person, i) => (
                    <MemberCard key={person._id} {...person} index={i} className="max-w-xs" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Departments */}
          {departments.length > 0 && (
            <section className="relative overflow-hidden border-t border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="t-drift-b absolute left-1/2 top-[-4rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 70%)" }}
                />
              </div>
              <div className="relative mx-auto max-w-6xl space-y-16">
                {departments.map((dept) => (
                  <div key={dept.name}>
                    <h2 className="text-xl font-semibold text-white">{dept.name}</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {dept.members.map((person, i) => (
                        <MemberCard key={person._id} {...person} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="t-drift-a absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <TeamCta />
      </section>

      <TeamStyles />
    </main>
  );
}

function SectionIntro({ eyebrow, title }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`t-fade-up-scroll text-center ${inView ? "t-in" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}

function TeamCta() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`t-fade-up-scroll relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14 ${
        inView ? "t-in" : ""
      }`}
    >
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
  );
}

function MemberCard({ name, role, initials, imageSrc, index = 0, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 70}ms` : "0ms" }}
      className={`t-fade-up-scroll w-full rounded-2xl border border-white/10 bg-slate-900 p-8 text-center ${
        inView ? "t-in" : ""
      } ${className}`}
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

function TeamStyles() {
  return (
    <style>{`
      @keyframes tFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .t-fade-up { animation: tFadeUp 0.7s ease-out both; }

      .t-fade-up-scroll { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .t-fade-up-scroll.t-in { opacity: 1; transform: translateY(0); }

      @keyframes tDriftA {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(24px, -18px) scale(1.08); }
      }
      @keyframes tDriftB {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-20px, 16px) scale(1.06); }
      }
      .t-drift-a { animation: tDriftA 13s ease-in-out infinite; }
      .t-drift-b { animation: tDriftB 15s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .t-fade-up, .t-fade-up-scroll, .t-drift-a, .t-drift-b {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}