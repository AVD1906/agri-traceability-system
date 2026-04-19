import React from "react";

export default function Audit() {
  const logs = [
    { user:"Admin", action:"Created Batch", entity:"Batch 1" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Audit Logs</h1>

      {logs.map((l,i)=>(
        <div key={i} className="bg-white/10 p-3 rounded mt-3">
          {l.user} → {l.action} ({l.entity})
        </div>
      ))}
    </div>
  );
}