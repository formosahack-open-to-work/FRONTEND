import { Routes, Route } from "react-router-dom";
import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import Forum from "../modules/forum/Forum";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../modules/dashboard/Dashboard";
import LandingPage from "../modules/landing/Landing";
import Explorer from "../modules/Explorer/Explorer";
import Chat from "../modules/chat/Chat";
import Profile from "../modules/profile/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explorer" element={<Explorer/>} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/forum" element={<Forum />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<div className="p-6">404</div>} />
    </Routes>
  );
}
