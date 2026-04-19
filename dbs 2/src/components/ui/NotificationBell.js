import { useMemo, useState } from "react";
import { useAppData } from "../../context/AppDataContext";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markNotificationAsRead } = useAppData();

  const recentNotifications = useMemo(
    () => notifications.slice(0, 5),
    [notifications]
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-emerald-50 transition hover:bg-white/10"
      >
        <span className="text-lg">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 min-w-6 rounded-full bg-emerald-400 px-2 text-xs font-semibold text-emerald-950">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-16 z-50 w-80 rounded-3xl border border-white/10 bg-[#16392e]/95 p-4 shadow-2xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
              <p className="text-xs text-emerald-50/60">
                {unreadCount} unread update{unreadCount === 1 ? "" : "s"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-2 text-lg text-emerald-50/70 transition hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {recentNotifications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-emerald-50/60">
                No notifications yet.
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <button
                  type="button"
                  key={notification.notification_id}
                  onClick={() => markNotificationAsRead(notification.notification_id)}
                  className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${
                    notification.status === "Unread"
                      ? "border-emerald-300/20 bg-emerald-400/10"
                      : "border-white/5 bg-white/5"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white">
                      {notification.message}
                    </span>
                    {notification.status === "Unread" && (
                      <span className="rounded-full bg-emerald-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-950">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-50/60">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
