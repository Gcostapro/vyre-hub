import { useState } from "react";
import { Plus } from "lucide-react";
import { TEAM as INITIAL } from "../data/mockData";
import { Header } from "../components/layout/Header";
import { TeamMemberCard } from "../components/team/TeamMemberCard";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input, Select } from "../components/ui/Input";
import { C } from "../lib/constants";

const ROLES = ["Gestor de Tráfego", "Gestora de Tráfego", "Editor de Vídeo", "Analista", "Diretor"];

export default function Team() {
  const [team, setTeam]   = useState(INITIAL);
  const [modal, setModal] = useState(false);
  const [form, setForm]   = useState({ name: "", role: ROLES[0] });

  function handleAdd() {
    if (!form.name.trim()) return;
    const initials = form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    setTeam(p => [...p, { id: Date.now(), name: form.name, role: form.role, avatar: initials, clients: 0, tasks: 0, completedThisWeek: 0, workload: 0 }]);
    setForm({ name: "", role: ROLES[0] });
    setModal(false);
  }

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <Header
        title="Equipe"
        subtitle="Visão de workload e performance por membro"
        actions={<Button icon={Plus} onClick={() => setModal(true)}>Novo membro</Button>}
      />

      <Modal open={modal} onClose={() => setModal(false)} title="Adicionar membro" width={400}>
        <Input label="Nome completo *" value={form.name} onChange={set("name")} placeholder="Ex: João S." />
        <Select label="Cargo" value={form.role} onChange={set("role")}>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </Select>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <Button variant="ghost" onClick={() => setModal(false)} style={{ flex: 1 }}>Cancelar</Button>
          <Button onClick={handleAdd} style={{ flex: 1 }}>Adicionar</Button>
        </div>
      </Modal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {team.map((m, i) => <TeamMemberCard key={m.id} member={m} index={i} />)}
      </div>
    </div>
  );
}
