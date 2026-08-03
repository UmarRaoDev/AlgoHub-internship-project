import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Wrench, BookOpen, UserSquare2, HelpCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getDashboardStatsRequest } from "../../api/dashboardApi";

// One entry per module that's actually built. Add a line here (and a
// matching count in backend/controllers/dashboardController.js) whenever
// a new module — Team, Testimonials, FAQs, etc. — gets built. Cards for
// modules not in this list simply don't render, so this is the only
// frontend change needed to add a new stat.
const CARD_DEFS = [
  { key: "users", label: "Users", icon: Users, to: "/admin/users" },
  { key: "services", label: "Services", icon: Wrench, to: "/admin/services" },
  {
    key: "courses",
    label: "Courses",
    icon: BookOpen,
    to: "/admin/courses",
    subLabel: (stats) => `${stats.coursesPublished} published · ${stats.coursesDraft} draft`,
  },
  { key: "team", label: "Team", icon: UserSquare2, to: "/admin/team" },
  { key: "faqs", label: "FAQs", icon: HelpCircle, to: "/admin/faqs" },
];

export default function AdminDashboard() {
  const { accessToken, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDashboardStatsRequest(accessToken);
        setStats(data.stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
        {isAdmin ? "Admin" : "Editor"}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
      <p className="mt-3 text-sm text-slate-400">
        Overview of content across the site. A card appears here for each module once it's built.
      </p>

      {error && (
        <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? CARD_DEFS.map((card) => <SkeletonCard key={card.key} />)
          : CARD_DEFS.map((card) => (
              <StatCard
                key={card.key}
                label={card.label}
                value={stats ? stats[card.key] : "—"}
                subLabel={stats && card.subLabel ? card.subLabel(stats) : null}
                Icon={card.icon}
                to={card.to}
              />
            ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, subLabel, Icon, to }) {
  return (
    <Link
      to={to}
      className="block rounded-2xl border border-white/10 bg-slate-900 px-6 py-5 transition-colors hover:border-blue-600/40"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        <Icon className="h-4 w-4 text-blue-500" />
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      {subLabel && <p className="mt-1 text-xs text-slate-500">{subLabel}</p>}
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-slate-900 px-6 py-5">
      <div className="h-3 w-20 rounded bg-slate-800" />
      <div className="mt-3 h-7 w-12 rounded bg-slate-800" />
    </div>
  );
}