import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { C } from "../../lib/constants";
import { KanbanCard } from "./KanbanCard";

export function KanbanColumn({ column, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.key });

  return (
    <div style={{
      background: isOver ? "rgba(46,111,242,0.04)" : C.surface,
      borderRadius: 12, padding: 14,
      border: `0.5px solid ${isOver ? C.blue : C.borderSolid}`,
      transition: "all 0.15s", minHeight: 200,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: column.color, flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{column.label}</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, color: C.dim, background: C.card, padding: "2px 8px", borderRadius: 4 }}>
          {tasks.length}
        </span>
      </div>
      <div ref={setNodeRef}>
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tasks.map(task => <KanbanCard key={task.id} task={task} />)}
          </div>
        </SortableContext>
        {tasks.length === 0 && (
          <div style={{ textAlign: "center", color: C.dim, fontSize: 12, padding: "20px 0", border: `1px dashed ${C.borderSolid}`, borderRadius: 8 }}>
            Solte aqui
          </div>
        )}
      </div>
    </div>
  );
}
