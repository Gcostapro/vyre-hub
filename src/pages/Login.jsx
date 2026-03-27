import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { C } from "../lib/constants";

const USERS = [
  { email: "admin@vyre.com",   password: "vyre2024", name: "Admin" },
  { email: "gabriel@vyre.com", password: "vyre2024", name: "Gabriel" },
];

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const user = USERS.find(u => u.email === email.trim().toLowerCase() && u.password === password);
    if (user) {
      localStorage.setItem("vyre_user", JSON.stringify({ email: user.email, name: user.name }));
      onLogin(user);
    } else {
      setError("E-mail ou senha incorretos.");
    }
    setLoading(false);
  }

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 8, fontSize: 14,
    background: C.card, border: `1px solid ${C.borderSolid}`,
    color: C.text, outline: "none", boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{
      minHeight: "100vh", background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${C.borderSolid} 1px, transparent 1px), linear-gradient(90deg, ${C.borderSolid} 1px, transparent 1px)`,
        backgroundSize: "40px 40px", opacity: 0.3,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: "100%", maxWidth: 400, position: "relative",
          background: C.surface, border: `1px solid ${C.borderSolid}`,
          borderRadius: 16, padding: "40px 36px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Logo / brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 22, fontWeight: 800, color: "#fff",
            boxShadow: `0 8px 24px ${C.blue}40`,
          }}>V</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 4 }}>
            Vyre Operations Hub
          </div>
          <div style={{ fontSize: 13, color: C.muted }}>Faça login para continuar</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 500, display: "block", marginBottom: 6 }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@vyre.com"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = C.blue}
              onBlur={e => e.target.style.borderColor = C.borderSolid}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 500, display: "block", marginBottom: 6 }}>
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ ...inputStyle, paddingRight: 42 }}
                onFocus={e => e.target.style.borderColor = C.blue}
                onBlur={e => e.target.style.borderColor = C.borderSolid}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: C.dim, display: "flex", alignItems: "center",
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "10px 14px", borderRadius: 8,
                background: "rgba(255,71,87,0.1)", border: `1px solid rgba(255,71,87,0.3)`,
                fontSize: 13, color: C.red,
              }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: 6, padding: "12px", borderRadius: 8, border: "none",
              background: loading ? C.blueDark : `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
              color: "#fff", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: loading ? "none" : `0 4px 16px ${C.blue}50`,
              transition: "all 0.15s",
            }}
          >
            {loading ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ animation: "spin 0.8s linear infinite" }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            ) : (
              <LogIn size={16} />
            )}
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>
        </form>

        <div style={{ marginTop: 24, padding: "14px", borderRadius: 8, background: C.card, border: `1px solid ${C.borderSolid}` }}>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Credenciais de acesso
          </div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
            admin@vyre.com <span style={{ color: C.dim }}>·</span> vyre2024
          </div>
        </div>
      </motion.div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
