import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./components/layout/Sidebar";
import Dashboard    from "./pages/Dashboard";
import Clients      from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Kanban       from "./pages/Kanban";
import Team         from "./pages/Team";
import Alerts       from "./pages/Alerts";
import Login        from "./pages/Login";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        style={{ flex: 1, overflow: "auto", padding: "28px 32px", minHeight: "100vh" }}
      >
        <Routes location={location}>
          <Route path="/"            element={<Dashboard />} />
          <Route path="/clients"     element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/kanban"      element={<Kanban />} />
          <Route path="/team"        element={<Team />} />
          <Route path="/alerts"      element={<Alerts />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("vyre_user")); } catch { return null; }
}

export default function App() {
  const [user, setUser] = useState(getStoredUser);

  function handleLogin(u) { setUser(u); }

  function handleLogout() {
    localStorage.removeItem("vyre_user");
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#0A0A0F" }}>
        <Sidebar user={user} onLogout={handleLogout} />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
