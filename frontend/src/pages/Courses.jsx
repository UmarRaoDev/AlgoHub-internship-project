import { useEffect, useRef, useState } from "react";

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

const COURSES = [
  {
    title: "Full-Stack Web Development",
    level: "Beginner to Intermediate",
    duration: "8 Weeks",
    description:
      "Learn to build modern web applications from scratch using React, Node.js, and MongoDB, with hands-on projects each week.",
    icon: CodeIcon,
  },
  {
    title: "AI & Machine Learning Fundamentals",
    level: "Intermediate",
    duration: "10 Weeks",
    description:
      "Understand core ML concepts, Python tooling, and how to build and deploy real-world AI models for business use cases.",
    icon: SparkIcon,
  },
  {
    title: "React & Modern Frontend",
    level: "Beginner",
    duration: "6 Weeks",
    description:
      "Master component-driven UI development with React, Tailwind CSS, and state management patterns used in production apps.",
    icon: LayersIcon,
  },
  {
    title: "Cloud & DevOps Essentials",
    level: "Intermediate",
    duration: "6 Weeks",
    description:
      "Get hands-on with AWS, Docker, and CI/CD pipelines to deploy and scale applications the way modern teams do.",
    icon: CloudIcon,
  },
  {
    title: "Mobile App Development",
    level: "Beginner to Intermediate",
    duration: "8 Weeks",
    description:
      "Build cross-platform mobile apps with Flutter and React Native, from UI design to publishing on app stores.",
    icon: PhoneIcon,
  },
  {
    title: "UI/UX Design Bootcamp",
    level: "Beginner",
    duration: "5 Weeks",
    description:
      "Learn design thinking, wireframing, and prototyping in Figma to design interfaces people actually enjoy using.",
    icon: PenIcon,
  },
];

const WHY_POINTS = [
  {
    title: "Industry-Led Curriculum",
    description: "Course content shaped by real projects our engineering team ships for clients.",
  },
  {
    title: "Hands-On Projects",
    description: "Every course ends with a portfolio-ready project, not just theory.",
  },
  {
    title: "Mentorship & Support",
    description: "Direct guidance from AlgoHub engineers throughout your learning journey.",
  },
  {
    title: "Certificate on Completion",
    description: "Earn a verifiable AlgoHub certificate to showcase your new skills.",
  },
];

export default function Courses() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="co-drift-a absolute left-[8%] top-[-6rem] h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)" }}
          />
          <div
            className="co-drift-b absolute right-[6%] bottom-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.32) 0%, rgba(14,165,233,0) 70%)" }}
          />
        </div>
        <div className="co-fade-up relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            AlgoHub Academy
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Practical tech courses, built by the engineers who build enterprise software.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            Learn the same skills our team uses daily — from web development to AI —
            through project-based courses designed for real-world readiness.
          </p>
        </div>
      </section>

      {/* Courses grid */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro eyebrow="Our Courses" title="Choose Your Learning Path" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map(({ title, level, duration, description, icon: Icon }, i) => (
              <CourseCard
                key={title}
                title={title}
                level={level}
                duration={duration}
                description={description}
                Icon={Icon}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why learn with us */}
      <section className="relative overflow-hidden border-t border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="co-drift-b absolute left-1/2 top-[-4rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <SectionIntro eyebrow="Why AlgoHub Academy" title="Learn by Building, Not Just Watching" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_POINTS.map(({ title, description }, i) => (
              <WhyCard key={title} title={title} description={description} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="co-drift-a absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <CoursesCta />
      </section>

      <CoursesStyles />
    </main>
  );
}

function SectionIntro({ eyebrow, title }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`co-fade-up-scroll text-center ${inView ? "co-in" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}

function CourseCard({ title, level, duration, description, Icon, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 70}ms` : "0ms" }}
      className={`co-fade-up-scroll flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-colors hover:border-blue-600/40 ${
        inView ? "co-in" : ""
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/15">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
          {level}
        </span>
        <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
          {duration}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
      <a
        href="/courses/enroll"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 transition-colors hover:text-blue-400"
      >
        Enroll now
        <ArrowIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function WhyCard({ title, description, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
      className={`co-fade-up-scroll rounded-xl border border-white/10 bg-slate-900 p-6 ${inView ? "co-in" : ""}`}
    >
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function CoursesCta() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`co-fade-up-scroll relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14 ${
        inView ? "co-in" : ""
      }`}
    >
      <h2 className="text-2xl font-bold text-white sm:text-3xl">
        Ready to start learning?
      </h2>
      <p className="mt-3 text-sm text-slate-400 sm:text-base">
        Join the next cohort and build real, job-ready skills with AlgoHub Academy.
      </p>
      <a
        href="/courses/enroll"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
      >
        Get Started
      </a>
    </div>
  );
}

function CoursesStyles() {
  return (
    <style>{`
      @keyframes coFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .co-fade-up { animation: coFadeUp 0.7s ease-out both; }

      .co-fade-up-scroll { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .co-fade-up-scroll.co-in { opacity: 1; transform: translateY(0); }

      @keyframes coDriftA {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(24px, -18px) scale(1.08); }
      }
      @keyframes coDriftB {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-20px, 16px) scale(1.06); }
      }
      .co-drift-a { animation: coDriftA 13s ease-in-out infinite; }
      .co-drift-b { animation: coDriftB 15s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .co-fade-up, .co-fade-up-scroll, .co-drift-a, .co-drift-b {
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

function CodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
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

function LayersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
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

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
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