import { useState } from "react";
import { Search } from "lucide-react";
import { C } from "../../lib/constants";
import { SearchBar } from "./SearchBar";

export function Header({ title, subtitle, actions }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, letterSpacing: -0.3 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 13, color: C.dim, margin: "4px 0 0" }}>{subtitle}</p>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
              background: C.surface, border: `0.5px solid ${C.borderSolid}`, borderRadius: 8,
              color: C.muted, fontSize: 12, cursor: "pointer",
            }}
          >
            <Search size={14} />
            <span>Buscar</span>
            <span style={{ fontSize: 10, color: C.dim, background: C.card, padding: "1px 5px", borderRadius: 4 }}>⌘K</span>
          </button>
          {actions}
        </div>
      </div>
    </>
  );
}
