import { useState } from "react";
import { motion } from "framer-motion";
import { ALERTS as INITIAL, CLIENTS } from "../data/mockData";
import { Header } from "../components/layout/Header";
import { C } from "../lib/constants";
import { useNavigate } from "react-router-dom";

const TYPE_CONFIG = {
  danger:  { icon: "!", color: C.red,    label: "Crítico",  variant: "danger"  },
  warning: { icon: "⚡", color: C.yellow, label: "Atenção",  variant: "warning" },
  success: { icon: "✓", color: C.green,  label: "Sucesso",  variant: "success" },
  info:    { icon: "i", color: C.blue,   label: "Info",     variant: "info"    },
};

const FILTERS = [["all", "Todos"], ["danger", "Críticos"], ["warning", "Atenção"], ["success", "Sucesso"], ["info", "Info"]];

export default function Alerts() {
  const [alerts, setAlerts] = useState(INITIAL);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = filter === "all" ? alerts : alerts.filter(a => a.type === filter);
  const unreadCount = alerts.filter(a => !a.read).length;

  function markRead(id) {
    setAlerts(p => p.map(a => a.id === id ? { ...a, read: true } : a));
  }

  return (
    <div>
      <Header title="Alertas" subtitle={`${unreadCount} não lidos`} />

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {FILTERS.map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: filter === key ? 600 : 400,
            border: `0.5px solid ${filter === key ? C.blue : C.borderSolid}`,
            background: filter === key ? C.blueBg : "transparent",
            color: filter === key ? C.blueLight : C.muted,
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((alert, i) => {
          const cfg = TYPE_CONFIG[alert.type];
          const client = CLIENTS.find(c => c.id === alert.clientId);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => markRead(alert.id)}
              style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                background: alert.read ? C.card : `${cfg.color}08`,
                border: `0.5px solid ${alert.read ? C.borderSolid : cfg.color + "40"}`,
                borderRadius: 12, padding: "16px 18px", cursor: "pointer",
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: `${cfg.color}18`, color: cfg.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700,
              }}>{cfg.icon}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: cfg.color, textTransform: "uppercase", letterSpacing: 0.6 }}>{cfg.label}</span>
                  {!alert.read && <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />}
                </div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{alert.message}</div>
                <div style={{ display: "flex", align: "center", gap: 10, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: C.dim }}>{alert.time}</span>
                  {client && (
                    <span
                      onClick={e => { e.stopPropagation(); navigate(`/clients/${client.id}`); }}
                      style={{ fontSize: 11, color: C.blue, cursor: "pointer", textDecoration: "underline" }}
                    >{client.name}</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", color: C.dim, padding: 60, fontSize: 14 }}>
          Nenhum alerta nesta categoria.
        </div>
      )}
    </div>
  );
}
