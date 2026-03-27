import { C } from "../../lib/constants";

const variants = {
  blue:    { bg: C.blueBg,    color: C.blueLight },
  green:   { bg: C.greenBg,   color: C.green },
  yellow:  { bg: C.yellowBg,  color: C.yellow },
  red:     { bg: C.redBg,     color: C.red },
  purple:  { bg: C.purpleBg,  color: C.purple },
  muted:   { bg: "rgba(255,255,255,0.06)", color: C.muted },
};

export function Badge({ children, variant = "blue", style }) {
  const v = variants[variant] || variants.blue;
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
      letterSpacing: 0.6, textTransform: "uppercase",
      background: v.bg, color: v.color, whiteSpace: "nowrap",
      ...style,
    }}>
      {children}
    </span>
  );
}
