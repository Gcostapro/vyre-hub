import { C } from "../../lib/constants";
import { Badge } from "../ui/Badge";
import { HealthBar } from "../dashboard/HealthBar";

const PLATFORM_VARIANT = { META: "purple", GOOGLE: "blue" };

function getPlatform(name) {
  if (name.includes("[META]"))   return "META";
  if (name.includes("[GOOGLE]")) return "GOOGLE";
  return null;
}

export function CampaignCard({ campaign }) {
  const platform = getPlatform(campaign.name);

  return (
    <div style={{
      background: C.surface, borderRadius: 10, padding: "16px 18px",
      border: `0.5px solid ${C.borderSolid}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        {platform && <Badge variant={PLATFORM_VARIANT[platform]}>{platform}</Badge>}
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
          {campaign.name.replace(/^\[.*?\]\s*/, "")}
        </span>
        <Badge variant={campaign.status === "active" ? "green" : "muted"} style={{ marginLeft: "auto" }}>
          {campaign.status === "active" ? "Ativa" : "Encerrada"}
        </Badge>
      </div>
      <HealthBar value={campaign.health} size="sm" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
        {[
          ["Invest.", `R$${campaign.spend.toLocaleString("pt-BR")}`],
          ["Leads",   campaign.leads],
          ["CPL",     `R$${campaign.cpl.toFixed(0)}`],
          ["ROAS",    `${campaign.roas}x`],
        ].map(([l, v]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: C.dim, textTransform: "uppercase", letterSpacing: 0.6 }}>{l}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 2, fontFamily: "JetBrains Mono, monospace" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: C.dim, marginTop: 10 }}>
        {campaign.startDate} → {campaign.endDate || "em andamento"}
      </div>
    </div>
  );
}
