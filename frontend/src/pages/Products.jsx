import React, { useEffect, useState } from "react";
import { getProducts, createProduct } from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "" });

  // 🔥 Fetch products
  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      // Normalize backend field
      const formatted = (data || []).map((p) => ({
        ...p,
        name: p.name || p.product_name,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 Add product
  const addProduct = async () => {
    try {
      await createProduct(form);

      setForm({ name: "", category: "" });

      // refresh list
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      {/* FORM */}
      <div className="bg-white/10 p-4 rounded grid md:grid-cols-3 gap-3">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 bg-white/10 rounded"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 bg-white/10 rounded"
        />

        <button
          onClick={addProduct}
          className="bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <div
            key={p.product_id || p.id}
            className="bg-white/10 p-3 rounded"
          >
            {p.name} ({p.category})
          </div>
        ))
      )}
    </div>
  );
}