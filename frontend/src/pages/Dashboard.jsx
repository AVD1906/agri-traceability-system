import React from "react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Batches",
      value: 12,
      color: "text-green-400",
    },
    {
      title: "Verified",
      value: 8,
      color: "text-green-500",
    },
    {
      title: "Pending",
      value: 4,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="
              bg-white/5
              backdrop-blur-xl
              border border-white/10
              rounded-2xl
              p-6
              shadow-lg
              hover:shadow-2xl
              transition
            "
          >
            <h2 className="text-gray-300">{item.title}</h2>

            <p className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;