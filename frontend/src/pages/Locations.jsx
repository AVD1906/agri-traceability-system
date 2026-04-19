import React, { useEffect, useState } from "react";
import { getLocations, createLocation } from "../api";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ name: "", type: "Farm" });

  useEffect(() => {
    getLocations().then(setLocations).catch(()=>{
      setLocations([{ id:1, name:"Farm A", type:"Farm"}]);
    });
  }, []);

  const addLocation = () => {
    createLocation(form).then(()=>{
      setLocations([...locations, { id: Date.now(), ...form }]);
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Locations</h1>

      <div className="bg-white/10 p-4 rounded grid md:grid-cols-3 gap-3">
        <input placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="p-2 bg-white/10 rounded" />

        <select onChange={(e)=>setForm({...form,type:e.target.value})}
          className="p-2 bg-white/10 rounded">
          <option>Farm</option>
          <option>Warehouse</option>
          <option>Transport</option>
        </select>

        <button onClick={addLocation} className="bg-green-600 rounded">
          Add
        </button>
      </div>
    </div>
  );
}