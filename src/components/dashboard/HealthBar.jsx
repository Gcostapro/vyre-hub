import { motion } from "framer-motion";
import { HEALTH_COLOR, HEALTH_BG } from "../../lib/constants";

export function HealthBar({ value = 0, size = "md" }) {
  const color = HEALTH_COLOR(value);
  const bg    = HEALTH_BG(value);
  const heights = { sm: 4, md: 6, lg: 10 };
  const h = heights[size] || 6;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: h, background: bg, borderRadius: 99, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 99 }}
        />
      </div>
      <span style={{ fontSize: size === "lg" ? 14 : 11, fontWeight: 600, color, minWidth: 36, textAlign: "right", fontFamily: "JetBrains Mono, monospace" }}>
        {value}%
      </span>
    </div>
  );
}
