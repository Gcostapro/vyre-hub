import { C, ROAS_COLOR } from "../lib/constants";
import { CLIENTS, ALERTS, CHART_DATA, CLIENT_DISTRIBUTION } from "../data/mockData";
import { Header } from "../components/layout/Header";
import { MetricCard } from "../components/dashboard/MetricCard";
import { HealthBar } from "../components/dashboard/HealthBar";
import { AlertCard } from "../components/dashboard/AlertCard";
import { MiniChart } from "../components/dashboard/MiniChart";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const totalSpend   = CLIENTS.reduce((s, c) => s + c.spend, 0);
const totalRevenue = CLIENTS.reduce((s, c) => s + c.revenue, 0);
const totalLeads   = CLIENTS.reduce((s, c) => s + c.leads, 0);
const avgRoas      = +(CLIENTS.reduce((s, c) => s + c.roas, 0) / CLIENTS.length).toFixed(1);
const avgCpl       = Math.round(totalSpend / totalLeads);
const avgHealth    = Math.round(CLIENTS.reduce((s, c) => s + c.health, 0) / CLIENTS.length);

const METRICS = [
  { label: "Investimento total", value: totalSpend,   prefix: "R$ ", change: 12.4 },
  { label: "Receita gerada",     value: totalRevenue, prefix: "R$ ", change: 8.7  },
  { label: "Total de leads",     value: totalLeads,   change: 15.2 },
  { label: "ROAS médio",         value: avgRoas,      suffix: "x",  change: 5.1  },
  { label: "CPL médio",          value: avgCpl,       prefix: "R$ ", change: -8.3 },
  { label: "Saúde geral",        value: avgHealth,    suffix: "%",  change: 3.2  },
];

const chartTick = { fill: C.dim, fontSize: 11 };

export default function Dashboard() {
  return (
    <div>
      <Header title="Dashboard geral" subtitle="Visão consolidada de todas as operações da Vyre"
        actions={
          <div style={{ fontSize: 11, color: C.dim, background: C.card, padding: "6px 12px", borderRadius: 6, border: `0.5px solid ${C.borderSolid}` }}>
            Março 2026
          </div>
        }
      />

      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 12, marginBottom: 24 }}>
        {METRICS.map((m, i) => <MetricCard key={m.label} {...m} delay={i * 0.06} mono />)}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16, marginBottom: 24 }}>
        {/* Area chart */}
        <div style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 16 }}>Investimento × Receita — últimos 30 dias</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="gSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.blue}  stopOpacity={0.25} />
                  <stop offset="95%" stopColor={C.blue}  stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.green} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={chartTick} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={chartTick} axisLine={false} tickLine={false} width={50} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: C.surface, border: `0.5px solid ${C.borderSolid}`, borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="spend"   name="Investimento" stroke={C.blue}  fill="url(#gSpend)"   strokeWidth={2} />
              <Area type="monotone" dataKey="revenue" name="Receita"      stroke={C.green} fill="url(#gRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Distribuição por cliente</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={CLIENT_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {CLIENT_DISTRIBUTION.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: C.surface, border: `0.5px solid ${C.borderSolid}`, borderRadius: 8, fontSize: 11 }} formatter={v => [`R$ ${v.toLocaleString("pt-BR")}`, ""]} />
              <Legend iconSize={8} formatter={v => <span style={{ fontSize: 10, color: C.muted }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table + Alerts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        {/* Performance table */}
        <div style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 16 }}>Performance por cliente</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `0.5px solid ${C.borderSolid}` }}>
                  {["Cliente", "Invest.", "Leads", "CPL", "ROAS", "CTR", "Saúde", "Trend"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: C.dim, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLIENTS.map(c => (
                  <tr key={c.id} style={{ borderBottom: `0.5px solid rgba(255,255,255,0.04)` }}>
                    <td style={{ padding: "10px", color: C.text, fontWeight: 500, whiteSpace: "nowrap" }}>{c.name}</td>
                    <td style={{ padding: "10px", color: C.muted, fontFamily: "JetBrains Mono, monospace" }}>R${(c.spend/1000).toFixed(1)}k</td>
                    <td style={{ padding: "10px", color: C.muted, fontFamily: "JetBrains Mono, monospace" }}>{c.leads}</td>
                    <td style={{ padding: "10px", color: C.muted, fontFamily: "JetBrains Mono, monospace" }}>R${c.cpl.toFixed(0)}</td>
                    <td style={{ padding: "10px" }}>
                      <span style={{ color: ROAS_COLOR(c.roas), fontWeight: 600, fontFamily: "JetBrains Mono, monospace" }}>{c.roas}x</span>
                    </td>
                    <td style={{ padding: "10px", color: C.muted, fontFamily: "JetBrains Mono, monospace" }}>{c.ctr}%</td>
                    <td style={{ padding: "10px", minWidth: 120 }}><HealthBar value={c.health} size="sm" /></td>
                    <td style={{ padding: "10px" }}>
                      <MiniChart data={[c.roas*0.7, c.roas*0.85, c.roas*1.1, c.roas*0.95, c.roas*1.05, c.roas, c.roas*1.02]} health={c.health} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts panel */}
        <div style={{ background: C.card, border: `0.5px solid ${C.borderSolid}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>Alertas recentes</div>
          {ALERTS.slice(0, 5).map(a => <AlertCard key={a.id} alert={a} />)}
        </div>
      </div>
    </div>
  );
}
