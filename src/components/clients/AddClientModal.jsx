import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input, Select, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { UserPlus } from "lucide-react";

const SEGMENTS = ["Saúde", "Automotivo", "Alimentação", "Imobiliário", "Fitness", "Pet", "Educação", "Varejo", "Serviços", "Tecnologia"];
const GESTORES = ["Lucas M.", "Ana C."];

export function AddClientModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", segment: SEGMENTS[0], gestor: GESTORES[0], budget: "", targetRoas: "", targetCpl: "", notes: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Obrigatório";
    if (!form.segment.trim()) e.segment = "Obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onAdd({ ...form, id: Date.now(), status: "active", health: 50, spend: 0, leads: 0, cpl: 0, cpa: 0, roas: 0, ctr: 0, revenue: 0, campaigns: 0, startDate: new Date().toISOString().slice(0, 10) });
    setForm({ name: "", segment: SEGMENTS[0], gestor: GESTORES[0], budget: "", targetRoas: "", targetCpl: "", notes: "" });
    setErrors({});
    onClose();
  }

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title="Adicionar cliente" width={480}>
      <Input label="Nome do cliente *" value={form.name} onChange={set("name")} placeholder="Ex: Clínica Odonto Premium" />
      {errors.name && <div style={{ color: "#FF4757", fontSize: 11, marginTop: -10, marginBottom: 10 }}>{errors.name}</div>}

      <Select label="Segmento *" value={form.segment} onChange={set("segment")}>
        {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
      </Select>

      <Select label="Gestor responsável" value={form.gestor} onChange={set("gestor")}>
        {GESTORES.map(g => <option key={g} value={g}>{g}</option>)}
      </Select>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <Input label="Verba mensal (R$)" value={form.budget}     onChange={set("budget")}     placeholder="15000" type="number" />
        <Input label="Meta ROAS"          value={form.targetRoas} onChange={set("targetRoas")} placeholder="4.0"   type="number" />
        <Input label="Meta CPL (R$)"      value={form.targetCpl}  onChange={set("targetCpl")}  placeholder="70"    type="number" />
      </div>

      <Textarea label="Observações" value={form.notes} onChange={set("notes")} placeholder="Informações adicionais sobre o cliente..." />

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancelar</Button>
        <Button onClick={handleSubmit} style={{ flex: 1 }} icon={UserPlus}>Adicionar</Button>
      </div>
    </Modal>
  );
}
