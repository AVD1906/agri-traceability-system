import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Audit from "./pages/Audit";
import Batches from "./pages/Batches";
import Dashboard from "./pages/Dashboard";
import Locations from "./pages/Locations";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Notifications from "./pages/Notifications";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Reports from "./pages/Reports";

function AppShell({ children }) {
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AppShell>
                <Products />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches"
          element={
            <ProtectedRoute>
              <AppShell>
                <Batches />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <AppShell>
                <Logs />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/locations"
          element={
            <ProtectedRoute>
              <AppShell>
                <Locations />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <AppShell>
                <Notifications />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute roles={["Admin", "Processor"]}>
              <AppShell>
                <Reports />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/audit"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <AppShell>
                <Audit />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
