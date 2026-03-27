import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CLIENTS, CAMPAIGNS, CHART_DATA } from "../data/mockData";
import { C } from "../lib/constants";
import { HealthBar } from "../components/dashboard/HealthBar";
import { MetricCard } from "../components/dashboard/MetricCard";
import { CampaignCard } from "../components/clients/CampaignCard";
import { Badge } from "../components/ui/Badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartTick = { fill: C.dim, fontSize: 11 };

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = CLIENTS.find(c => c.id === Number(id));

  if (!client) return (
    <div style={{ textAlign: "center", padding: 80, color: C.dim }}>
      Cliente não encontrado. <span onClick={() => navigate("/clients")} style={{ color: C.blue, cursor: "pointer" }}>Voltar</span>
    </div>
  );

  const campaigns = CAMPAIGNS.filter(c => c.clientId === client.id);

  // Simula dados de evolução do cliente
  const clientChart = CHART_DATA.slice(-14).map((d, i) => ({
    date: d.date,
    roas: +(client.roas * (0.8 + Math.random() * 0.4)).toFixed(2),
    cpl:  Math.round(client.cpl * (0.8 + Math.random() * 0.4)),
  }));

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <button onClick={() => navigate("/clients")} style={{
          background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 8,
          padding: "8px 12px", color: C.muted, cursor: "pointer", display: "flex", alignItems: "center",
        }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>{client.name}</h1>
            <Badge variant={client.status === "active" ? "green" : "muted"}>
              {client.status === "active" ? "Ativo" : "Pausado"}
            </Badge>
          </div>
          <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>
            {client.segment} · Gestor: {client.gestor} · Desde {client.startDate}
          </p>
        </div>
      </div>

      {/* Health */}
      <div style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.dim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Saúde do cliente</div>
        <HealthBar value={client.health} size="lg" />
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Investimento", value: client.spend,    prefix: "R$ " },
          { label: "Receita",      value: client.revenue,  prefix: "R$ " },
          { label: "Leads",        value: client.leads },
          { label: "CPL",          value: `R$${client.cpl.toFixed(0)}` },
          { label: "CPA",          value: `R$${client.cpa.toFixed(0)}` },
          { label: "ROAS",         value: `${client.roas}x` },
          { label: "CTR",          value: `${client.ctr}%` },
          { label: "Campanhas",    value: client.campaigns },
        ].map((m, i) => <MetricCard key={m.label} {...m} delay={i * 0.04} />)}
      </div>

      {/* Evolution chart */}
      <div style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 16 }}>Evolução — últimos 14 dias</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={clientChart}>
            <XAxis dataKey="date" tick={chartTick} axisLine={false} tickLine={false} />
            <YAxis yAxisId="roas" orientation="left"  tick={chartTick} axisLine={false} tickLine={false} domain={[0, "auto"]} />
            <YAxis yAxisId="cpl"  orientation="right" tick={chartTick} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: C.surface, border: `0.5px solid ${C.borderSolid}`, borderRadius: 8, fontSize: 12 }} />
            <Legend iconSize={8} formatter={v => <span style={{ fontSize: 11, color: C.muted }}>{v}</span>} />
            <Line yAxisId="roas" type="monotone" dataKey="roas" name="ROAS"  stroke={C.blue}  strokeWidth={2} dot={false} />
            <Line yAxisId="cpl"  type="monotone" dataKey="cpl"  name="CPL"   stroke={C.yellow} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Campaigns */}
      <div style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 16 }}>Campanhas</div>
        {campaigns.length === 0 ? (
          <div style={{ textAlign: "center", color: C.dim, padding: 24, fontSize: 13 }}>Nenhuma campanha encontrada</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {campaigns.map(camp => <CampaignCard key={camp.id} campaign={camp} />)}
          </div>
        )}
      </div>
    </div>
  );
}
