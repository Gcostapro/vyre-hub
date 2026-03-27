import { useState } from "react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { TASKS as INITIAL } from "../data/mockData";
import { C } from "../lib/constants";
import { Header } from "../components/layout/Header";
import { KanbanColumn } from "../components/kanban/KanbanColumn";
import { KanbanCard } from "../components/kanban/KanbanCard";
import { AddTaskModal } from "../components/kanban/AddTaskModal";
import { Button } from "../components/ui/Button";

const COLUMNS = [
  { key: "backlog", label: "Backlog",        color: C.dim    },
  { key: "doing",   label: "Em andamento",   color: C.blue   },
  { key: "review",  label: "Em revisão",     color: C.yellow },
  { key: "done",    label: "Concluído",      color: C.green  },
];

const ASSIGNEES = ["Todos", "Lucas M.", "Ana C.", "Pedro V."];
const PRIORITIES = [["all", "Todas"], ["high", "Alta"], ["medium", "Média"], ["low", "Baixa"]];
const TYPES = [["all", "Tipo"], ["gestor", "Gestor"], ["editor", "Editor"]];

const chipStyle = (active) => ({
  padding: "5px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontWeight: active ? 600 : 400,
  border: `0.5px solid ${active ? C.blue : C.borderSolid}`,
  background: active ? C.blueBg : "transparent",
  color: active ? C.blueLight : C.muted,
});

export default function Kanban() {
  const [tasks, setTasks]           = useState(INITIAL);
  const [modal, setModal]           = useState(false);
  const [activeTask, setActive]     = useState(null);
  const [filterAssignee, setAssignee] = useState("Todos");
  const [filterPriority, setPriority] = useState("all");
  const [filterType, setType]         = useState("all");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const tasksByCol = (key) => tasks
    .filter(t => t.column === key)
    .filter(t => filterAssignee === "Todos" || t.assignee === filterAssignee)
    .filter(t => filterPriority === "all"   || t.priority === filterPriority)
    .filter(t => filterType === "all"       || t.type     === filterType);

  const totalFiltered = COLUMNS.reduce((acc, col) => acc + tasksByCol(col.key).length, 0);

  function onDragStart({ active }) {
    setActive(tasks.find(t => t.id === active.id));
  }

  function onDragOver({ active, over }) {
    if (!over) return;
    const activeCol = tasks.find(t => t.id === active.id)?.column;
    const overCol   = COLUMNS.find(c => c.key === over.id)?.key || tasks.find(t => t.id === over.id)?.column;
    if (!overCol || activeCol === overCol) return;
    setTasks(prev => prev.map(t => t.id === active.id ? { ...t, column: overCol } : t));
  }

  function onDragEnd({ active, over }) {
    setActive(null);
    if (!over) return;
    const activeTask = tasks.find(t => t.id === active.id);
    const overTask   = tasks.find(t => t.id === over.id);
    if (overTask && activeTask.column === overTask.column) {
      const col      = tasks.filter(t => t.column === activeTask.column);
      const from     = col.findIndex(t => t.id === active.id);
      const to       = col.findIndex(t => t.id === over.id);
      const reordered = arrayMove(col, from, to);
      setTasks(prev => [...prev.filter(t => t.column !== activeTask.column), ...reordered]);
    }
  }

  const hasFilters = filterAssignee !== "Todos" || filterPriority !== "all" || filterType !== "all";

  return (
    <div>
      <Header
        title="Kanban"
        subtitle={`${totalFiltered} tarefa${totalFiltered !== 1 ? "s" : ""} visíveis`}
        actions={<Button icon={Plus} onClick={() => setModal(true)}>Nova tarefa</Button>}
      />
      <AddTaskModal open={modal} onClose={() => setModal(false)} onAdd={t => setTasks(p => [...p, t])} />

      {/* Filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        {/* Assignee */}
        <div style={{ display: "flex", gap: 6 }}>
          {ASSIGNEES.map(a => (
            <button key={a} onClick={() => setAssignee(a)} style={chipStyle(filterAssignee === a)}>{a}</button>
          ))}
        </div>

        <div style={{ width: 1, height: 20, background: C.borderSolid }} />

        {/* Priority */}
        <div style={{ display: "flex", gap: 6 }}>
          {PRIORITIES.map(([k, l]) => (
            <button key={k} onClick={() => setPriority(k)} style={chipStyle(filterPriority === k)}>{l}</button>
          ))}
        </div>

        <div style={{ width: 1, height: 20, background: C.borderSolid }} />

        {/* Type */}
        <div style={{ display: "flex", gap: 6 }}>
          {TYPES.map(([k, l]) => (
            <button key={k} onClick={() => setType(k)} style={chipStyle(filterType === k)}>{l}</button>
          ))}
        </div>

        {hasFilters && (
          <button
            onClick={() => { setAssignee("Todos"); setPriority("all"); setType("all"); }}
            style={{ ...chipStyle(false), color: C.red, borderColor: "rgba(255,71,87,0.3)" }}
          >
            Limpar filtros ×
          </button>
        )}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {COLUMNS.map(col => (
            <KanbanColumn key={col.key} column={col} tasks={tasksByCol(col.key)} />
          ))}
        </div>
        <DragOverlay>
          {activeTask && <KanbanCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
