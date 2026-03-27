import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Kanban, UsersRound, BellRing, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { C } from "../../lib/constants";
import { ALERTS } from "../../data/mockData";

const NAV = [
  { to: "/",        label: "Dashboard", icon: LayoutDashboard },
  { to: "/clients", label: "Clientes",  icon: Users },
  { to: "/kanban",  label: "Kanban",    icon: Kanban },
  { to: "/team",    label: "Equipe",    icon: UsersRound },
  { to: "/alerts",  label: "Alertas",   icon: BellRing, badge: ALERTS.filter(a => !a.read).length },
];

function NavItem({ item, collapsed }) {
  const location = useLocation();
  const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
  const Icon = item.icon;

  return (
    <NavLink to={item.to} style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: collapsed ? "10px" : "10px 14px", borderRadius: 8, cursor: "pointer",
        background: active ? C.blueBg : "transparent",
        color: active ? C.blueLight : C.muted,
        fontSize: 13, fontWeight: active ? 600 : 400,
        transition: "all 0.15s", position: "relative",
        justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <Icon size={17} strokeWidth={active ? 2.5 : 2} />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {item.badge > 0 && (
          <span style={{
            marginLeft: collapsed ? 0 : "auto",
            position: collapsed ? "absolute" : "static",
            top: collapsed ? 6 : "auto", right: collapsed ? 6 : "auto",
            fontSize: 9, fontWeight: 700, background: C.red, color: "#fff",
            padding: "1px 5px", borderRadius: 10, minWidth: 16, textAlign: "center",
          }}>{item.badge}</span>
        )}
      </div>
    </NavLink>
  );
}

export function Sidebar({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      style={{
        background: C.card, borderRight: `0.5px solid ${C.borderSolid}`,
        display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden",
        height: "100vh", position: "sticky", top: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 12px" : "20px 16px", borderBottom: `0.5px solid ${C.borderSolid}` }}>
        {collapsed ? (
          <div style={{ width: 36, height: 36, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/logo.png" alt="Vyre" style={{ width: 32, height: 32, objectFit: "contain" }} />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="Vyre" style={{ width: 34, height: 34, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>VYRE</div>
              <div style={{ fontSize: 9, color: C.dim, letterSpacing: 2, textTransform: "uppercase" }}>Operations Hub</div>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ padding: "12px 8px", flex: 1 }}>
        {!collapsed && (
          <div style={{ fontSize: 9, color: C.dim, textTransform: "uppercase", letterSpacing: 1.6, padding: "6px 14px 6px", marginBottom: 2, fontWeight: 600 }}>
            Principal
          </div>
        )}
        {NAV.slice(0, 4).map(item => <NavItem key={item.to} item={item} collapsed={collapsed} />)}

        {!collapsed && (
          <div style={{ fontSize: 9, color: C.dim, textTransform: "uppercase", letterSpacing: 1.6, padding: "16px 14px 6px", fontWeight: 600 }}>
            Sistema
          </div>
        )}
        {collapsed && <div style={{ height: 12 }} />}
        <NavItem item={NAV[4]} collapsed={collapsed} />
      </div>

      {/* User + actions */}
      <div style={{ padding: "12px 8px", borderTop: `0.5px solid ${C.borderSolid}` }}>
        {/* User info */}
        {!collapsed && user && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px", marginBottom: 4, borderRadius: 8,
            background: C.surface,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, flexShrink: 0,
              background: C.blueBg, border: `1px solid ${C.blue}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: C.blueLight,
            }}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.name}
              </div>
              <div style={{ fontSize: 10, color: C.dim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.email}
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        {onLogout && (
          <div
            onClick={onLogout}
            style={{
              display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
              gap: 8, padding: "8px 14px", borderRadius: 6, cursor: "pointer",
              color: C.dim, fontSize: 12, transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = C.red}
            onMouseLeave={e => e.currentTarget.style.color = C.dim}
          >
            <LogOut size={15} />
            {!collapsed && <span>Sair</span>}
          </div>
        )}

        {/* Collapse button */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
            gap: 8, padding: "8px 14px", borderRadius: 6, cursor: "pointer",
            color: C.dim, fontSize: 12, transition: "color 0.2s",
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Recolher</span></>}
        </div>
      </div>
    </motion.div>
  );
}
