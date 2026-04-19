import Layout from "../components/Layout";
import { useState } from "react";

export default function Reports() {
  const [reports] = useState([
    { id: 1, type: "Supply Report", status: "Generated" }
  ]);

  return (
    <Layout>
      <h1 className="title">Reports</h1>

      <div className="card">
        {reports.length === 0 ? (
          <p className="text-gray-400">No reports</p>
        ) : (
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
                <p className="text-white">{r.type}</p>
                <p className="text-gray-400 text-sm">{r.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}