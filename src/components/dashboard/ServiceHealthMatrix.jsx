import React, { useState } from 'react';
import { 
  Server, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Clock, 
  Activity,
  Layers
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/slaData';

export default function ServiceHealthMatrix({ searchTerm = '' }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('uptime');
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = SERVICES_LIST.filter(srv => {
    const matchesSearch = srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          srv.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          srv.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ? true :
                          filterStatus === 'operational' ? srv.status === 'Operational' :
                          filterStatus === 'degraded' ? srv.status === 'Degraded' : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="sla-card-title">
            <Server size={20} color="#2563eb" />
            <span>Service-Level Performance & Uptime Matrix</span>
            <span className="status-pill neutral" style={{ marginLeft: '0.5rem' }}>
              {filteredServices.length} Monitored
            </span>
          </div>
          <div className="sla-card-subtitle">
            Granular per-service SLA targets, live request rates, response times, and 30-day historical availability.
          </div>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`role-chip ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            All Services ({SERVICES_LIST.length})
          </button>
          <button
            type="button"
            className={`role-chip ${filterStatus === 'operational' ? 'active' : ''}`}
            onClick={() => setFilterStatus('operational')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            Operational (7)
          </button>
          <button
            type="button"
            className={`role-chip ${filterStatus === 'degraded' ? 'active' : ''}`}
            onClick={() => setFilterStatus('degraded')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: filterStatus === 'degraded' ? '#ffffff' : '#b45309' }}
          >
            Degraded (1)
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="table-responsive-container" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.8125rem',
          minWidth: '760px'
        }}>
          <thead>
            <tr style={{
              borderBottom: '1px solid var(--border-light)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <th style={{ padding: '0.75rem 1rem' }}>Microservice</th>
              <th style={{ padding: '0.75rem 0.75rem' }}>SLA Tier</th>
              <th style={{ padding: '0.75rem 0.75rem' }}>Current Uptime</th>
              <th style={{ padding: '0.75rem 0.75rem' }}>Latency (Avg/p99)</th>
              <th style={{ padding: '0.75rem 0.75rem' }}>Throughput</th>
              <th style={{ padding: '0.75rem 0.75rem' }}>Error Rate</th>
              <th style={{ padding: '0.75rem 0.75rem' }}>30-Day Uptime Log</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => {
              const isDegraded = service.status === 'Degraded';

              return (
                <tr 
                  key={service.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 0.15s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => setSelectedService(service)}
                >
                  {/* Service Name & Type */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isDegraded ? '#fffbeb' : '#eff6ff',
                        color: isDegraded ? '#d97706' : '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Layers size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{service.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {service.type} &bull; {service.region}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Tier */}
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: service.tier.includes('Platinum') ? '#eef2ff' : service.tier.includes('Gold') ? '#fffbeb' : '#f1f5f9',
                      color: service.tier.includes('Platinum') ? '#4338ca' : service.tier.includes('Gold') ? '#b45309' : '#475569'
                    }}>
                      {service.tier}
                    </span>
                  </td>

                  {/* Uptime % */}
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <span style={{
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: isDegraded ? '#d97706' : '#059669',
                      fontSize: '0.875rem'
                    }}>
                      {service.uptime}
                    </span>
                  </td>

                  {/* Latency */}
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0f172a' }}>
                      {service.latency}
                      <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 400 }}> / {service.p99Latency}</span>
                    </div>
                  </td>

                  {/* Throughput */}
                  <td style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-mono)', color: '#475569' }}>
                    {service.requestsSec}
                  </td>

                  {/* Error Rate */}
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: isDegraded ? '#dc2626' : '#059669'
                    }}>
                      {service.errorRate}
                    </span>
                  </td>

                  {/* 30 Day Uptime Bars */}
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }} title="30-Day Historical Uptime Bars">
                      {service.history.map((val, idx) => (
                        <span
                          key={idx}
                          style={{
                            width: '4px',
                            height: '16px',
                            borderRadius: '1px',
                            backgroundColor: val === 1 ? '#10b981' : val > 0.8 ? '#f59e0b' : '#ef4444'
                          }}
                          title={`Day ${idx + 1}: ${(val * 100).toFixed(1)}% Uptime`}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <span className={`status-pill ${isDegraded ? 'warning' : 'healthy'}`}>
                      <span className={`status-indicator-dot ${isDegraded ? 'pulse' : ''}`}></span>
                      {service.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Service Detail Drawer / Modal */}
      {selectedService && (
        <div 
          onClick={() => setSelectedService(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 90,
            padding: '1.5rem'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '560px',
              width: '100%',
              background: 'var(--bg-surface-elevated)',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-xl)',
              padding: '1.75rem',
              border: '1px solid var(--border-light)',
              backdropFilter: 'blur(16px)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                  SERVICE DIAGNOSTIC TELEMETRY
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedService.name}
                </h3>
              </div>
              <span className={`status-pill ${selectedService.status === 'Operational' ? 'healthy' : 'warning'}`}>
                {selectedService.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target SLA Guarantee</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedService.tier}</div>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Observed Availability</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--status-healthy)', fontFamily: 'var(--font-sans)' }}>
                  {selectedService.uptime}
                </div>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>p99 Latency SLA Cap</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                  {selectedService.p99Latency}
                </div>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Live Load Throughput</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                  {selectedService.requestsSec}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
                Recent Incident / Reliability Event:
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                {selectedService.lastIncident}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setSelectedService(null)}>
                Close
              </button>
              <button className="btn-primary" onClick={() => { alert(`Triggered diagnostic probe for ${selectedService.name}. Synthetic latency test passed with 0 packet drops.`); }}>
                Run Diagnostic Probe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
