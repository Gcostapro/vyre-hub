import { motion } from "framer-motion";
import { C } from "../../lib/constants";

export function TeamMemberCard({ member, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12, background: C.blueBgStrong,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 700, color: C.blueLight, flexShrink: 0,
        }}>{member.avatar}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{member.name}</div>
          <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{member.role}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[["Clientes", member.clients], ["Tarefas", member.tasks], ["Feitas/sem", member.completedThisWeek]].map(([l, v]) => (
          <div key={l} style={{ background: C.surface, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: C.dim, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "JetBrains Mono, monospace" }}>{v}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: 0.6 }}>Workload</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: member.workload >= 80 ? C.red : member.workload >= 60 ? C.yellow : C.green, fontFamily: "JetBrains Mono, monospace" }}>{member.workload}%</span>
        </div>
        <div style={{ height: 5, background: C.surface, borderRadius: 99, overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${member.workload}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            style={{
              height: "100%", borderRadius: 99,
              background: member.workload >= 80 ? C.red : member.workload >= 60 ? C.yellow : C.green,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
