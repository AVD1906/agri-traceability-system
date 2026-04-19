import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function Reports() {
  const [stats, setStats] = useState({
    products: 0,
    batches: 0,
    locations: 0,
    logs: 0,
  });

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const [p, b, l, log] = await Promise.all([
        fetch(`${API}/products`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/batches`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/locations`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/logs`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const [products, batches, locations, logs] = await Promise.all([
        p.json(),
        b.json(),
        l.json(),
        log.json(),
      ]);

      setStats({
        products: Array.isArray(products) ? products.length : 0,
        batches: Array.isArray(batches) ? batches.length : 0,
        locations: Array.isArray(locations) ? locations.length : 0,
        logs: Array.isArray(logs) ? logs.length : 0,
      });

    } catch (err) {
      console.error("Report error:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white/10 p-4 rounded">
          <p>Total Products</p>
          <h2 className="text-2xl font-bold">{stats.products}</h2>
        </div>

        <div className="bg-white/10 p-4 rounded">
          <p>Total Batches</p>
          <h2 className="text-2xl font-bold">{stats.batches}</h2>
        </div>

        <div className="bg-white/10 p-4 rounded">
          <p>Total Locations</p>
          <h2 className="text-2xl font-bold">{stats.locations}</h2>
        </div>

        <div className="bg-white/10 p-4 rounded">
          <p>Total Logs</p>
          <h2 className="text-2xl font-bold">{stats.logs}</h2>
        </div>

      </div>
    </div>
  );
}