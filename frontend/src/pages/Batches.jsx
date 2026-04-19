import React, { useEffect, useState } from "react";
import { getProducts, getLocations, createBatch } from "../api";

export default function Batches() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    location_id: "",
    status: "Pending",
    date: "",
  });

  // FETCH DATA
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setProducts([{ id: 1, name: "Tomato" }]);
      });

    getLocations()
      .then(setLocations)
      .catch(() => {
        setLocations([{ id: 1, name: "Farm" }]);
      });
  }, []);

  // ADD BATCH
  const addBatch = () => {
    if (!form.product_id || !form.quantity || !form.location_id) return;

    createBatch(form);

    setBatches([
      ...batches,
      {
        id: Date.now(),
        ...form,
        created_at: new Date().toLocaleString(),
      },
    ]);

    setForm({
      product_id: "",
      quantity: "",
      location_id: "",
      status: "Pending",
      date: "",
    });
  };

  const getName = (list, id) =>
    list.find((i) => String(i.id) === String(id))?.name || id;

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Batches</h1>

      {/* FORM */}
      <div className="bg-white/10 p-4 rounded grid md:grid-cols-6 gap-3">

        {/* PRODUCT */}
        <select
          value={form.product_id}
          onChange={(e) =>
            setForm({ ...form, product_id: e.target.value })
          }
          className="p-2 bg-white/10 rounded"
        >
          <option value="">Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* QUANTITY */}
        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          className="p-2 bg-white/10 rounded"
        />

        {/* LOCATION */}
        <select
          value={form.location_id}
          onChange={(e) =>
            setForm({ ...form, location_id: e.target.value })
          }
          className="p-2 bg-white/10 rounded"
        >
          <option value="">Location</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="p-2 bg-white/10 rounded"
        />

        {/* STATUS */}
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          className="p-2 bg-white/10 rounded"
        >
          <option>Pending</option>
          <option>Verified</option>
          <option>Rejected</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={addBatch}
          className="bg-green-600 hover:bg-green-500 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="relative pl-6 space-y-6">

        {/* vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-white/20"></div>

        {batches.map((b) => (
          <div key={b.id} className="relative">

            {/* DOT */}
            <div className="absolute -left-[10px] top-5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>

            {/* CARD */}
            <div className="bg-white/10 p-4 rounded ml-4">

              <p className="font-semibold text-lg">
                {getName(products, b.product_id)}
              </p>

              <p className="text-sm text-gray-300">
                Qty: {b.quantity} | {getName(locations, b.location_id)}
              </p>

              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={
                    b.status === "Verified"
                      ? "text-green-400"
                      : b.status === "Rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {b.status}
                </span>
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {b.created_at}
              </p>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}