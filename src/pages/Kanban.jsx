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

export default function Kanban() {
  const [tasks, setTasks]       = useState(INITIAL);
  const [modal, setModal]       = useState(false);
  const [activeTask, setActive] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const tasksByCol = (key) => tasks.filter(t => t.column === key);

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
      const col  = tasks.filter(t => t.column === activeTask.column);
      const from = col.findIndex(t => t.id === active.id);
      const to   = col.findIndex(t => t.id === over.id);
      const reordered = arrayMove(col, from, to);
      setTasks(prev => [...prev.filter(t => t.column !== activeTask.column), ...reordered]);
    }
  }

  return (
    <div>
      <Header
        title="Kanban"
        subtitle="Gestão de tarefas — gestores de tráfego e editores de vídeo"
        actions={<Button icon={Plus} onClick={() => setModal(true)}>Nova tarefa</Button>}
      />
      <AddTaskModal open={modal} onClose={() => setModal(false)} onAdd={t => setTasks(p => [...p, t])} />

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
