import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Wifi, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  Server,
  Zap
} from 'lucide-react';
import { REGIONAL_DATA } from '../../data/slaData';

export default function RegionalLatencyMap() {
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState('');

  const handleTestPings = () => {
    setIsPinging(true);
    setPingResult('');
    setTimeout(() => {
      setIsPinging(false);
      setPingResult('Global edge synthetic probe completed: 340 PoPs verified. 100% routes operational.');
    }, 1000);
  };

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header">
        <div>
          <div className="sla-card-title">
            <Globe size={20} color="#2563eb" />
            <span>Global Edge Nodes & Regional SLA Latency</span>
            <span className="status-pill healthy" style={{ marginLeft: '0.5rem' }}>
              340+ Edge PoPs
            </span>
          </div>
          <div className="sla-card-subtitle">
            Sub-millisecond packet latency monitoring across five continental edge distribution hubs.
          </div>
        </div>

        <button 
          className="btn-secondary" 
          onClick={handleTestPings}
          disabled={isPinging}
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
        >
          <RefreshCw size={13} className={isPinging ? 'spin-anim' : ''} />
          <span>{isPinging ? 'Pinging PoPs...' : 'Probe Edge Network'}</span>
        </button>
      </div>

      {pingResult && (
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
          <span>{pingResult}</span>
        </div>
      )}

      {/* Regions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
        {REGIONAL_DATA.map((reg) => {
          const isWarning = reg.status === 'Investigating';

          return (
            <div 
              key={reg.region}
              style={{
                background: 'var(--bg-subtle)',
                border: isWarning ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '1.125rem',
                boxShadow: isWarning ? '0 2px 12px rgba(245, 158, 11, 0.12)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color={isWarning ? '#f59e0b' : 'var(--brand-primary)'} />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                    {reg.region}
                  </span>
                </div>
                <span className={`status-pill ${isWarning ? 'warning' : 'healthy'}`} style={{ fontSize: '0.7rem' }}>
                  {reg.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>SLA Uptime</div>
                  <div style={{ fontWeight: 800, color: isWarning ? '#f59e0b' : 'var(--status-healthy)', fontFamily: 'var(--font-sans)' }}>
                    {reg.uptime}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Edge Ping</div>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                    {reg.latency}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Nodes</div>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                    {reg.nodes}
                  </div>
                </div>
              </div>

              {/* Latency Meter */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                  <span>Latency Health Bar</span>
                  <span>Target &lt; 50ms</span>
                </div>
                <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div 
                    style={{
                      height: '100%',
                      width: `${Math.min(100, (parseInt(reg.latency) / 80) * 100)}%`,
                      background: isWarning ? '#f59e0b' : '#10b981',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
