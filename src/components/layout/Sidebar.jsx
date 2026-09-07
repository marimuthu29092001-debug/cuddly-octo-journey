import React from 'react';
import { 
  LayoutDashboard, 
  Server, 
  FileCheck, 
  AlertOctagon, 
  Globe, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Gauge,
  Calculator,
  Calendar
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/slaData';
import './Sidebar.css';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  mobileSidebarOpen, 
  setMobileSidebarOpen 
}) {
  const navItems = [
    { id: 'overview', label: 'SLA Command Center', icon: LayoutDashboard },
    { id: 'records', label: 'SLA Data Table & Records', icon: FileText, badge: '1,248', badgeType: 'count' },
    { id: 'error-budgets', label: 'Error Budget & Burn Rate', icon: Gauge, badge: 'SRE Live', badgeType: 'warning' },
    { id: 'penalties', label: 'Credit & Penalty Simulator', icon: Calculator, badge: '$0 Breach', badgeType: 'count' },
    { id: 'heatmap', label: '90-Day Uptime Calendar', icon: Calendar, badge: '90 Days', badgeType: 'count' },
    { id: 'services', label: 'Microservices & Nodes', icon: Server, badge: '10 Core', badgeType: 'count' },
    { id: 'tiers', label: 'SLA Contracts & Tiers', icon: FileCheck },
    { id: 'incidents', label: 'Incident & Breach Log', icon: AlertOctagon, badge: '1 Mitigating', badgeType: 'warning' },
    { id: 'latency', label: 'Global Edge Latency', icon: Globe },
    { id: 'visuals', label: 'Infrastructure Showcase', icon: Layers, badge: '5 Visuals', badgeType: 'count' },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="mobile-sidebar-backdrop" 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside className={`sla-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Top Brand Logo - Official Dual-Swoosh Stackly Asset */}
        <div className="sidebar-brand-header" style={{ padding: '0.875rem 1rem' }}>
          <StacklyLogo height={28} variant="white" showBadge={true} />
        </div>

        <div className="sidebar-nav-container">
          <div>
            <div className="sidebar-section-label">Reliability Telemetry</div>
            <ul className="sidebar-nav-list">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelect(item.id)}
                      style={{ width: '100%' }}
                    >
                      <IconComponent size={18} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`sidebar-item-badge ${item.badgeType}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="sidebar-section-label">Compliance & Legal</div>
            <ul className="sidebar-nav-list">
              <li>
                <button
                  type="button"
                  className="sidebar-nav-item"
                  onClick={() => alert("Stackly ISO 27001 & SOC-2 Type II audit certificate is active through 2027. SLA compliance guarantees are legally binding under Master Service Agreements.")}
                  style={{ width: '100%' }}
                >
                  <FileText size={18} />
                  <span>Audit Certificates</span>
                  <ExternalLink size={13} style={{ marginLeft: 'auto', color: '#94a3b8' }} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom SLA Widget */}
        <div className="sidebar-footer-widget">
          <div className="sidebar-sla-stat-row">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
              Quarterly SLA Uptime
            </span>
            <span className="sidebar-sla-score">99.982%</span>
          </div>

          <div className="sidebar-progress-bar-bg">
            <div 
              className="sidebar-progress-bar-fill" 
              style={{ width: '99.9%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748b' }}>
            <span>Target: 99.90%</span>
            <span style={{ color: '#059669', fontWeight: 600 }}>+0.082% Margin</span>
          </div>

          <div className="sidebar-cert-row">
            <ShieldCheck size={14} color="#10b981" />
            <span>SOC2 Type II &bull; ISO 27001</span>
          </div>
        </div>
      </aside>
    </>
  );
}
