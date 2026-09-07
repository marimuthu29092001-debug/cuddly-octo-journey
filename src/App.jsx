import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import KpiStatsGrid from './components/dashboard/KpiStatsGrid';
import SlaRecordsTable from './components/dashboard/SlaRecordsTable';
import VisualShowcase from './components/dashboard/VisualShowcase';
import UptimeTrendChart from './components/dashboard/UptimeTrendChart';
import ServiceHealthMatrix from './components/dashboard/ServiceHealthMatrix';
import SlaTiersCard from './components/dashboard/SlaTiersCard';
import IncidentTracker from './components/dashboard/IncidentTracker';
import RegionalLatencyMap from './components/dashboard/RegionalLatencyMap';
import ReportExportModal from './components/dashboard/ReportExportModal';
import ErrorBudgetCard from './components/dashboard/ErrorBudgetCard';
import SlaCreditCalculator from './components/dashboard/SlaCreditCalculator';
import UptimeCalendarHeatmap from './components/dashboard/UptimeCalendarHeatmap';
import { COMPANY_INFO } from './data/slaData';
import { ShieldCheck, Activity, Sparkles, Clock, RefreshCw, Gauge, Calculator, Calendar } from 'lucide-react';
import './App.css';

export default function App() {
  // Theme state - default 'orange' (Cyber Orange Magma theme requested by user)
  const [theme, setTheme] = useState('orange');

  // Authentication state - initial state null forces the animated login page first!
  const [currentUser, setCurrentUser] = useState(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Filters & State
  const [timeRange, setTimeRange] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(COMPANY_INFO.lastUpdated);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync theme to document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Lock body scroll when modal or mobile sidebar is open (prevents backscroll / background scroll)
  useEffect(() => {
    if (reportModalOpen || mobileSidebarOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, [reportModalOpen, mobileSidebarOpen]);

  // Handle Login
  const handleLoginSuccess = (user) => {
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    setCurrentUser(user);
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Live Refresh Telemetry
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
    }, 600);
  };

  // If user is not logged in, render the animated Login portal!
  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container" data-theme={theme}>
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Sticky Navbar */}
        <Navbar 
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenReportModal={() => setReportModalOpen(true)}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Dynamic Body Content */}
        <main className="content-body">
          {/* Welcome Hero / Status Header */}
          <div className="dashboard-hero-bar">
            <div className="hero-welcome-text">
              <h2>
                Welcome back, {currentUser.name}
              </h2>
              <p>
                Stackly SLA Telemetry Engine &bull; Environment: <strong>{COMPANY_INFO.environment}</strong> &bull; Node Cluster Health: <strong>100%</strong>
              </p>
            </div>

            <div className="hero-quick-tags">
              <div className="quick-metric-chip">
                <Clock size={13} color="var(--brand-primary)" />
                <span>Last Probe: <strong>{lastRefreshed}</strong></span>
              </div>

              <div className="quick-metric-chip">
                <Activity size={13} color="var(--status-healthy)" />
                <span>Global Uptime: <strong>{COMPANY_INFO.complianceScore}</strong></span>
              </div>

              <button 
                className="btn-secondary" 
                onClick={handleManualRefresh}
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                title="Fetch live heartbeat telemetry"
              >
                <RefreshCw size={13} className={isRefreshing ? 'spin-anim' : ''} />
                <span>Sync</span>
              </button>
            </div>
          </div>

          {/* Conditional Views based on Sidebar Navigation */}
          {activeTab === 'overview' && (
            <>
              {/* 4 SLA Statistics Cards (Total SLA, Active SLA, Breached SLA, Completed SLA with Progress Indicators) */}
              <KpiStatsGrid 
                selectedStatus={selectedStatusFilter} 
                onSelectStatus={setSelectedStatusFilter} 
              />

              {/* SLA Data Table with Search, Filter, Date Range, Status Badges, Progress Indicators, Empty & Loading States */}
              <SlaRecordsTable 
                externalSearch={searchTerm} 
                externalStatus={selectedStatusFilter} 
                onStatusChange={setSelectedStatusFilter} 
              />

              {/* Real-time SLA Performance & Latency Trend Chart */}
              <UptimeTrendChart />

              {/* SRE Error Budget & Burn Rate Monitor */}
              <ErrorBudgetCard />

              {/* SLA Penalty Liability & Credit Refund Simulator */}
              <SlaCreditCalculator />

              {/* 90-Day SLA Availability Calendar Heatmap */}
              <UptimeCalendarHeatmap />

              {/* Microservices Matrix */}
              <ServiceHealthMatrix searchTerm={searchTerm} />

              {/* SLA Contract Tiers */}
              <SlaTiersCard />

              {/* Active Incident & Breach Risk Tracker */}
              <IncidentTracker />

              {/* Regional Edge Latency */}
              <RegionalLatencyMap />

              {/* 5 Infrastructure Images Showcase */}
              <VisualShowcase />
            </>
          )}

          {activeTab === 'records' && (
            <>
              <KpiStatsGrid 
                selectedStatus={selectedStatusFilter} 
                onSelectStatus={setSelectedStatusFilter} 
              />
              <SlaRecordsTable 
                externalSearch={searchTerm} 
                externalStatus={selectedStatusFilter} 
                onStatusChange={setSelectedStatusFilter} 
              />
              <UptimeTrendChart />
              <SlaTiersCard />
            </>
          )}

          {activeTab === 'error-budgets' && (
            <>
              <KpiStatsGrid 
                selectedStatus={selectedStatusFilter} 
                onSelectStatus={setSelectedStatusFilter} 
              />
              <ErrorBudgetCard />
              <SlaTiersCard />
            </>
          )}

          {activeTab === 'penalties' && (
            <>
              <SlaCreditCalculator />
              <SlaTiersCard />
            </>
          )}

          {activeTab === 'heatmap' && (
            <>
              <UptimeCalendarHeatmap />
              <UptimeTrendChart />
            </>
          )}

          {activeTab === 'services' && (
            <>
              <KpiStatsGrid />
              <ServiceHealthMatrix searchTerm={searchTerm} />
            </>
          )}

          {activeTab === 'tiers' && (
            <>
              <SlaTiersCard />
              <SlaCreditCalculator />
              <IncidentTracker />
            </>
          )}

          {activeTab === 'incidents' && (
            <>
              <IncidentTracker />
              <ErrorBudgetCard />
              <RegionalLatencyMap />
            </>
          )}

          {activeTab === 'latency' && (
            <>
              <RegionalLatencyMap />
              <UptimeTrendChart />
            </>
          )}

          {activeTab === 'visuals' && (
            <>
              <VisualShowcase />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Compliance Report Modal */}
      <ReportExportModal 
        isOpen={reportModalOpen} 
        onClose={() => setReportModalOpen(false)} 
      />
    </div>
  );
}
