import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import NotificationBell from "./ui/NotificationBell";
import RoleGate from "./ui/RoleGate";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", permission: "view_dashboard" },
  { to: "/products", label: "Products", permission: "view_products" },
  { to: "/batches", label: "Batches", permission: "view_batches" },
  { to: "/logs", label: "Logs", permission: "view_logs" },
  { to: "/locations", label: "Locations", permission: "view_locations" },
  { to: "/notifications", label: "Notifications", permission: "view_notifications" },
  { to: "/reports", label: "Reports", permission: "view_reports" },
  { to: "/audit", label: "Audit Logs", permission: "view_audit" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { logout, user } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f241d] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/5 bg-[#133126] px-6 py-8 lg:flex">
          <div>
            <div className="mb-10">
              <div className="mb-2 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
                AgriTrace
              </div>
              <h1 className="text-2xl font-semibold text-white">Supply Chain Control</h1>
              <p className="mt-2 text-sm leading-6 text-emerald-50/60">
                Integration layer for products, batches, logs, and approvals.
              </p>
            </div>

            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <RoleGate key={item.to} permission={item.permission}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-emerald-400/15 text-white shadow-lg shadow-emerald-950/20"
                          : "text-emerald-50/70 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </RoleGate>
              ))}
            </nav>
          </div>

          <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/50">
              Signed in as
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">{user?.name}</h3>
            <p className="text-sm text-emerald-100/65">
              {user?.role} · {user?.orgName || "AgriTrace Workspace"}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0f241d]/90 px-5 py-4 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-100/45">
                  Frontend Dev 2
                </p>
                <h2 className="text-xl font-semibold text-white">
                  Welcome back, {user?.name?.split(" ")[0] || "User"}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right md:block">
                  <p className="text-sm font-medium text-white">{user?.role}</p>
                  <p className="text-xs text-emerald-50/60">{user?.email}</p>
                </div>
                <NotificationBell />
              </div>
            </div>
          </header>

          <main className="px-5 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
