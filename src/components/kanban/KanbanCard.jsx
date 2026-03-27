import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { C } from "../../lib/constants";
import { Badge } from "../ui/Badge";
import { CLIENTS } from "../../data/mockData";

const PRIO_COLOR = { high: C.red, medium: C.yellow, low: C.dim };
const PRIO_LABEL = { high: "Alta", medium: "Média", low: "Baixa" };
const TYPE_VARIANT = { gestor: "blue", editor: "purple" };

function isOverdue(dateStr) {
  return new Date(dateStr) < new Date(new Date().toDateString());
}

export function KanbanCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const client  = task.clientId ? CLIENTS.find(c => c.id === task.clientId) : null;
  const overdue = task.column !== "done" && isOverdue(task.dueDate);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <motion.div
        layout
        whileDrag={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
        style={{
          background: C.card,
          border: `0.5px solid ${overdue ? "rgba(255,71,87,0.4)" : C.borderSolid}`,
          borderRadius: 10, padding: "12px 14px", cursor: "default", userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
          <div {...attributes} {...listeners} style={{ cursor: "grab", color: C.dim, paddingTop: 2, flexShrink: 0 }}>
            <GripVertical size={14} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 6, lineHeight: 1.4 }}>
              {task.title}
            </div>

            {client && (
              <div style={{
                fontSize: 10, color: C.muted, background: C.surface, border: `0.5px solid ${C.borderSolid}`,
                borderRadius: 4, padding: "2px 6px", marginBottom: 8,
                display: "inline-block", maxWidth: "100%", overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {client.name}
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Badge variant={TYPE_VARIANT[task.type] || "blue"}>{task.type}</Badge>
                <span
                  style={{ width: 6, height: 6, borderRadius: "50%", background: PRIO_COLOR[task.priority], flexShrink: 0 }}
                  title={PRIO_LABEL[task.priority]}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: overdue ? C.red : C.dim, fontWeight: overdue ? 600 : 400 }}>
                  {overdue ? "⚠ " : ""}{task.dueDate.slice(5).replace("-", "/")}
                </span>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, background: C.blueBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: C.blueLight,
                }} title={task.assignee}>
                  {task.assignee.split(" ").map(n => n[0]).join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
