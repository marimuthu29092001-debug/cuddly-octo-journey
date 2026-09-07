import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  ChevronDown, 
  LogOut, 
  Menu, 
  X, 
  Download, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Sparkles,
  User,
  Settings
} from 'lucide-react';
import { COMPANY_INFO, ACTIVE_INCIDENTS } from '../../data/slaData';
import './Navbar.css';

export default function Navbar({ 
  currentUser, 
  onLogout, 
  onOpenReportModal, 
  timeRange, 
  setTimeRange, 
  searchTerm, 
  setSearchTerm,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  theme,
  setTheme
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sla-navbar">
      {/* Left Area: Mobile/Desktop Hamburger + Dashboard Title (Playfair Display) */}
      <div className="navbar-left">
        <button 
          className="navbar-hamburger-btn" 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <h1 className="navbar-page-title">Dashboard</h1>

        <div className="navbar-status-indicator hide-on-tablet">
          <span className="status-indicator-dot pulse"></span>
          <span>99.98% Compliant (All SLA Targets Met)</span>
        </div>
      </div>

      {/* Center Area: Quick Search */}
      <div className="navbar-center">
        <div className="navbar-search-box">
          <Search size={15} className="navbar-search-icon" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search microservices, SLA contracts, incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Right Area: Theme Selector, Time Filter, Export CTA, Notifications, Profile, Logout */}
      <div className="navbar-right">
        {/* Dedicated Dark Theme Indicator Pill (Only Dark Mode as requested) */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: '9999px',
            padding: '0.38rem 0.95rem',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
          }}
          title="Exclusive High-Contrast Dark Theme"
        >
          <span style={{ fontSize: '0.95rem' }}>🌙</span>
          <span style={{ letterSpacing: '0.02em' }}>Dark</span>
        </div>

        {/* Time Period Filter */}
        <div className="time-range-select-wrapper">
          <select 
            className="time-range-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="q3">Current Quarter (Q3 2026)</option>
          </select>
          <ChevronDown size={14} className="time-range-chevron" />
        </div>

        {/* Generate Report Button */}
        <button 
          className="btn-primary" 
          onClick={onOpenReportModal}
          style={{ padding: '0.45rem 0.875rem', fontSize: '0.8125rem' }}
          title="Download compliance report"
        >
          <Download size={14} />
          <span className="hide-on-mobile">Export SLA Report</span>
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            className="notification-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View SLA Notifications"
          >
            <Bell size={18} />
            <span className="notification-badge">1</span>
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notification-dropdown-header">
                <span>Active SLA Telemetry Alerts</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>1 Action Required</span>
              </div>
              
              <div className="notification-item">
                <AlertTriangle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                    P2 Warning: WebSocket Saturation
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                    AP-South-1 node at 88% capacity. 26 mins remaining before SLA breach threshold.
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#f59e0b', marginTop: '4px', fontWeight: 600 }}>
                    Auto-scaling active • SRE Assigned
                  </div>
                </div>
              </div>

              <div className="notification-item">
                <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                    SLA Milestone: Platinum Tier 99.994%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                    August billing cycle closed with 100% compliance. Zero SLA credits payable.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        {/* User Profile & Dropdown Menu matching user request screenshot */}
        <div style={{ position: 'relative' }}>
          <button 
            type="button"
            className="user-profile-badge" 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            title="User Profile & Account Settings"
            style={{ cursor: 'pointer', border: '1px solid var(--border-light)', background: 'var(--bg-surface)' }}
          >
            <div className="user-avatar-circle">
              {currentUser?.avatar || 'SA'}
            </div>
            <div className="user-text-info">
              <span className="user-display-name">{currentUser?.name || 'Super Admin'}</span>
              <span className="user-role-label">{currentUser?.role || 'Super Admin'}</span>
            </div>
            <ChevronDown 
              size={14} 
              style={{ 
                marginLeft: '2px', 
                color: 'var(--text-muted)',
                transform: profileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} 
            />
          </button>

          {profileDropdownOpen && (
            <>
              {/* Backdrop */}
              <div 
                style={{ position: 'fixed', inset: 0, zIndex: 89 }} 
                onClick={() => setProfileDropdownOpen(false)} 
              />

              {/* Dropdown Card */}
              <div className="profile-dropdown-menu">
                {/* Header (Super Admin / admin@stackly.com) */}
                <div className="profile-dropdown-header">
                  <div className="profile-dropdown-name">
                    {currentUser?.name || 'Super Admin'}
                  </div>
                  <div className="profile-dropdown-email">
                    {currentUser?.email || 'admin@stackly.com'}
                  </div>
                </div>

                {/* Items */}
                <div className="profile-dropdown-body">
                  <button 
                    type="button" 
                    className="profile-dropdown-item"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      alert(`User Profile\n\nName: ${currentUser?.name || 'Super Admin'}\nEmail: ${currentUser?.email || 'admin@stackly.com'}\nRole: ${currentUser?.role || 'Super Admin'}\nSecurity: SOC-2 Type II Certified, 2FA Active`);
                    }}
                  >
                    <User size={19} color="#6366f1" strokeWidth={2.2} />
                    <span>My Profile</span>
                  </button>

                  <button 
                    type="button" 
                    className="profile-dropdown-item"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      alert('Settings\n\n• Audio alerts: Enabled\n• SLA Warning threshold: 30 mins\n• Slack war room auto-generation: Active');
                    }}
                  >
                    <Settings size={19} color="#8b5cf6" strokeWidth={2.2} />
                    <span>Settings</span>
                  </button>
                </div>

                {/* Separator */}
                <div className="profile-dropdown-divider" />

                {/* Logout Button */}
                <div className="profile-dropdown-footer">
                  <button 
                    type="button" 
                    className="profile-dropdown-item logout-action"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                  >
                    <LogOut size={19} color="#ef4444" strokeWidth={2.2} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
