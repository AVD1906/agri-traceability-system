import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const notifications = [
    "Batch added successfully",
    "Certificate verified",
    "New log created",
  ];

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Batches", path: "/batches" },
    { name: "Logs", path: "/logs" },
    { name: "Locations", path: "/locations" },
    { name: "Reports", path: "/reports" },
    { name: "Audit Logs", path: "/audit-logs" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1f3a] via-[#1f4d3d] to-[#022c22] text-white">

      {/* SIDEBAR */}
      <div className="w-64 p-5 bg-[#020617]/70 backdrop-blur-xl border-r border-white/10 shadow-xl">

        <h1 className="text-2xl font-bold text-green-400 mb-8 flex items-center gap-2">
             AgriTrace
        </h1>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    : "hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-10 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
          <p className="text-sm text-gray-300">Signed in as</p>
          <p className="text-green-400 font-semibold">Farmer</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8 relative">

        {/* 🔔 NOTIFICATION */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={() => setOpen(!open)}
            className="bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition"
          >
            🔔
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-lg">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-white/20 rounded"
                >
                  {n}
                </div>
              ))}
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}