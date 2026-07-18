import healthcare from "../assets/healthcare.png";
import finance from "../assets/finance.png";
import retail from "../assets/retail.png";
import education from "../assets/education.png";
import manufacturing from "../assets/manufacturing.png"; // Keep this if your file is actually named "manfacturing.png"
import logistics from "../assets/logistics.png";
import realestate from "../assets/realestate.png";
import government from "../assets/government.png";

const PROJECTS = [
  {
    category: "Healthcare",
    title: "HIPAA-Compliant Telemedicine Platform",
    description:
      "AlgoHub built an end-to-end HIPAA-compliant telemedicine platform with encrypted video, BAA-covered infrastructure on AWS, and secure patient record handling.",
    slug: "hipaa-telemedicine-platform",
    image: healthcare,
  },
  {
    category: "Finance",
    title: "PCI-DSS Compliant Payment Gateway",
    description:
      "AlgoHub re-architected the payment gateway on PCI-DSS Level 1 certified infrastructure with tokenisation, point-to-point encryption, and fraud detection.",
    slug: "pci-dss-payment-gateway",
    image: finance,
  },
  {
    category: "Retail",
    title: "Omnichannel Commerce Platform",
    description:
      "AlgoHub deployed a unified omnichannel POS layer connecting in-store, online, and mobile channels into a single real-time inventory system.",
    slug: "omnichannel-commerce-platform",
    image: retail,
  },
  {
    category: "Education",
    title: "Scalable LMS with Adaptive Learning",
    description:
      "AlgoHub re-platformed the LMS on a microservices architecture auto-scaling on Kubernetes, sustaining 50,000 concurrent users during peak exam periods.",
    slug: "scalable-lms-adaptive-learning",
    image: education,
  },
  {
    category: "Manufacturing",
    title: "IoT-Driven Predictive Maintenance",
    description:
      "AlgoHub deployed 1,400 IoT sensors across CNC machines, conveyor systems, and HVAC, feeding a real-time telemetry pipeline for predictive maintenance alerts.",
    slug: "iot-predictive-maintenance",
    image: manufacturing,
  },
  {
    category: "Logistics",
    title: "Real-Time Fleet Intelligence Platform",
    description:
      "AlgoHub built a live fleet tracking platform ingesting GPS telemetry from 2,300 vehicles at 30-second intervals, with automated dispatch and route optimization.",
    slug: "real-time-fleet-intelligence",
    image: logistics,
  },
  {
    category: "Real Estate",
    title: "Property Management AR Portal",
    description:
      "AlgoHub built a unified property management portal for landlords and tenants on one platform, with 3D AR virtual tour capability for remote viewings.",
    slug: "property-management-ar-portal",
    image: realestate,
  },
  {
    category: "Government",
    title: "Secure Citizen Services Portal",
    description:
      "AlgoHub designed a unified citizen portal consolidating all 14 services under a single authenticated identity layer with end-to-end encryption.",
    slug: "secure-citizen-services-portal",
    image: government,
  },
];
const CATEGORY_STYLES = {
  Healthcare: "bg-sky-500/15 text-sky-400",
  Finance: "bg-emerald-500/15 text-emerald-400",
  Retail: "bg-amber-500/15 text-amber-400",
  Education: "bg-violet-500/15 text-violet-400",
  Manufacturing: "bg-orange-500/15 text-orange-400",
  Logistics: "bg-cyan-500/15 text-cyan-400",
  "Real Estate": "bg-rose-500/15 text-rose-400",
  Government: "bg-blue-500/15 text-blue-400",
};

export default function Portfolio() {
  return (
    <main className="bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Our Work
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Explore how we've helped leading enterprises transform their operations
            through custom software engineering.
          </h1>
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {PROJECTS.map(({ category, title, description, slug, image }) => (
            <div
              key={slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-colors hover:border-blue-600/40"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-800">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-8">
                <span
                  className={`inline-block w-fit rounded-md px-3 py-1 text-xs font-semibold ${
                    CATEGORY_STYLES[category] ?? "bg-blue-500/15 text-blue-400"
                  }`}
                >
                  {category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {description}
                </p>
                <a
                  href={`/portfolio/${slug}`}
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-lg border border-blue-600/50 px-5 py-2.5 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  Read Case Study
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-10 text-center sm:p-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Let's talk about how we can help bring it to life.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </main>
  );
}