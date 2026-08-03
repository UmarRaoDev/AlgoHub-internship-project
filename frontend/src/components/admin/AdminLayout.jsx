import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  Wrench,
  UserSquare2,
  Quote,
  Newspaper,
  Image,
  HelpCircle,
  GraduationCap,
  Mail,
  Send,
  Settings,
  Menu,
  X,
} from "lucide-react";

// Central nav list — add one line here whenever a new module gets a page.
// Routes that don't exist yet will just 404 until that module's page is added
// in App.jsx (that's expected while we build module-by-module).
const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Courses", to: "/admin/courses", icon: BookOpen },
  { label: "Internship", to: "/admin/internship", icon: Briefcase },
  { label: "Services", to: "/admin/services", icon: Wrench },
  { label: "Team", to: "/admin/team", icon: UserSquare2 },
  { label: "FAQs", to: "/admin/faqs", icon: HelpCircle },
  
];

export default function AdminLayout() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile topbar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/90 px-4 py-3 lg:hidden">
        <span className="text-sm font-semibold text-white">Admin Panel</span>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar — desktop */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/10 bg-black/40 px-4 py-6 lg:block">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
            {isAdmin ? "Admin" : "Editor"}
          </p>
          <nav className="mt-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <SidebarLink key={item.to} item={item} />
            ))}
          </nav>
        </aside>

        {/* Sidebar — mobile drawer */}
        <div className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className={`absolute left-0 top-0 h-full w-64 border-r border-white/10 bg-slate-950 px-4 py-6 transition-transform duration-300 ease-out ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
              {isAdmin ? "Admin" : "Editor"}
            </p>
            <nav className="mt-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <SidebarLink key={item.to} item={item} onNavigate={() => setMobileOpen(false)} />
              ))}
            </nav>
          </aside>
        </div>

        {/* Main content — each module page renders here via <Outlet /> */}
        <main className="min-h-screen flex-1 overflow-x-hidden px-4 py-8 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ item, onNavigate }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive ? "bg-blue-600/15 text-blue-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {item.label}
    </NavLink>
  );
}