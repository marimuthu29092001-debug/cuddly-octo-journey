import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  User, 
  ArrowRight, 
  MessageSquare,
  Zap,
  Activity
} from 'lucide-react';
import { ACTIVE_INCIDENTS } from '../../data/slaData';

export default function IncidentTracker() {
  const [incidents, setIncidents] = useState(ACTIVE_INCIDENTS);
  const [actionSuccess, setActionSuccess] = useState('');

  const handleMitigate = (id) => {
    setActionSuccess(`Automated runbook executed for incident ${id}. Traffic rerouted, latency normalizing.`);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header">
        <div>
          <div className="sla-card-title">
            <AlertTriangle size={20} color="#f59e0b" />
            <span>Active Incidents & SLA Breach Countdown</span>
            <span className="status-pill warning" style={{ marginLeft: '0.5rem' }}>
              1 Warning Active
            </span>
          </div>
          <div className="sla-card-subtitle">
            Real-time incident response telemetry, MTTR countdown timers, and mitigation updates.
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.8125rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {incidents.map((inc) => {
          const isResolved = inc.status === 'Resolved';

          return (
            <div 
              key={inc.id}
              style={{
                background: isResolved ? 'var(--bg-subtle)' : 'rgba(245, 158, 11, 0.05)',
                border: isResolved ? '1px solid var(--border-light)' : '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '14px',
                padding: '1.25rem',
                boxShadow: isResolved ? 'none' : '0 4px 16px rgba(245, 158, 11, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    background: isResolved ? 'var(--bg-muted)' : 'rgba(245, 158, 11, 0.15)',
                    color: isResolved ? 'var(--text-secondary)' : '#f59e0b',
                    border: `1px solid ${isResolved ? 'var(--border-light)' : 'rgba(245, 158, 11, 0.35)'}`
                  }}>
                    {inc.severity}
                  </span>

                  <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                    {inc.id}: {inc.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    background: isResolved ? 'var(--status-healthy-bg)' : 'rgba(245, 158, 11, 0.12)',
                    border: `1px solid ${isResolved ? 'var(--status-healthy-border)' : 'rgba(245, 158, 11, 0.35)'}`,
                    padding: '0.3rem 0.625rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isResolved ? 'var(--status-healthy)' : '#f59e0b'
                  }}>
                    <Clock size={13} />
                    <span>Breach Window: {inc.timeToBreach}</span>
                  </div>

                  <span className={`status-pill ${isResolved ? 'healthy' : 'warning'}`}>
                    <span className={`status-indicator-dot ${!isResolved ? 'pulse' : ''}`}></span>
                    {inc.status}
                  </span>
                </div>
              </div>

              {/* Service & Engineer Meta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: '0.875rem',
                flexWrap: 'wrap'
              }}>
                <div><strong>Service:</strong> <span style={{ color: 'var(--text-secondary)' }}>{inc.service}</span></div>
                <div><strong>Started:</strong> <span style={{ color: 'var(--text-secondary)' }}>{inc.startedAt}</span></div>
                <div><strong>SLA Cap:</strong> <span style={{ color: 'var(--text-secondary)' }}>{inc.slaWindow}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <User size={13} />
                  <span><strong>Lead:</strong> <span style={{ color: 'var(--text-secondary)' }}>{inc.leadEngineer}</span></span>
                </div>
              </div>

              {/* Live Incident Mitigation Updates */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                {inc.updates.map((update, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>&rsaquo;</span>
                    <span>{update}</span>
                  </div>
                ))}
              </div>

              {!isResolved && (
                <div style={{
                  marginTop: '0.875rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.625rem'
                }}>
                  <button 
                    className="btn-secondary"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                    onClick={() => alert(`Joined Slack War Room for ${inc.id} with Sarah Chen.`)}
                  >
                    <MessageSquare size={13} />
                    <span>Join SRE War Room</span>
                  </button>
                  <button 
                    className="btn-primary"
                    style={{ padding: '0.4rem 0.875rem', fontSize: '0.75rem' }}
                    onClick={() => handleMitigate(inc.id)}
                  >
                    <Zap size={13} />
                    <span>Execute Mitigation Script</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
