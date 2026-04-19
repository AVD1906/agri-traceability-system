import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const location = useLocation();
  const { isAuthenticated, hasRole } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles.length && !hasRole(roles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
