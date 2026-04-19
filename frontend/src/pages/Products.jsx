import React, { useEffect, useState } from "react";
import { getProducts, createProduct } from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "" });

  useEffect(() => {
    getProducts().then(setProducts).catch(() => {
      setProducts([{ id: 1, name: "Tomato", category: "Vegetable" }]);
    });
  }, []);

  const addProduct = () => {
    createProduct(form).then(() => {
      setProducts([...products, { id: Date.now(), ...form }]);
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="bg-white/10 p-4 rounded grid md:grid-cols-3 gap-3">
        <input placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="p-2 bg-white/10 rounded" />

        <input placeholder="Category"
          onChange={(e)=>setForm({...form,category:e.target.value})}
          className="p-2 bg-white/10 rounded" />

        <button onClick={addProduct} className="bg-green-600 rounded">
          Add
        </button>
      </div>

      {products.map(p=>(
        <div key={p.id} className="bg-white/10 p-3 rounded">
          {p.name} ({p.category})
        </div>
      ))}
    </div>
  );
}