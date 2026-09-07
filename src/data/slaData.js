// Stackly Enterprise SLA Dashboard Data Store
export const COMPANY_INFO = {
  name: "Stackly",
  tagline: "Enterprise Cloud Reliability & SLA Performance",
  version: "v3.8.4-LTS",
  environment: "Production Cluster (Global)",
  lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  complianceScore: "99.982%",
  targetSla: "99.900%",
  quarterlyStatus: "Exceeding Targets (+0.082%)",
  penaltiesAvoided: "$148,500",
  monitoredNodes: 284,
  activeServices: 48,
  totalRequestsMonth: "4.82 Billion",
  mtta: "1m 42s", // Mean Time to Acknowledge
  mttr: "14m 20s", // Mean Time to Resolve
  slaBreachRisk: "Low (0 Active Breaches)",
};

// SLA Statistics Cards Data (Total SLA, Active SLA, Breached SLA, Completed SLA)
export const SLA_SUMMARY_METRICS = [
  {
    id: "total-sla",
    key: "total",
    label: "Total SLA",
    value: "1,248",
    count: 1248,
    target: "1,200",
    subtext: "1,248 Total SLA agreements monitored",
    progress: 100,
    progressLabel: "100% Tracked",
    change: "+12 agreements this quarter",
    changeType: "positive",
    iconName: "ShieldCheck",
    color: "#2563eb",
    bgColor: "rgba(37, 99, 235, 0.12)",
    status: "healthy",
    statusLabel: "All Monitored"
  },
  {
    id: "active-sla",
    key: "active",
    label: "Active SLA",
    value: "1,180",
    count: 1180,
    target: "94.6%",
    subtext: "1,180 Active agreements currently in compliance",
    progress: 94.6,
    progressLabel: "94.6% Compliant",
    change: "99.98% avg uptime achievement",
    changeType: "positive",
    iconName: "Activity",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.12)",
    status: "healthy",
    statusLabel: "Active"
  },
  {
    id: "breached-sla",
    key: "breached",
    label: "Breached SLA",
    value: "2",
    count: 2,
    target: "< 5",
    subtext: "2 Agreements breached • Remediation in progress",
    progress: 0.16,
    progressLabel: "0.16% Breach Rate",
    change: "Under safety threshold (<0.5%)",
    changeType: "danger",
    iconName: "AlertTriangle",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.12)",
    status: "danger",
    statusLabel: "Breached"
  },
  {
    id: "completed-sla",
    key: "completed",
    label: "Completed SLA",
    value: "66",
    count: 66,
    target: "100%",
    subtext: "66 Agreements successfully fulfilled & archived",
    progress: 100,
    progressLabel: "100% Fulfilled",
    change: "Zero breach penalties incurred",
    changeType: "positive",
    iconName: "CheckCircle2",
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.12)",
    status: "info",
    statusLabel: "Completed"
  }
];

// Comprehensive SLA Records Data Table
export const SLA_RECORDS = [
  {
    id: "SLA-4091",
    name: "Core Banking API Gateway SLA",
    client: "Finovate Global",
    tier: "Platinum Enterprise",
    targetSla: 99.99,
    currentSla: 99.995,
    progress: 100,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "$0 (Target Exceeded)",
    mtta: "1m 15s",
    mttr: "12m 40s",
    uptimeSeconds: "2,591,870s",
    responseTime: "18ms",
    region: "Global Anycast (24 PoPs)"
  },
  {
    id: "SLA-4092",
    name: "Payment Settlement & Transaction Ledger",
    client: "Acme Financial Inc",
    tier: "Platinum Enterprise",
    targetSla: 99.99,
    currentSla: 99.999,
    progress: 100,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "$0 (Target Exceeded)",
    mtta: "45s",
    mttr: "8m 10s",
    uptimeSeconds: "2,591,974s",
    responseTime: "112ms",
    region: "US-East Isolated"
  },
  {
    id: "SLA-4093",
    name: "AP-South WebSocket Stream Gateway",
    client: "Apex Media Stream",
    tier: "Gold Business",
    targetSla: 99.90,
    currentSla: 99.782,
    progress: 88.2,
    status: "Breached",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "20% Refund ($14,200)",
    mtta: "2m 30s",
    mttr: "48m 15s",
    uptimeSeconds: "2,586,350s",
    responseTime: "84ms",
    region: "AP-South (Mumbai)"
  },
  {
    id: "SLA-4094",
    name: "Identity & OAuth SSO Cluster",
    client: "OmniHealth Cloud",
    tier: "Platinum Enterprise",
    targetSla: 99.99,
    currentSla: 99.991,
    progress: 99.2,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "$0 (Compliant)",
    mtta: "1m 10s",
    mttr: "14m 20s",
    uptimeSeconds: "2,591,766s",
    responseTime: "38ms",
    region: "US-East / EU-Central"
  },
  {
    id: "SLA-4095",
    name: "Enterprise Webhook Event Dispatcher",
    client: "Starlight SaaS",
    tier: "Silver Growth",
    targetSla: 99.50,
    currentSla: 99.990,
    progress: 100,
    status: "Completed",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    dateRange: "Aug 01 - Aug 31, 2026",
    penaltyLiability: "$0 (Met with Distinction)",
    mtta: "3m 05s",
    mttr: "22m 10s",
    uptimeSeconds: "2,678,132s",
    responseTime: "88ms",
    region: "Global SQS/Kafka"
  },
  {
    id: "SLA-4096",
    name: "Edge CDN Static Asset Pipeline",
    client: "Vortex Commerce",
    tier: "Gold Business",
    targetSla: 99.90,
    currentSla: 99.998,
    progress: 100,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "$0 (Target Exceeded)",
    mtta: "55s",
    mttr: "6m 30s",
    uptimeSeconds: "2,591,948s",
    responseTime: "7ms",
    region: "340+ Global PoPs"
  },
  {
    id: "SLA-4097",
    name: "PostgreSQL High-Availability Cluster",
    client: "Finovate Global",
    tier: "Platinum Enterprise",
    targetSla: 99.99,
    currentSla: 99.988,
    progress: 98.8,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "$0 (Safe Buffer)",
    mtta: "1m 40s",
    mttr: "18m 05s",
    uptimeSeconds: "2,591,688s",
    responseTime: "5ms",
    region: "Multi-AZ Primary + 5 Replicas"
  },
  {
    id: "SLA-4098",
    name: "Legacy Merchant Webhook Gateway",
    client: "OldBank Systems",
    tier: "Silver Growth",
    targetSla: 99.50,
    currentSla: 98.420,
    progress: 74.5,
    status: "Breached",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "50% Invoice Refund ($8,900)",
    mtta: "8m 45s",
    mttr: "1h 22m",
    uptimeSeconds: "2,551,040s",
    responseTime: "320ms",
    region: "US-Central Legacy"
  },
  {
    id: "SLA-4099",
    name: "AI Copilot Model Inference Gateway",
    client: "Cognitive Labs",
    tier: "Gold Business",
    targetSla: 99.90,
    currentSla: 99.985,
    progress: 100,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "$0 (Target Exceeded)",
    mtta: "1m 20s",
    mttr: "11m 40s",
    uptimeSeconds: "2,591,610s",
    responseTime: "42ms",
    region: "US-West Multi-GPU"
  },
  {
    id: "SLA-4100",
    name: "Q2 Enterprise Datacenter Migration SLA",
    client: "Acme Financial Inc",
    tier: "Platinum Enterprise",
    targetSla: 99.99,
    currentSla: 99.998,
    progress: 100,
    status: "Completed",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    dateRange: "Apr 01 - Jun 30, 2026",
    penaltyLiability: "$0 (Verified 100% Payout)",
    mtta: "40s",
    mttr: "5m 12s",
    uptimeSeconds: "7,862,240s",
    responseTime: "14ms",
    region: "US-East Multi-AZ"
  },
  {
    id: "SLA-4101",
    name: "Elasticsearch & Vector Semantic Index",
    client: "Nexus Search",
    tier: "Gold Business",
    targetSla: 99.90,
    currentSla: 99.972,
    progress: 99.5,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    dateRange: "Sep 01 - Sep 30, 2026",
    penaltyLiability: "$0 (Compliant)",
    mtta: "2m 15s",
    mttr: "26m 40s",
    uptimeSeconds: "2,591,274s",
    responseTime: "62ms",
    region: "US-East & EU-West"
  },
  {
    id: "SLA-4102",
    name: "Global Anycast DNS & Traffic Steering",
    client: "All Enterprise Clients",
    tier: "Platinum Enterprise",
    targetSla: 99.99,
    currentSla: 100.00,
    progress: 100,
    status: "Completed",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    dateRange: "Jul 01 - Jul 31, 2026",
    penaltyLiability: "$0 (Zero Downtime Met)",
    mtta: "0s",
    mttr: "0s",
    uptimeSeconds: "2,678,400s",
    responseTime: "2ms",
    region: "Planetary Edge Mesh"
  }
];

export const KPI_METRICS = [
  {
    id: "global-sla",
    label: "Global SLA Compliance",
    value: "99.982%",
    subtext: "Target: 99.900%",
    status: "healthy",
    change: "+0.04% vs last month",
    changeType: "positive",
    iconName: "ShieldCheck",
    color: "#10b981",
    bgColor: "#ecfdf5",
    accentBorder: "#a7f3d0"
  },
  {
    id: "active-services",
    label: "Monitored Services",
    value: "48 / 48",
    subtext: "47 Operational, 1 Degraded",
    status: "warning",
    change: "100% telemetry coverage",
    changeType: "neutral",
    iconName: "Server",
    color: "#2563eb",
    bgColor: "#eff6ff",
    accentBorder: "#bfdbfe"
  },
  {
    id: "mttr-metric",
    label: "Mean Time to Resolve (MTTR)",
    value: "14m 20s",
    subtext: "SLA Cap: 45m 00s",
    status: "healthy",
    change: "-3m 15s improvement",
    changeType: "positive",
    iconName: "Timer",
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
    accentBorder: "#ddd6fe"
  },
  {
    id: "sla-breach-risk",
    label: "SLA Breach Countdowns",
    value: "0 Breached",
    subtext: "1 Warning (26m remaining)",
    status: "warning",
    change: "Zero breach penalties",
    changeType: "warning",
    iconName: "AlertTriangle",
    color: "#f59e0b",
    bgColor: "#fffbeb",
    accentBorder: "#fde68a"
  }
];

export const SLA_TIERS = [
  {
    tier: "Platinum Enterprise",
    target: "99.990%",
    current: "99.994%",
    status: "compliant",
    clientCount: 142,
    maxDowntimeMonth: "4m 23s",
    actualDowntimeMonth: "2m 14s",
    creditGuarantee: "30% service fee refund if breached",
    features: ["Dedicated SRE Squad", "15m MTTR Guarantee", "Direct Slack War Room"],
    badgeColor: "#6366f1",
    badgeBg: "#eef2ff"
  },
  {
    tier: "Gold Business",
    target: "99.900%",
    current: "99.982%",
    status: "compliant",
    clientCount: 486,
    maxDowntimeMonth: "43m 49s",
    actualDowntimeMonth: "7m 52s",
    creditGuarantee: "20% service fee refund if breached",
    features: ["24/7 NOC Monitoring", "45m MTTR Guarantee", "Priority Escalation"],
    badgeColor: "#f59e0b",
    badgeBg: "#fffbeb"
  },
  {
    tier: "Silver Growth",
    target: "99.500%",
    current: "99.890%",
    status: "compliant",
    clientCount: 1250,
    maxDowntimeMonth: "3h 39m",
    actualDowntimeMonth: "48m 10s",
    creditGuarantee: "10% service credit refund",
    features: ["Standard 99.5% SLA", "2h MTTR Target", "Email & Ticket Support"],
    badgeColor: "#64748b",
    badgeBg: "#f8fafc"
  },
  {
    tier: "Standard Developer",
    target: "99.000%",
    current: "99.950%",
    status: "compliant",
    clientCount: 3890,
    maxDowntimeMonth: "7h 18m",
    actualDowntimeMonth: "22m 05s",
    creditGuarantee: "Best effort SLA",
    features: ["Public Cloud Endpoints", "Community & Forum Support", "Daily Uptime Digest"],
    badgeColor: "#10b981",
    badgeBg: "#ecfdf5"
  }
];

export const SERVICES_LIST = [
  {
    id: "srv-api-gw",
    name: "Stackly Core API Gateway",
    type: "Ingress Router",
    tier: "Platinum (99.99%)",
    uptime: "99.995%",
    latency: "18ms",
    p99Latency: "34ms",
    requestsSec: "42,800 req/s",
    errorRate: "0.002%",
    status: "Operational",
    region: "Global Anycast (24 Edge PoPs)",
    lastIncident: "None in 45 days",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-auth",
    name: "Identity & SSO Auth Engine",
    type: "Security & Auth",
    tier: "Platinum (99.99%)",
    uptime: "99.991%",
    latency: "38ms",
    p99Latency: "56ms",
    requestsSec: "14,200 req/s",
    errorRate: "0.008%",
    status: "Operational",
    region: "US-East / EU-Central",
    lastIncident: "28 days ago (3m quick reload)",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-billing",
    name: "Transaction & Billing Ledger",
    type: "Financial Core",
    tier: "Platinum (99.99%)",
    uptime: "99.999%",
    latency: "112ms",
    p99Latency: "145ms",
    requestsSec: "3,400 req/s",
    errorRate: "0.0001%",
    status: "Operational",
    region: "US-East Multi-AZ Isolated",
    lastIncident: "None in 120 days",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-db",
    name: "PostgreSQL High-Availability Cluster",
    type: "Distributed DB",
    tier: "Platinum (99.99%)",
    uptime: "99.988%",
    latency: "5ms",
    p99Latency: "12ms",
    requestsSec: "98,000 qps",
    errorRate: "0.012%",
    status: "Operational",
    region: "Primary + 5 Read Replicas",
    lastIncident: "14 days ago (Failover completed)",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-cdn",
    name: "Edge CDN & Static Asset Pipeline",
    type: "Edge Delivery",
    tier: "Gold (99.90%)",
    uptime: "99.998%",
    latency: "7ms",
    p99Latency: "14ms",
    requestsSec: "125,000 req/s",
    errorRate: "0.001%",
    status: "Operational",
    region: "340+ Global Points of Presence",
    lastIncident: "None in 60 days",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-ws-notify",
    name: "Real-time Notification & WebSockets",
    type: "Event Streaming",
    tier: "Gold (99.90%)",
    uptime: "99.940%",
    latency: "84ms",
    p99Latency: "190ms",
    requestsSec: "26,000 msg/s",
    errorRate: "0.058%",
    status: "Degraded",
    region: "AP-South-1 (Mumbai Cluster)",
    lastIncident: "Active: Socket saturation (P2)",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.7]
  },
  {
    id: "srv-search",
    name: "Elasticsearch & Vector Semantic Index",
    type: "Search Cluster",
    tier: "Gold (99.90%)",
    uptime: "99.972%",
    latency: "62ms",
    p99Latency: "115ms",
    requestsSec: "8,900 qps",
    errorRate: "0.024%",
    status: "Operational",
    region: "US-East & EU-West",
    lastIncident: "6 days ago (Re-indexing spike)",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.95, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-webhooks",
    name: "Enterprise Webhook Dispatcher",
    type: "Async Queue",
    tier: "Silver (99.50%)",
    uptime: "99.990%",
    latency: "88ms",
    p99Latency: "140ms",
    requestsSec: "18,400 events/s",
    errorRate: "0.010%",
    status: "Operational",
    region: "Global SQS/Kafka Pipeline",
    lastIncident: "2 days ago (Resolved in 12m)",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-ai-copilot",
    name: "AI Copilot & Model Inference Gateway",
    type: "AI / ML Inference",
    tier: "Gold (99.90%)",
    uptime: "99.985%",
    latency: "42ms",
    p99Latency: "88ms",
    requestsSec: "18,200 req/s",
    errorRate: "0.005%",
    status: "Operational",
    region: "US-West Multi-GPU Cluster",
    lastIncident: "None in 30 days",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: "srv-kafka",
    name: "Distributed Kafka Event Streaming Bus",
    type: "Event Backbone",
    tier: "Platinum (99.99%)",
    uptime: "99.998%",
    latency: "4ms",
    p99Latency: "9ms",
    requestsSec: "140,000 ev/s",
    errorRate: "0.0002%",
    status: "Operational",
    region: "Multi-AZ Partitioned Mesh",
    lastIncident: "None in 90 days",
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
];

// Google SRE Standard Error Budget & Burn Rate Data
export const ERROR_BUDGET_METRICS = {
  rollingPeriod: "30-Day Rolling Window",
  daysRemainingInPeriod: 21,
  tiers: [
    {
      tierName: "Platinum Enterprise (99.99%)",
      slaTarget: 99.99,
      allowedDowntimeSec: 263, // 4m 23s
      allowedDowntimeFormatted: "4m 23s",
      consumedSec: 134, // 2m 14s
      consumedFormatted: "2m 14s",
      remainingSec: 129, // 2m 09s
      remainingFormatted: "2m 09s",
      percentageRemaining: 49.0,
      burnRateMultiplier: 1.1,
      burnStatus: "Normal", // Normal (<=1x), Elevated (1-2.5x), Fast Burn (>2.5x)
      estimatedDaysToExhaustion: 42,
      serviceCount: 142
    },
    {
      tierName: "Gold Business (99.90%)",
      slaTarget: 99.90,
      allowedDowntimeSec: 2629, // 43m 49s
      allowedDowntimeFormatted: "43m 49s",
      consumedSec: 472, // 7m 52s
      consumedFormatted: "7m 52s",
      remainingSec: 2157, // 35m 57s
      remainingFormatted: "35m 57s",
      percentageRemaining: 82.0,
      burnRateMultiplier: 1.4,
      burnStatus: "Normal",
      estimatedDaysToExhaustion: 65,
      serviceCount: 486
    },
    {
      tierName: "Silver Growth (99.50%)",
      slaTarget: 99.50,
      allowedDowntimeSec: 13149, // 3h 39m 09s
      allowedDowntimeFormatted: "3h 39m",
      consumedSec: 2890, // 48m 10s
      consumedFormatted: "48m 10s",
      remainingSec: 10259, // 2h 50m 59s
      remainingFormatted: "2h 51m",
      percentageRemaining: 78.0,
      burnRateMultiplier: 0.9,
      burnStatus: "Optimal",
      estimatedDaysToExhaustion: 88,
      serviceCount: 1250
    }
  ],
  highBurnAlerts: [
    {
      service: "Real-time Notification & WebSockets",
      tier: "Gold Business",
      currentBurn: "2.8x (Elevated)",
      reason: "AP-South-1 socket degradation consuming 1.2s error budget/hr",
      actionNeeded: "Auto-scale cluster sockets or trigger traffic drain"
    }
  ]
};

// Contractual SLA Penalty & Credit Refund Data
export const SLA_PENALTY_DATA = {
  quarterlyPenaltiesIncurred: 0,
  quarterlyPenaltiesProtected: 148500,
  rebateReserveFund: 250000,
  activeBreaches: 0,
  atRiskAccounts: 0,
  refundRules: [
    { minUptime: 99.90, maxUptime: 100.0, rebatePercent: 0, status: "Contract Met", color: "#00c6a7" },
    { minUptime: 99.50, maxUptime: 99.89, rebatePercent: 10, status: "10% Service Credit", color: "#f59e0b" },
    { minUptime: 99.00, maxUptime: 99.49, rebatePercent: 25, status: "25% Service Credit", color: "#f97316" },
    { minUptime: 0.00,  maxUptime: 98.99, rebatePercent: 50, status: "50% Invoice Refund", color: "#ef4444" }
  ],
  accountTiers: {
    platinum: { count: 142, avgMonthlySpend: 1250 },
    gold: { count: 486, avgMonthlySpend: 420 },
    silver: { count: 1250, avgMonthlySpend: 150 }
  }
};

// 90-Day SLA Availability Calendar Dataset (Q3 2026 Audit)
export const generate90DayUptimeHistory = () => {
  const days = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Seed realistic SLA uptime variations
    let uptime = 100.0;
    let status = "Optimal";
    let downtimeMins = 0;
    let note = "100% SLA Maintained • Zero Incidents";

    if (i === 1) {
      uptime = 99.94;
      status = "Degraded";
      downtimeMins = 2.6;
      note = "INC-4821: AP-South WebSocket saturation";
    } else if (i === 14) {
      uptime = 99.96;
      status = "Degraded";
      downtimeMins = 1.7;
      note = "INC-4790: Database automated failover";
    } else if (i === 38) {
      uptime = 99.98;
      status = "Optimal";
      downtimeMins = 0.8;
      note = "Scheduled firmware zero-downtime patch";
    } else if (i === 62) {
      uptime = 99.95;
      status = "Degraded";
      downtimeMins = 2.1;
      note = "Upstream Tier-1 transit routing flap";
    }

    days.push({
      dayIndex: 90 - i,
      date: dateStr,
      uptime: uptime,
      status: status,
      downtimeMins: downtimeMins,
      note: note
    });
  }
  return days;
};

export const UPTIME_CALENDAR_DATA = generate90DayUptimeHistory();


export const ACTIVE_INCIDENTS = [
  {
    id: "INC-4821",
    title: "WebSocket Connection Pool Saturation in AP-South-1",
    severity: "P2 - High",
    service: "Real-time Notification & WebSockets",
    startedAt: "34 minutes ago",
    slaWindow: "60 minutes",
    timeToBreach: "26 minutes",
    breachRisk: "High Risk",
    leadEngineer: "Sarah Chen (Principal SRE)",
    status: "Mitigating",
    updates: [
      "11:05 - Automated circuit breaker triggered on node ws-ap-04.",
      "11:18 - Regional traffic rerouted to Singapore backup gateway.",
      "11:32 - Auto-scaler spun up 8 additional socket workers. Latency dropping."
    ]
  },
  {
    id: "INC-4819",
    title: "Webhook Delivery Retry Buffer Spike",
    severity: "P3 - Moderate",
    service: "Enterprise Webhook Dispatcher",
    startedAt: "Yesterday at 16:42",
    slaWindow: "120 minutes",
    timeToBreach: "RESOLVED (In 12 mins)",
    breachRisk: "Zero Breach Impact",
    leadEngineer: "David Miller (Cloud Ops)",
    status: "Resolved",
    updates: [
      "16:42 - Client HTTP 504 timeout spike on external merchant endpoints.",
      "16:54 - Exponential backoff throttle enabled. All webhooks delivered within SLA buffer."
    ]
  }
];

export const HOURLY_PERFORMANCE = [
  { time: "00:00", uptime: 99.998, latency: 19, traffic: 42 },
  { time: "02:00", uptime: 99.995, latency: 18, traffic: 35 },
  { time: "04:00", uptime: 99.992, latency: 17, traffic: 28 },
  { time: "06:00", uptime: 99.991, latency: 21, traffic: 52 },
  { time: "08:00", uptime: 99.985, latency: 26, traffic: 78 },
  { time: "10:00", uptime: 99.960, latency: 34, traffic: 94 },
  { time: "12:00", uptime: 99.972, latency: 28, traffic: 89 },
  { time: "14:00", uptime: 99.980, latency: 25, traffic: 84 },
  { time: "16:00", uptime: 99.988, latency: 22, traffic: 79 },
  { time: "18:00", uptime: 99.992, latency: 20, traffic: 68 },
  { time: "20:00", uptime: 99.990, latency: 21, traffic: 62 },
  { time: "22:00", uptime: 99.994, latency: 19, traffic: 49 },
  { time: "Now",   uptime: 99.982, latency: 22, traffic: 81 }
];

export const REGIONAL_DATA = [
  { region: "North America (Virginia & Oregon)", uptime: "99.994%", latency: "14ms", status: "Optimal", nodes: 96 },
  { region: "Europe (Frankfurt & London)", uptime: "99.988%", latency: "18ms", status: "Optimal", nodes: 74 },
  { region: "Asia-Pacific (Tokyo & Mumbai)", uptime: "99.952%", latency: "46ms", status: "Investigating", nodes: 68 },
  { region: "South America (São Paulo)", uptime: "99.980%", latency: "64ms", status: "Optimal", nodes: 26 },
  { region: "Oceania (Sydney Edge)", uptime: "99.991%", latency: "38ms", status: "Optimal", nodes: 20 }
];

// Helper for dynamic image path resolution
const getImg = (filename) => {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return `./public/images/${filename}`;
  }
  return `./public/images/${filename}`; // Compatible with both Vite and local preview
};

// The 5 SLA Showcase Visuals
export const SLA_SHOWCASE_IMAGES = [
  {
    id: "img-datacenter",
    title: "Mission-Critical Cloud Datacenter Infrastructure",
    category: "Tier 4 Uptime Guarantee",
    image: getImg("datacenter-servers.jpg"),
    metric: "99.999% Physical Uptime",
    description: "Multi-region redundant power, N+2 cooling, and distributed physical server racks ensuring zero hardware-level single points of failure.",
    tag: "Hardware SLA"
  },
  {
    id: "img-noc",
    title: "24/7 Global SLA Operations Command Center",
    category: "NOC Reliability Telemetry",
    image: getImg("ops-command-center.jpg"),
    metric: "< 2 Min Response MTTA",
    description: "Dedicated site reliability engineers monitor live heartbeat signals across all 48 distributed cloud microservices around the clock.",
    tag: "Active Monitoring"
  },
  {
    id: "img-shield",
    title: "Stackly 99.99% Enterprise SLA Guarantee Shield",
    category: "Contractual Compliance",
    image: getImg("uptime-shield.jpg"),
    metric: "$148,500 Penalties Avoided",
    description: "Bank-grade enterprise contracts with real-time automated SLA compliance verification and instant service credit compensation.",
    tag: "Compliance Shield"
  },
  {
    id: "img-edge",
    title: "Global Anycast Edge Network & Low-Latency Routing",
    category: "Edge Performance",
    image: getImg("global-edge-network.jpg"),
    metric: "18ms Global Avg Latency",
    description: "Over 340 edge points of presence intelligently route inbound traffic away from degraded regional backbones in sub-millisecond intervals.",
    tag: "Network SLA"
  },
  {
    id: "img-sre",
    title: "Rapid SRE Incident Response & Escalation Squad",
    category: "Incident Management",
    image: getImg("sre-team.jpg"),
    metric: "14m 20s MTTR Average",
    description: "Certified reliability engineers and DevOps architects triage P1/P2 incidents with automated runbooks and live war rooms.",
    tag: "Human Ops"
  }
];

export const DEMO_USERS = [
  {
    role: "Super Admin",
    name: "Super Admin",
    title: "VP of Cloud Infrastructure",
    email: "admin@stackly.com",
    avatar: "SA",
    permissions: "Full Read/Write, SLA Threshold Tuning, Incident Override"
  },
  {
    role: "SLA Manager",
    name: "Sarah Chen",
    title: "Principal Site Reliability Engineer",
    email: "sarah.chen@stackly.io",
    avatar: "SC",
    permissions: "Service Maintenance, Incident Triage, SRE Runbooks"
  },
  {
    role: "Enterprise Client",
    name: "Marcus Sterling",
    title: "CTO, Finovate Global (Platinum)",
    email: "marcus@finovate.com",
    avatar: "MS",
    permissions: "Executive Reports, Contract Audit, Live SLA Telemetry"
  }
];
