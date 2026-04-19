import { useUser } from "../../context/UserContext";

export default function RoleGate({ children, roles = [], permission }) {
  const { hasRole, can } = useUser();

  if (roles.length && !hasRole(roles)) {
    return null;
  }

  if (permission && !can(permission)) {
    return null;
  }

  return children;
}
