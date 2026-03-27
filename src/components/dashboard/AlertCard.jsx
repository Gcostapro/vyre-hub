import { C } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/mockData";

const TYPE_CONFIG = {
  danger:  { icon: "!", color: C.red,    label: "Crítico" },
  warning: { icon: "⚡", color: C.yellow, label: "Atenção" },
  success: { icon: "✓", color: C.green,  label: "Sucesso" },
  info:    { icon: "i", color: C.blue,   label: "Info" },
};

export function AlertCard({ alert }) {
  const navigate = useNavigate();
  const cfg = TYPE_CONFIG[alert.type] || TYPE_CONFIG.info;
  const client = CLIENTS.find(c => c.id === alert.clientId);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: `0.5px solid ${C.borderSolid}` }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: `${cfg.color}18`, color: cfg.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700,
      }}>
        {cfg.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.4 }}>{alert.message}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 10, color: C.dim }}>{alert.time}</span>
          {client && (
            <span
              onClick={() => navigate(`/clients/${client.id}`)}
              style={{ fontSize: 10, color: C.blue, cursor: "pointer" }}
            >
              {client.name}
            </span>
          )}
          {!alert.read && (
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
          )}
        </div>
      </div>
    </div>
  );
}
