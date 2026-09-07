import React from 'react';
import { ShieldCheck, Activity, Wifi, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../../data/slaData';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-light)',
      background: 'var(--bg-surface)',
      backdropFilter: 'blur(12px)',
      padding: '1.5rem 2rem',
      fontSize: '0.8125rem',
      color: 'var(--text-muted)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          <ShieldCheck size={16} color="var(--brand-primary)" />
          <span>{COMPANY_INFO.name} Cloud SLA Command Center</span>
        </div>
        <span>&bull;</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="status-indicator-dot pulse" style={{ color: 'var(--status-healthy)' }}></span>
          <span>Live Pulse: Every 5s</span>
        </div>
        <span>&bull;</span>
        <span>Version: {COMPANY_INFO.version}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <span>Global Availability Target: <strong>99.900%</strong></span>
        <span>&bull;</span>
        <span style={{ color: 'var(--status-healthy)', fontWeight: 600 }}>Zero Active Penalties</span>
        <span>&bull;</span>
        <span>&copy; {new Date().getFullYear()} Stackly Technologies Inc. All rights reserved.</span>
      </div>
    </footer>
  );
}
