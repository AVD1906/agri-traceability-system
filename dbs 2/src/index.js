import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./components/ui/Toast";
import { AppDataProvider } from "./context/AppDataContext";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <ToastProvider>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </ToastProvider>
  </UserProvider>
);
