import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import Forum from "../modules/forum/Forum";
import ProtectedRoute from "../modules/auth/ProtectedRoute";
import Dashboard from "../modules/dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<div className="p-6">Home privada</div>} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/forum" element={<Forum />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<div className="p-6">404</div>} />
    </Routes>
  );
}
