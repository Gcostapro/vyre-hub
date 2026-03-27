import { subDays, format } from "date-fns";

// ── Clients ──────────────────────────────────────────────────────────────────
export const CLIENTS = [
  { id: 1, name: "Clínica Odonto Premium", segment: "Saúde",       gestor: "Lucas M.", status: "active", health: 92, spend: 12400, leads: 187, cpl: 66.31,  cpa: 132.62, roas: 4.2, ctr: 3.8, revenue: 52080, campaigns: 4, startDate: "2025-08-15", budget: 15000, targetRoas: 4.0, targetCpl: 70 },
  { id: 2, name: "Auto Center Silva",       segment: "Automotivo",  gestor: "Ana C.",   status: "active", health: 74, spend: 8200,  leads: 96,  cpl: 85.42,  cpa: 170.83, roas: 2.8, ctr: 2.4, revenue: 22960, campaigns: 3, startDate: "2025-10-01", budget: 10000, targetRoas: 3.0, targetCpl: 80 },
  { id: 3, name: "Restaurante Sabor & Arte",segment: "Alimentação", gestor: "Lucas M.", status: "active", health: 45, spend: 5600,  leads: 42,  cpl: 133.33, cpa: 266.67, roas: 1.3, ctr: 1.1, revenue: 7280,  campaigns: 2, startDate: "2025-11-20", budget: 6000,  targetRoas: 2.5, targetCpl: 100 },
  { id: 4, name: "Imobiliária Horizonte",   segment: "Imobiliário", gestor: "Ana C.",   status: "active", health: 86, spend: 18500, leads: 64,  cpl: 289.06, cpa: 578.13, roas: 5.1, ctr: 2.9, revenue: 94350, campaigns: 5, startDate: "2025-06-10", budget: 20000, targetRoas: 4.5, targetCpl: 300 },
  { id: 5, name: "Studio Fitness Pro",      segment: "Fitness",     gestor: "Lucas M.", status: "paused", health: 31, spend: 3200,  leads: 18,  cpl: 177.78, cpa: 355.56, roas: 0.8, ctr: 0.7, revenue: 2560,  campaigns: 1, startDate: "2026-01-05", budget: 4000,  targetRoas: 2.0, targetCpl: 120 },
  { id: 6, name: "Pet Shop Amigo Fiel",     segment: "Pet",         gestor: "Ana C.",   status: "active", health: 68, spend: 4100,  leads: 73,  cpl: 56.16,  cpa: 112.33, roas: 2.1, ctr: 3.2, revenue: 8610,  campaigns: 2, startDate: "2025-09-12", budget: 5000,  targetRoas: 2.5, targetCpl: 60 },
];

// ── Campaigns ─────────────────────────────────────────────────────────────────
export const CAMPAIGNS = [
  { id: 1, clientId: 1, name: "[META] Implantes - Conversão",      status: "active", health: 95, spend: 4200, leads: 78, cpl: 53.85, roas: 5.1, startDate: "2026-02-01", endDate: null },
  { id: 2, clientId: 1, name: "[META] Clareamento - Leads",        status: "active", health: 88, spend: 3800, leads: 62, cpl: 61.29, roas: 3.8, startDate: "2026-01-15", endDate: null },
  { id: 3, clientId: 1, name: "[GOOGLE] Busca - Dentista Osasco",  status: "active", health: 91, spend: 2900, leads: 34, cpl: 85.29, roas: 4.2, startDate: "2025-12-01", endDate: null },
  { id: 4, clientId: 1, name: "[META] Natal - Promo",              status: "ended",  health: 72, spend: 1500, leads: 13, cpl: 115.38,roas: 2.1, startDate: "2025-12-10", endDate: "2025-12-28" },
  { id: 5, clientId: 2, name: "[META] Revisão Veicular",           status: "active", health: 76, spend: 3100, leads: 41, cpl: 75.61, roas: 2.9, startDate: "2026-01-10", endDate: null },
  { id: 6, clientId: 2, name: "[GOOGLE] Funilaria - Search",       status: "active", health: 71, spend: 2800, leads: 32, cpl: 87.50, roas: 2.6, startDate: "2026-02-01", endDate: null },
  { id: 7, clientId: 3, name: "[META] Almoço Executivo",           status: "active", health: 42, spend: 3200, leads: 25, cpl: 128.00,roas: 1.2, startDate: "2026-02-15", endDate: null },
  { id: 8, clientId: 4, name: "[META] Lançamento Residencial",     status: "active", health: 89, spend: 8500, leads: 28, cpl: 303.57,roas: 5.8, startDate: "2025-11-01", endDate: null },
];

// ── Tasks ─────────────────────────────────────────────────────────────────────
export const TASKS = [
  { id: 1, title: "Criar criativos carrossel - Odonto",      assignee: "Pedro V.", priority: "high",   type: "editor", dueDate: "2026-03-28", column: "backlog", clientId: 1, description: "Carrossel de 5 slides para campanha de implantes" },
  { id: 2, title: "Briefing campanha Páscoa - Pet Shop",     assignee: "Ana C.",   priority: "medium", type: "gestor", dueDate: "2026-04-01", column: "backlog", clientId: 6, description: "Briefar campanha sazonal de Páscoa" },
  { id: 3, title: "Otimizar CPA campanha Implantes",         assignee: "Lucas M.", priority: "high",   type: "gestor", dueDate: "2026-03-27", column: "doing",   clientId: 1, description: "CPA atual: R$132. Meta: R$100" },
  { id: 4, title: "Editar vídeo depoimento - Imobiliária",   assignee: "Pedro V.", priority: "medium", type: "editor", dueDate: "2026-03-27", column: "doing",   clientId: 4, description: "Depoimento de 60s para Stories" },
  { id: 5, title: "Configurar CAPI - Auto Center",           assignee: "Lucas M.", priority: "high",   type: "gestor", dueDate: "2026-03-26", column: "doing",   clientId: 2, description: "Integração Conversions API Meta" },
  { id: 6, title: "Relatório mensal - Odonto Premium",       assignee: "Ana C.",   priority: "medium", type: "gestor", dueDate: "2026-03-26", column: "review",  clientId: 1, description: "Relatório completo de março/2026" },
  { id: 7, title: "Subir campanha Almoço Executivo",         assignee: "Ana C.",   priority: "high",   type: "gestor", dueDate: "2026-03-25", column: "done",    clientId: 3, description: "Campanha no ar ✓" },
  { id: 8, title: "Render vídeo Stories - Fitness",          assignee: "Pedro V.", priority: "low",    type: "editor", dueDate: "2026-03-24", column: "done",    clientId: 5, description: "Série de 3 Stories verticais" },
  { id: 9, title: "Auditoria pixel - Horizonte",             assignee: "Lucas M.", priority: "medium", type: "gestor", dueDate: "2026-03-24", column: "done",    clientId: 4, description: "Verificar eventos do pixel Meta" },
];

// ── Team ──────────────────────────────────────────────────────────────────────
export const TEAM = [
  { id: 1, name: "Lucas M.", role: "Gestor de Tráfego",  avatar: "LM", clients: 3, tasks: 4, completedThisWeek: 7,  workload: 80 },
  { id: 2, name: "Ana C.",   role: "Gestora de Tráfego", avatar: "AC", clients: 3, tasks: 3, completedThisWeek: 5,  workload: 65 },
  { id: 3, name: "Pedro V.", role: "Editor de Vídeo",    avatar: "PV", clients: 0, tasks: 3, completedThisWeek: 4,  workload: 50 },
];

// ── Alerts ────────────────────────────────────────────────────────────────────
export const ALERTS = [
  { id: 1, type: "danger",  message: "Studio Fitness Pro: ROAS abaixo de 1.0 — campanha no prejuízo",       time: "há 2h",  clientId: 5, read: false },
  { id: 2, type: "warning", message: "Restaurante Sabor & Arte: CTR caiu 40% nos últimos 7 dias",            time: "há 5h",  clientId: 3, read: false },
  { id: 3, type: "warning", message: "Auto Center Silva: CPA subiu 22% esta semana",                         time: "há 8h",  clientId: 2, read: false },
  { id: 4, type: "success", message: "Clínica Odonto Premium: ROAS atingiu meta de 4.0+",                   time: "há 1d",  clientId: 1, read: true  },
  { id: 5, type: "info",    message: "Imobiliária Horizonte: campanha atingiu 30 dias — revisar criativos",  time: "há 1d",  clientId: 4, read: true  },
];

// ── Chart data (30 days) ──────────────────────────────────────────────────────
function generateDailyData() {
  return Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i);
    const noise = () => 0.8 + Math.random() * 0.4;
    const baseSpend = 1800;
    const spend = Math.round(baseSpend * noise());
    return {
      date: format(date, "dd/MM"),
      spend,
      revenue: Math.round(spend * (3 + Math.random() * 2)),
      leads: Math.round(15 + Math.random() * 10),
    };
  });
}

export const CHART_DATA = generateDailyData();

export const CLIENT_DISTRIBUTION = CLIENTS.map(c => ({
  name: c.name.split(" ").slice(0, 2).join(" "),
  value: c.spend,
  color: ["#2E6FF2", "#00C48C", "#FFB547", "#A855F7", "#FF4757", "#06B6D4"][CLIENTS.indexOf(c)],
}));
