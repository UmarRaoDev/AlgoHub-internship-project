import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import aboutPic from "../assets/aboutPic.avif"

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

export default function About() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="a-drift-a absolute left-[8%] top-[-6rem] h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)" }}
          />
          <div
            className="a-drift-b absolute right-[6%] bottom-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.32) 0%, rgba(14,165,233,0) 70%)" }}
          />
        </div>
        <div className="a-fade-up relative mx-auto max-w-4xl text-center">
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
        <StoryBlock />
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden border-y border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="a-drift-b absolute left-1/2 top-[-4rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          <MissionCard
            index={0}
            Icon={TargetIcon}
            title="Mission"
            text="To simplify technology for companies by building smart, scalable, and secure software solutions that empower businesses and communities."
          />
          <MissionCard
            index={1}
            Icon={CompassIcon}
            title="Vision"
            text="To become a globally recognized technology company delivering innovative software, AI, and digital transformation solutions while representing Pakistani engineering talent on the international stage."
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro eyebrow="What Drives Us" title="Our Core Values" />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CORE_VALUES.map((value, i) => (
              <ValueCard key={value} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative overflow-hidden border-t border-white/10 bg-slate-900/40 px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="a-drift-a absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0) 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <SectionIntro eyebrow="The People Behind AlgoHub" title="Leadership Team" />

          <div className="mt-12 flex justify-center">
            {LEADERSHIP.map((person, i) => (
              <LeaderCard key={person.name} {...person} index={i} />
            ))}
          </div>
        </div>
      </section>

      <AboutStyles />
    </main>
  );
}

function SectionIntro({ eyebrow, title }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`a-fade-up-scroll text-center ${inView ? "a-in" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}

function StoryBlock() {
  const [textRef, textIn] = useInView({ threshold: 0.15 });
  const [imgRef, imgIn] = useInView({ threshold: 0.15 });

  return (
    <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
      <div ref={textRef} className={`a-slide-left ${textIn ? "a-in" : ""}`}>
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

      <div
        ref={imgRef}
        className={`a-slide-right overflow-hidden rounded-2xl border border-white/10 ${
          imgIn ? "a-in" : ""
        }`}
      >
        <img
          src={aboutPic}
          alt="AlgoHub team members sitting together"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function MissionCard({ index, Icon, title, text }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
      className={`a-fade-up-scroll rounded-2xl border border-white/10 bg-slate-900 p-8 ${
        inView ? "a-in" : ""
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
    </div>
  );
}

function ValueCard({ value, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 50}ms` : "0ms" }}
      className={`a-fade-up-scroll rounded-xl border border-white/10 bg-slate-900 px-5 py-6 text-center transition-colors hover:border-blue-600/40 ${
        inView ? "a-in" : ""
      }`}
    >
      <span className="text-sm font-medium text-slate-200">{value}</span>
    </div>
  );
}

function LeaderCard({ name, role, initials, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 70}ms` : "0ms" }}
      className={`a-fade-up-scroll w-full max-w-xs rounded-2xl border border-white/10 bg-slate-900 p-8 text-center ${
        inView ? "a-in" : ""
      }`}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/15 text-lg font-semibold text-blue-500">
        {initials}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{name}</h3>
      <p className="mt-1 text-sm text-slate-400">{role}</p>
    </div>
  );
}

function AboutStyles() {
  return (
    <style>{`
      @keyframes aFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .a-fade-up { animation: aFadeUp 0.7s ease-out both; }

      .a-fade-up-scroll { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
      .a-fade-up-scroll.a-in { opacity: 1; transform: translateY(0); }

      .a-slide-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.65s ease-out, transform 0.65s ease-out; }
      .a-slide-left.a-in { opacity: 1; transform: translateX(0); }

      .a-slide-right { opacity: 0; transform: translateX(28px); transition: opacity 0.65s ease-out, transform 0.65s ease-out; }
      .a-slide-right.a-in { opacity: 1; transform: translateX(0); }

      @keyframes aDriftA {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(24px, -18px) scale(1.08); }
      }
      @keyframes aDriftB {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-20px, 16px) scale(1.06); }
      }
      .a-drift-a { animation: aDriftA 13s ease-in-out infinite; }
      .a-drift-b { animation: aDriftB 15s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .a-fade-up, .a-fade-up-scroll, .a-slide-left, .a-slide-right, .a-drift-a, .a-drift-b {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
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