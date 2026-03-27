import { C } from "../../lib/constants";

export function Input({ label, value, onChange, placeholder, type = "text", style }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 6, fontWeight: 600 }}>
          {label}
        </label>
      )}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 14px",
          background: C.card, border: `0.5px solid ${C.borderSolid}`,
          borderRadius: 8, color: C.text, fontSize: 13, outline: "none",
          boxSizing: "border-box", transition: "border-color 0.2s",
          ...style,
        }}
        onFocus={e => e.target.style.borderColor = C.blue}
        onBlur={e => e.target.style.borderColor = C.borderSolid}
      />
    </div>
  );
}

export function Select({ label, value, onChange, children, style }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 6, fontWeight: 600 }}>
          {label}
        </label>
      )}
      <select
        value={value} onChange={onChange}
        style={{
          width: "100%", padding: "10px 14px",
          background: C.card, border: `0.5px solid ${C.borderSolid}`,
          borderRadius: 8, color: C.text, fontSize: 13, outline: "none",
          boxSizing: "border-box", cursor: "pointer",
          ...style,
        }}
      >
        {children}
      </select>
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 3, style }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 6, fontWeight: 600 }}>
          {label}
        </label>
      )}
      <textarea
        value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        style={{
          width: "100%", padding: "10px 14px",
          background: C.card, border: `0.5px solid ${C.borderSolid}`,
          borderRadius: 8, color: C.text, fontSize: 13, outline: "none",
          boxSizing: "border-box", resize: "vertical", fontFamily: "inherit",
          ...style,
        }}
      />
    </div>
  );
}
