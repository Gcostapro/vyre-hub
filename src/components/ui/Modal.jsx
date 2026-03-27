import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { C } from "../../lib/constants";

export function Modal({ open, onClose, title, children, width = 480 }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 200, backdropFilter: "blur(6px)", padding: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: C.surface, border: `0.5px solid ${C.borderSolid}`,
              borderRadius: 16, padding: 28, width: "100%", maxWidth: width,
              maxHeight: "90vh", overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <h3 style={{ color: C.text, fontSize: 17, fontWeight: 600 }}>{title}</h3>
              <button onClick={onClose} style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: C.muted, padding: 4, borderRadius: 6, display: "flex",
              }}>
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
