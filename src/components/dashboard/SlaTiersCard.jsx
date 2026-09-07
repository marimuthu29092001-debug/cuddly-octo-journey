import React from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  AlertCircle, 
  DollarSign, 
  Users, 
  Clock, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { SLA_TIERS, COMPANY_INFO } from '../../data/slaData';

export default function SlaTiersCard() {
  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header">
        <div>
          <div className="sla-card-title">
            <FileCheck size={20} color="#2563eb" />
            <span>SLA Contracts & Performance Tier Commitments</span>
            <span className="status-pill healthy" style={{ marginLeft: '0.5rem' }}>
              100% Contract Compliance
            </span>
          </div>
          <div className="sla-card-subtitle">
            Legally-binding service level agreements, max permissible downtime, and penalty risk metrics.
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          padding: '0.35rem 0.75rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#065f46'
        }}>
          <DollarSign size={15} />
          <span>Penalties Avoided: {COMPANY_INFO.penaltiesAvoided}</span>
        </div>
      </div>

      {/* 4 Tiers Grid */}
      <div className="grid-4">
        {SLA_TIERS.map((tier) => {
          return (
            <div 
              key={tier.tier}
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    background: `${tier.badgeColor}22`,
                    color: tier.badgeColor,
                    border: `1px solid ${tier.badgeColor}44`
                  }}>
                    {tier.tier}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={12} />
                    {tier.clientCount} clients
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                    {tier.current}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    / {tier.target} SLA
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--status-healthy)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                  <CheckCircle2 size={13} />
                  <span>SLA Guarantee Satisfied</span>
                </div>

                {/* Downtime Budget */}
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-light)', marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    <span>Downtime Used</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tier.actualDowntimeMonth}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>Max Allowed Budget</span>
                    <span style={{ fontWeight: 600 }}>{tier.maxDowntimeMonth}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {tier.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ color: 'var(--brand-primary)' }}>&bull;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                marginTop: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-light)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)'
              }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Credit Clause: </span>
                {tier.creditGuarantee}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
