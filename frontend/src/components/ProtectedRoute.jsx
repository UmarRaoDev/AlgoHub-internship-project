import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Usage:
// <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
// <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminPanel/></ProtectedRoute>} />
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-950">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}