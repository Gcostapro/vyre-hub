import { C } from "../../lib/constants";

export function Button({ children, variant = "primary", size = "md", onClick, disabled, style, icon: Icon }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", borderRadius: 8, transition: "opacity 0.2s",
    opacity: disabled ? 0.5 : 1, fontFamily: "inherit",
  };
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 12 },
    md: { padding: "9px 18px", fontSize: 13 },
    lg: { padding: "12px 24px", fontSize: 14 },
  };
  const variants = {
    primary: { background: C.blue, color: "#fff" },
    ghost:   { background: "transparent", color: C.muted, border: `0.5px solid ${C.borderSolid}` },
    danger:  { background: C.redBg, color: C.red },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}
