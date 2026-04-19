import React, { useEffect, useState } from "react";
import { getLogs } from "../api";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(()=>{
    getLogs().then(setLogs).catch(()=>{
      setLogs([{ action:"Batch Created", product:"Tomato"}]);
    });
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Logs</h1>

      {logs.map((l,i)=>(
        <div key={i} className="bg-white/10 p-3 rounded mt-3">
          {l.action} - {l.product}
        </div>
      ))}
    </div>
  );
}