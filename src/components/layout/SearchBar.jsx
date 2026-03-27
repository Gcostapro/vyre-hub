import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { C } from "../../lib/constants";
import { CLIENTS, TASKS } from "../../data/mockData";

export function SearchBar({ open, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); onClose(); }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query.length > 1 ? [
    ...CLIENTS.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).map(c => ({ type: "cliente", label: c.name, sub: c.segment, action: () => { navigate(`/clients/${c.id}`); onClose(); } })),
    ...TASKS.filter(t => t.title.toLowerCase().includes(query.toLowerCase())).map(t => ({ type: "tarefa", label: t.title, sub: t.assignee, action: () => { navigate("/kanban"); onClose(); } })),
  ] : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 120 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            onClick={e => e.stopPropagation()}
            style={{ background: C.surface, border: `0.5px solid ${C.borderSolid}`, borderRadius: 14, width: 560, maxWidth: "90vw", overflow: "hidden" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: `0.5px solid ${C.borderSolid}` }}>
              <Search size={16} color={C.muted} />
              <input
                autoFocus value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Buscar clientes, tarefas..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 15, fontFamily: "inherit" }}
              />
              {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: C.dim }}><X size={16} /></button>}
            </div>
            {results.length > 0 && (
              <div style={{ padding: "8px 0", maxHeight: 320, overflowY: "auto" }}>
                {results.map((r, i) => (
                  <div key={i} onClick={r.action} style={{ padding: "10px 18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 13, color: C.text }}>{r.label}</div>
                      <div style={{ fontSize: 11, color: C.dim }}>{r.sub}</div>
                    </div>
                    <span style={{ fontSize: 10, color: C.muted, background: C.card, padding: "2px 7px", borderRadius: 4, textTransform: "uppercase" }}>{r.type}</span>
                  </div>
                ))}
              </div>
            )}
            {query.length > 1 && results.length === 0 && (
              <div style={{ padding: 20, textAlign: "center", color: C.dim, fontSize: 13 }}>Nenhum resultado encontrado</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
