import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input, Select, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { CLIENTS } from "../../data/mockData";
import { Plus } from "lucide-react";

const ASSIGNEES = ["Lucas M.", "Ana C.", "Pedro V."];
const TYPES     = [["gestor", "Gestor"], ["editor", "Editor"]];
const PRIOS     = [["high", "Alta"], ["medium", "Média"], ["low", "Baixa"]];
const COLUMNS   = [["backlog", "Backlog"], ["doing", "Em andamento"], ["review", "Em revisão"], ["done", "Concluído"]];

export function AddTaskModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", assignee: ASSIGNEES[0], clientId: "", type: "gestor", priority: "medium", dueDate: "", column: "backlog" });

  function handleSubmit() {
    if (!form.title.trim() || !form.dueDate) return;
    onAdd({ ...form, id: Date.now(), clientId: form.clientId ? Number(form.clientId) : null });
    setForm({ title: "", description: "", assignee: ASSIGNEES[0], clientId: "", type: "gestor", priority: "medium", dueDate: "", column: "backlog" });
    onClose();
  }

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title="Nova tarefa" width={460}>
      <Input label="Título *" value={form.title} onChange={set("title")} placeholder="Ex: Criar criativos carrossel" />
      <Textarea label="Descrição" value={form.description} onChange={set("description")} placeholder="Detalhes da tarefa..." rows={2} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Select label="Responsável" value={form.assignee} onChange={set("assignee")}>
          {ASSIGNEES.map(a => <option key={a} value={a}>{a}</option>)}
        </Select>
        <Select label="Cliente vinculado" value={form.clientId} onChange={set("clientId")}>
          <option value="">Nenhum</option>
          {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <Select label="Tipo" value={form.type} onChange={set("type")}>
          {TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </Select>
        <Select label="Prioridade" value={form.priority} onChange={set("priority")}>
          {PRIOS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </Select>
        <Select label="Coluna" value={form.column} onChange={set("column")}>
          {COLUMNS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </Select>
      </div>

      <Input label="Data de entrega *" value={form.dueDate} onChange={set("dueDate")} type="date" />

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancelar</Button>
        <Button onClick={handleSubmit} style={{ flex: 1 }} icon={Plus}>Criar tarefa</Button>
      </div>
    </Modal>
  );
}
