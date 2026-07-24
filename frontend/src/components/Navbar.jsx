import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "#",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Courses", href: "/courses" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Expertise",
    href: "#",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Technologies", href: "/technologies" },
    ],
  },
  { label: "Work", href: "/portfolio" },
  { label: "Internship Program", href: "/internship" },
  { label: "Our Team", href: "/team" },
];

const WHATSAPP_LINK = "https://wa.me/message/ZOMUVFYRNUSBN1";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        
        {/* Brand Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 group">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li
              key={link.label}
              className="group relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => link.children && setOpenDropdown(null)}
            >
              <a
                href={link.href}
                className="relative flex items-center gap-1 text-base font-medium text-slate-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
                {link.children && (
                  <ChevronIcon
                    className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${
                      openDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-blue-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>

              {link.children && (
                <div
                  className={`absolute left-0 top-full pt-3 transition-all duration-300 ease-out ${
                    openDropdown === link.label
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <ul className="w-52 rounded-xl border border-white/10 bg-slate-900/95 py-2 shadow-xl shadow-black/50 backdrop-blur-md">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          to={child.href}
                          className="block px-4 py-2 text-sm text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white"
          >
            <WhatsAppIcon className="h-4 w-4 text-emerald-400 transition-transform duration-200 group-hover:scale-110" />
            Chat
          </a>

          {user ? (
            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
              <Link
                to="/profile"
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                Profile
              </Link>
              {(user.role === "admin" || user.role === "editor") && (
                <Link
                  to="/admin/users"
                  className="text-sm font-medium text-slate-300 hover:text-white"
                >
                  {user.role === "admin" ? "Admin" : "Users"}
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium text-slate-300 hover:border-white/30 hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white"
            >
              Log In
            </Link>
          )}

          <Link
            to="/contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 active:scale-95"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile View: Actions directly accessible + Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {user ? (
            <Link
              to="/profile"
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Log In
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`grid overflow-hidden bg-slate-950 transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? "grid-rows-[1fr] border-t border-white/10 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 px-6 py-4">
          <ul className="flex flex-col divide-y divide-white/5">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="py-1">
                {link.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileAccordion((prev) => (prev === link.label ? null : link.label))
                      }
                      className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-slate-300"
                    >
                      {link.label}
                      <ChevronIcon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileAccordion === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-200 ${
                        mobileAccordion === link.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="ml-3 flex min-h-0 flex-col gap-1 pb-2">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1.5 text-sm text-slate-400 hover:text-white"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm font-medium text-slate-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4">
            {user && (
              <>
                {(user.role === "admin" || user.role === "editor") && (
                  <Link
                    to="/admin/users"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center rounded-lg border border-white/10 py-2 text-sm font-medium text-slate-300"
                  >
                    {user.role === "admin" ? "Admin Panel" : "View Users"}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 py-2 text-sm font-medium text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-sm font-medium text-slate-300"
            >
              <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
              Chat on WhatsApp
            </a>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ChevronIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.13 1.02-2.42.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.18-.19.75-.87.95-1.17.2-.29.4-.24.67-.15.27.1 1.72.81 2.02.96.29.15.49.22.56.34.07.13.07.75-.17 1.42z" />
    </svg>
  );
}