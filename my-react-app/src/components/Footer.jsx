import logo from "../assets/logo.png";


const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Internship", href: "/internships" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Custom Software", href: "/services" },
  { label: "AI Solutions", href: "/services" },
  { label: "Web Development", href: "/services" },
  { label: "Mobile Apps", href: "/services" },
  { label: "Cloud & DevOps", href: "/services" },
  { label: "UI/UX Design", href: "/services" },
];

const WHATSAPP_LINK = "https://wa.me/message/ZOMUVFYRNUSBN1";

// NOTE: swap the <a> tags for react-router-dom's <Link to="..."> if this
// project uses client-side routing — hrefs are already set up to match 1:1.

export default function Footer({ logoSrc = "/logo.png", logoAlt = "AlgoHub" }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt={logoAlt} className="h-8 w-auto" />
            </a>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-blue-500">
              Code Revolution
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Empowering enterprise businesses through world-class software engineering,
              intuitive design, and scalable cloud infrastructure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICES.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <li className="leading-relaxed">
                Office #02, Software Technology Park, UET Mardan, Khyber Pakhtunkhwa, Pakistan
              </li>
              <li>
                <a href="mailto:contact@algohubsmc.com" className="transition-colors hover:text-white">
                  contact@algohubsmc.com
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp Business
                </a>
              </li>
              <li>
                <a href="/" className="transition-colors hover:text-white">
                  algohubsmc.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© {year} AlgoHub SMC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="text-xs text-slate-500 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-xs text-slate-500 transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}