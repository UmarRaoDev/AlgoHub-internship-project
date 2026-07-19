import { useEffect, useRef, useState } from "react";
import { ArrowRight, PlayCircle, ChevronDown } from "lucide-react";
import Highlights from "./Highlights";
import VerifyAndCTA from "./VerifyAndCTA"

const HEADLINE_LINE_1 = "AI-Powered Digital";
const HEADLINE_LINE_2 = "Transformation";

const CODE_SNIPPETS = [
  `const build = await algohub.deploy({
  scale: "enterprise",
  security: "first",
  timeline: "concept → launch",
});`,
  `ai.generate({
  prompt: "optimize checkout flow",
  model: "algohub-ai-v2",
});
// → conversion +18% in 3 weeks`,
  `$ algohub deploy --env production
✓ Build passed · 0 vulnerabilities
✓ Live in 42s · 99.9% uptime`,
];

export default function Hero() {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    sectionRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    sectionRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="spotlight relative overflow-hidden bg-black pb-20 pt-10 sm:pt-24 lg:pt-28"
    >
      <GridBackdrop />

      <div className="relative mx-auto max-w-5xl px-6 text-center ">
        {/* Eyebrow, terminal-style */}
        <div className="reveal mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-slate-400 sm:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-emerald-400">$</span> response_time &nbsp;--under-24h
        </div>
                 
        {/* Kinetic headline */}
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tighter text-white sm:text-6xl sm:leading-[0.95] lg:text-7xl">
          <WordReveal text={HEADLINE_LINE_1} delayStart={0} />
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
            <WordReveal text={HEADLINE_LINE_2} delayStart={2} />
          </span>
        </h1>

        <p className="reveal-delayed mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-7 sm:text-xl lg:text-2xl">
          We design and develop scalable, secure, and AI-powered software solutions for
          startups, businesses, government organizations, and global enterprises. From
          concept to deployment, we build technology that solves real-world problems.
        </p>

        {/* CTAs */}
        <div className="reveal-delayed mt-6 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
          <MagneticButton
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors duration-200 hover:bg-blue-500 sm:px-7 sm:py-3.5"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:border-white/30 hover:bg-white/5 sm:px-7 sm:py-3.5"
          >
            <PlayCircle className="h-4 w-4 text-slate-400 transition-colors duration-200 group-hover:text-white" />
            View Our Work
          </MagneticButton>
        </div>
      </div>

      {/* Live terminal — signature element */}
      <div className="reveal-delayed relative mx-auto mt-16 max-w-3xl px-6">
        <div className="drift-slow pointer-events-none absolute inset-x-10 -inset-y-6 -z-10 rounded-[2rem] bg-blue-600/10 blur-3xl" />
        <TiltCard />
      </div>

      {/* Scroll cue */}
      <div className="relative mt-14 flex justify-center">
        <ChevronDown className="h-5 w-5 animate-bounce text-slate-600" />
      </div>

      {/* Trusted-by marquee */}
      <div className="relative mt-10 border-t border-white/10 py-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
          Trusted by Innovators
        </p>
        <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-16">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                <GoogleMark />
                <AwsMark />
                <WindowsMark />
              </div>

              
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .spotlight::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(560px circle at var(--mx, 50%) var(--my, 20%), rgba(37, 99, 235, 0.16), transparent 70%);
          transition: background 0.1s ease-out;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 24s linear infinite; }
        .group:hover .animate-marquee { animation-play-state: paused; }

        @keyframes wordUp {
          from { transform: translateY(110%); }
          to { transform: translateY(0%); }
        }
        .word-up { animation: wordUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal { animation: fadeUp 0.6s ease-out both; }
        .reveal-delayed { animation: fadeUp 0.7s ease-out 0.5s both; }

        @keyframes caretBlink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .caret { animation: caretBlink 1s step-end infinite; }

        @keyframes driftSlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.08); }
        }
        @keyframes driftReverse {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-24px, 18px) scale(1.05); }
        }
        .drift-slow { animation: driftSlow 14s ease-in-out infinite; }
        .drift-reverse { animation: driftReverse 16s ease-in-out infinite; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-14px); }
        }
        .twinkle { animation: twinkle 8s ease-in-out infinite; }

        @keyframes gridPan {
          from { background-position: 0px 0px; }
          to { background-position: 48px 48px; }
        }
        .grid-pan { animation: gridPan 18s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .word-up, .reveal, .reveal-delayed, .animate-marquee, .caret, .drift-slow, .drift-reverse, .twinkle, .grid-pan { animation: none !important; }
        }
      `}</style>

      
  <Highlights/>
  <VerifyAndCTA/>
    </section>
  );

}

/* ---------- kinetic word reveal ---------- */

function WordReveal({ text, delayStart = 0 }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <span key={word + i} className="inline-block overflow-hidden pb-1 align-bottom">
      <span
        className="word-up inline-block"
        style={{ animationDelay: `${(delayStart + i) * 90}ms` }}
      >
        {word}
        {i < words.length - 1 ? "\u00A0" : ""}
      </span>
    </span>
  ));
}

/* ---------- magnetic CTA buttons ---------- */

function MagneticButton({ href, children, className }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.35}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`${className} transition-transform duration-200 ease-out active:scale-95`}
    >
      {children}
    </a>
  );
}

/* ---------- tilting live-terminal window ---------- */

function TiltCard() {
  const cardRef = useRef(null);
  const text = useTypewriter(CODE_SNIPPETS);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${py * -8}deg) rotateY(${px * 10}deg) translateY(-2px)`;
  };

  const reset = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transition: "transform 0.3s ease-out" }}
      className="rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-blue-950/40 backdrop-blur-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-3 font-mono text-xs text-slate-500">algohub — production.js</span>
      </div>
      <pre className="min-h-[160px] overflow-hidden whitespace-pre-wrap px-6 py-6 text-left font-mono text-[13px] leading-relaxed text-slate-300 sm:text-sm">
        {text}
        <span className="caret text-blue-400">▍</span>
      </pre>
    </div>
  );
}

function useTypewriter(snippets, { typingSpeed = 26, deletingSpeed = 12, pause = 1500 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const full = snippets[index];
    let timeout;

    if (phase === "typing") {
      if (text.length < full.length) {
        timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setIndex((i) => (i + 1) % snippets.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, snippets, typingSpeed, deletingSpeed, pause]);

  return text;
}

/* ---------- background grid ---------- */

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: Math.round((i * 137.5) % 100),
  top: Math.round((i * 71.3) % 100),
  size: 1.5 + ((i * 37) % 3),
  duration: 6 + ((i * 13) % 10),
  delay: (i * 0.37) % 6,
}));

function GridBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-pan absolute inset-0 opacity-[0.07]" style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      <div className="drift-slow absolute left-1/2 top-[-8rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[130px]" />
      <div className="drift-reverse absolute right-[8%] top-1/3 h-[22rem] w-[22rem] rounded-full bg-sky-500/15 blur-[110px]" />
      <div className="drift-slow absolute left-[6%] top-1/2 h-[20rem] w-[20rem] rounded-full bg-cyan-400/15 blur-[110px]" />

      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="twinkle absolute rounded-full bg-blue-300"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- minimal brand marks ---------- */

function GoogleMark() {
  return (
    <div className="flex shrink-0 items-center gap-2 opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="#4285F4" d="M22.5 12.23c0-.79-.07-1.54-.2-2.27H12v4.3h5.9a5.04 5.04 0 0 1-2.19 3.31v2.75h3.54c2.08-1.92 3.25-4.74 3.25-8.09Z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.76c-.98.66-2.24 1.05-3.74 1.05-2.87 0-5.3-1.94-6.17-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
        <path fill="#FBBC05" d="M5.83 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.65-2.84Z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.96 1 12 1a11 11 0 0 0-9.82 6.06l3.65 2.84C6.7 7.32 9.13 5.38 12 5.38Z" />
      </svg>
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-300">Google</span>
    </div>
  );
}

function AwsMark() {
  return (
    <div className="flex shrink-0 items-center gap-2 opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect width="24" height="24" rx="5" fill="#FF9900" />
        <text x="12" y="16" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#111827" fontFamily="ui-sans-serif, system-ui">
          aws
        </text>
      </svg>
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-300">AWS</span>
    </div>
  );
}

function WindowsMark() {
  return (
    <div className="flex shrink-0 items-center gap-2 opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="2" width="9" height="9" fill="#00ADEF" />
        <rect x="13" y="2" width="9" height="9" fill="#00ADEF" />
        <rect x="2" y="13" width="9" height="9" fill="#00ADEF" />
        <rect x="13" y="13" width="9" height="9" fill="#00ADEF" />
      </svg>
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-300">Windows</span>
    </div>
  );
}