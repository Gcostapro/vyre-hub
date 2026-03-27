import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { C } from "../../lib/constants";

function AnimatedNumber({ value }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, v => Math.round(v));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}

export function MetricCard({ label, value, change, prefix = "", suffix = "", mono = false, delay = 0 }) {
  const isPositive = change > 0;
  const changeColor = isPositive ? C.green : C.red;
  const numericValue = typeof value === "number" ? value : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12,
        padding: "18px 20px", flex: 1,
      }}
    >
      <div style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 8, fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: C.text, lineHeight: 1.1, fontFamily: mono ? "JetBrains Mono, monospace" : "inherit" }}>
        {prefix}
        {numericValue !== null ? <AnimatedNumber value={numericValue} /> : value}
        {suffix}
      </div>
      {change !== undefined && (
        <div style={{ fontSize: 11, color: changeColor, marginTop: 6, display: "flex", alignItems: "center", gap: 3, fontWeight: 500 }}>
          {isPositive ? "▲" : "▼"} {Math.abs(change)}% vs sem. anterior
        </div>
      )}
    </motion.div>
  );
}
