import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import authService from "../services/authService";
import { ensureSeedData } from "../services/storageService";

const UserContext = createContext(null);

export const PERMISSIONS = {
  Farmer: [
    "view_dashboard",
    "view_products",
    "create_product",
    "view_batches",
    "create_batch",
    "view_logs",
    "create_log",
    "view_locations",
  ],
  Processor: [
    "view_dashboard",
    "view_products",
    "view_batches",
    "create_batch",
    "view_logs",
    "create_log",
    "view_reports",
    "view_locations",
  ],
  Distributor: [
    "view_dashboard",
    "view_products",
    "view_batches",
    "view_logs",
    "create_log",
    "view_locations",
  ],
  Retailer: [
    "view_dashboard",
    "view_products",
    "view_batches",
    "view_logs",
    "view_notifications",
  ],
  Admin: [
    "view_dashboard",
    "view_products",
    "create_product",
    "edit_product",
    "view_batches",
    "create_batch",
    "view_logs",
    "create_log",
    "view_locations",
    "create_location",
    "view_reports",
    "view_audit",
    "manage_roles",
    "view_notifications",
  ],
};

export function UserProvider({ children }) {
  ensureSeedData();

  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setAuthError("");
    try {
      const result = await authService.login(credentials);
      setUser(result.user);
      return result.user;
    } catch (error) {
      const message = error.message || "Unable to sign in.";
      setAuthError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    setAuthError("");
    try {
      const result = await authService.register(payload);
      setUser(result.user);
      return result.user;
    } catch (error) {
      const message = error.message || "Unable to register.";
      setAuthError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(""), []);

  const can = useCallback(
    (permission) => {
      if (!user?.role) {
        return false;
      }
      return (PERMISSIONS[user.role] || []).includes(permission);
    },
    [user]
  );

  const hasRole = useCallback(
    (roles) => {
      if (!user?.role) {
        return false;
      }
      const expectedRoles = Array.isArray(roles) ? roles : [roles];
      return expectedRoles.includes(user.role);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      authError,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      can,
      hasRole,
      clearAuthError,
    }),
    [
      authError,
      can,
      clearAuthError,
      hasRole,
      loading,
      login,
      logout,
      register,
      user,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return value;
}

export const useAuth = useUser;
