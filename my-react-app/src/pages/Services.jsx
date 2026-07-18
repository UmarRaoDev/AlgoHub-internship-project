const SERVICES = [
  {
    title: "Custom Software Development",
    description:
      "Tailored enterprise software designed around your unique business workflows.",
    href: "/services/custom-software-development",
    icon: CodeIcon,
  },
  {
    title: "Web App Development",
    description:
      "Modern, scalable web applications built with React, Next.js, and Node.js.",
    href: "/services/web-application-development",
    icon: GlobeIcon,
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps using Flutter and React Native.",
    href: "/services/mobile-app-development",
    icon: PhoneIcon,
  },
  {
    title: "Artificial Intelligence Solutions",
    description:
      "Intelligent software powered by Machine Learning, AI, and automation.",
    href: "/services/data-engineering-ai",
    icon: SparkIcon,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Cloud deployment, CI/CD pipelines, Docker, Firebase, AWS, and infrastructure automation.",
    href: "/services/cloud-infrastructure-devops",
    icon: CloudIcon,
  },
  {
    title: "UI/UX Design",
    description: "User-centric interface design and prototyping.",
    href: "/services/uiux-design-strategy",
    icon: PenIcon,
  },
  {
    title: "API Development & Integration",
    description: "Building secure and scalable APIs to connect disparate systems.",
    href: "/services/api-development-integration",
    icon: PlugIcon,
  },
  {
    title: "Quality Assurance & Testing",
    description: "Comprehensive automated and manual testing.",
    href: "/services/quality-assurance-testing",
    icon: CheckShieldIcon,
  },
];

export default function Services() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Enterprise Services
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Scalable software engineering, AI integration, and cloud architecture
            tailored for your industry.
          </h1>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, description, href, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-colors hover:border-blue-600/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/15">
                <Icon className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                {description}
              </p>
              <a
                href={href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 transition-colors hover:text-blue-400"
              >
                Learn more
                <ArrowIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
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

function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
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

function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
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

function PlugIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22v-5M9 8V2M15 8V2M18 8H6a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V10a2 2 0 0 0-2-2Z" />
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