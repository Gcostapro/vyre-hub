import { useState, useMemo } from "react";
import { Plus, Search, ArrowUpDown } from "lucide-react";
import { CLIENTS as INITIAL } from "../data/mockData";
import { Header } from "../components/layout/Header";
import { ClientCard } from "../components/clients/ClientCard";
import { AddClientModal } from "../components/clients/AddClientModal";
import { Button } from "../components/ui/Button";
import { C } from "../lib/constants";

const HEALTH_FILTERS = [["all", "Todos"], ["healthy", "Saudável ≥70"], ["warning", "Atenção 40-69"], ["critical", "Crítico <40"]];
const SORT_OPTIONS   = [["health", "Saúde"], ["spend", "Investimento"], ["roas", "ROAS"], ["leads", "Leads"], ["name", "Nome"]];

export default function Clients() {
  const [clients, setClients]   = useState(INITIAL);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [sortBy, setSortBy]     = useState("health");
  const [sortDir, setSortDir]   = useState("desc");
  const [modal, setModal]       = useState(false);

  function toggleSort(key) {
    if (sortBy === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortBy(key); setSortDir("desc"); }
  }

  const filtered = useMemo(() => {
    let list = clients;

    // health filter
    if (filter === "healthy")  list = list.filter(c => c.health >= 70);
    else if (filter === "warning")  list = list.filter(c => c.health >= 40 && c.health < 70);
    else if (filter === "critical") list = list.filter(c => c.health < 40);

    // search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.segment.toLowerCase().includes(q) ||
        c.gestor.toLowerCase().includes(q)
      );
    }

    // sort
    list = [...list].sort((a, b) => {
      const av = sortBy === "name" ? a.name : a[sortBy];
      const bv = sortBy === "name" ? b.name : b[sortBy];
      if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === "asc" ? av - bv : bv - av;
    });

    return list;
  }, [clients, filter, search, sortBy, sortDir]);

  return (
    <div>
      <Header
        title="Clientes"
        subtitle={`${filtered.length} de ${clients.length} clientes`}
        actions={<Button icon={Plus} onClick={() => setModal(true)}>Novo cliente</Button>}
      />

      <AddClientModal open={modal} onClose={() => setModal(false)} onAdd={c => setClients(p => [...p, c])} />

      {/* Search + filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 280 }}>
          <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.dim, pointerEvents: "none" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar cliente, segmento, gestor..."
            style={{
              width: "100%", padding: "7px 12px 7px 30px", borderRadius: 6, fontSize: 12,
              background: C.card, border: `0.5px solid ${C.borderSolid}`,
              color: C.text, outline: "none", boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = C.blue}
            onBlur={e => e.target.style.borderColor = C.borderSolid}
          />
        </div>

        <div style={{ width: 1, height: 20, background: C.borderSolid, flexShrink: 0 }} />

        {/* Health filters */}
        {HEALTH_FILTERS.map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: "6px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontWeight: filter === key ? 600 : 400,
            border: `0.5px solid ${filter === key ? C.blue : C.borderSolid}`,
            background: filter === key ? C.blueBg : "transparent",
            color: filter === key ? C.blueLight : C.muted,
          }}>{label}</button>
        ))}

        <div style={{ width: 1, height: 20, background: C.borderSolid, flexShrink: 0 }} />

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ArrowUpDown size={12} style={{ color: C.dim }} />
          {SORT_OPTIONS.map(([key, label]) => (
            <button key={key} onClick={() => toggleSort(key)} style={{
              padding: "6px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer",
              fontWeight: sortBy === key ? 600 : 400,
              border: `0.5px solid ${sortBy === key ? C.blue : C.borderSolid}`,
              background: sortBy === key ? C.blueBg : "transparent",
              color: sortBy === key ? C.blueLight : C.muted,
            }}>
              {label}{sortBy === key ? (sortDir === "desc" ? " ↓" : " ↑") : ""}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {filtered.map((c, i) => <ClientCard key={c.id} client={c} index={i} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", color: C.dim, padding: 60, fontSize: 14 }}>
          {search ? `Nenhum cliente encontrado para "${search}".` : "Nenhum cliente nesta categoria."}
        </div>
      )}
    </div>
  );
}
