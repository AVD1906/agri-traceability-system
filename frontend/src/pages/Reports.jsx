import React, { useEffect, useState } from "react";
import { getReports } from "../api";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    getReports().then(setData).catch(()=>{
      setData([{ total:10 }]);
    });
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      {data.map((r,i)=>(
        <div key={i} className="bg-white/10 p-3 rounded mt-3">
          Total: {r.total}
        </div>
      ))}
    </div>
  );
}