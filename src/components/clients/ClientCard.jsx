import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { C } from "../../lib/constants";
import { Badge } from "../ui/Badge";
import { HealthBar } from "../dashboard/HealthBar";

export function ClientCard({ client, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onClick={() => navigate(`/clients/${client.id}`)}
      whileHover={{ borderColor: C.blue }}
      style={{
        background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12,
        padding: 20, cursor: "pointer", transition: "border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 3 }}>{client.name}</div>
          <div style={{ fontSize: 11, color: C.dim }}>{client.segment} · {client.gestor}</div>
        </div>
        <Badge variant={client.status === "active" ? "green" : "muted"}>
          {client.status === "active" ? "Ativo" : "Pausado"}
        </Badge>
      </div>
      <HealthBar value={client.health} size="sm" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
        {[
          ["Invest.", `R$${(client.spend / 1000).toFixed(1)}k`],
          ["ROAS",    `${client.roas}x`],
          ["Leads",   client.leads],
        ].map(([l, v]) => (
          <div key={l} style={{ textAlign: "center", background: C.surface, borderRadius: 8, padding: "8px 4px" }}>
            <div style={{ fontSize: 9, color: C.dim, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 2 }}>{l}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: "JetBrains Mono, monospace" }}>{v}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
