import { useState } from "react";
import { Plus } from "lucide-react";
import { CLIENTS as INITIAL } from "../data/mockData";
import { Header } from "../components/layout/Header";
import { ClientCard } from "../components/clients/ClientCard";
import { AddClientModal } from "../components/clients/AddClientModal";
import { Button } from "../components/ui/Button";
import { C } from "../lib/constants";

const FILTERS = [["all", "Todos"], ["healthy", "Saudável"], ["warning", "Atenção"], ["critical", "Crítico"]];

export default function Clients() {
  const [clients, setClients] = useState(INITIAL);
  const [filter, setFilter]   = useState("all");
  const [modal, setModal]     = useState(false);

  const filtered = filter === "all" ? clients
    : filter === "healthy"  ? clients.filter(c => c.health >= 70)
    : filter === "warning"  ? clients.filter(c => c.health >= 40 && c.health < 70)
    : clients.filter(c => c.health < 40);

  return (
    <div>
      <Header
        title="Clientes"
        subtitle={`${clients.length} clientes na carteira`}
        actions={<Button icon={Plus} onClick={() => setModal(true)}>Novo cliente</Button>}
      />

      <AddClientModal open={modal} onClose={() => setModal(false)} onAdd={c => setClients(p => [...p, c])} />

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {FILTERS.map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: filter === key ? 600 : 400,
            border: `0.5px solid ${filter === key ? C.blue : C.borderSolid}`,
            background: filter === key ? C.blueBg : "transparent",
            color: filter === key ? C.blueLight : C.muted,
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {filtered.map((c, i) => <ClientCard key={c.id} client={c} index={i} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", color: C.dim, padding: 60, fontSize: 14 }}>
          Nenhum cliente nesta categoria.
        </div>
      )}
    </div>
  );
}
