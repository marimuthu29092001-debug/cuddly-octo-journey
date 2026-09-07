import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  ShieldCheck, 
  AlertOctagon, 
  RefreshCcw, 
  Layers, 
  Info,
  TrendingUp,
  Percent
} from 'lucide-react';
import { SLA_PENALTY_DATA } from '../../data/slaData';

export default function SlaCreditCalculator() {
  const [simulatedDowntimeMins, setSimulatedDowntimeMins] = useState(0);
  const [selectedSimTier, setSelectedSimTier] = useState('platinum');

  // Calculate simulated monthly uptime % based on 43,200 total monthly minutes
  const totalMonthlyMins = 43200;
  const calculatedUptime = Math.max(0, ((totalMonthlyMins - simulatedDowntimeMins) / totalMonthlyMins) * 100);

  // Determine applicable penalty percentage
  const getPenaltyPercentage = (uptime) => {
    if (uptime >= 99.90) return 0;
    if (uptime >= 99.50) return 10;
    if (uptime >= 99.00) return 25;
    return 50;
  };

  const currentPenaltyPct = getPenaltyPercentage(calculatedUptime);

  // Calculate financial liability
  const tierConfig = SLA_PENALTY_DATA.accountTiers[selectedSimTier];
  const monthlyRevenue = tierConfig.count * tierConfig.avgMonthlySpend;
  const estimatedRefundLiability = (monthlyRevenue * (currentPenaltyPct / 100));

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="sla-card-title">
            <Calculator size={20} color="var(--brand-primary)" />
            <span>Contractual SLA Penalty & Service Credit Liability Simulator</span>
          </h2>
          <p className="sla-card-subtitle">
            Enterprise financial risk model & automated service credit liability calculator for Q3 2026
          </p>
        </div>

        {/* Reset Simulator */}
        {simulatedDowntimeMins > 0 && (
          <button 
            type="button"
            className="btn-secondary"
            onClick={() => setSimulatedDowntimeMins(0)}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            <RefreshCcw size={12} />
            <span>Reset to Live Zero-Breach State</span>
          </button>
        )}
      </div>

      {/* Top 3 Live Financial KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Current Cycle Penalty Liability
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#00c6a7', letterSpacing: '-0.02em', margin: '0.25rem 0' }}>
            $0.00
          </div>
          <div style={{ fontSize: '0.75rem', color: '#00c6a7', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={14} />
            <span>100% Contractual Compliance Achieved</span>
          </div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Cumulative Penalties Protected
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0.25rem 0' }}>
            ${SLA_PENALTY_DATA.quarterlyPenaltiesProtected.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Preserved revenue via 24/7 proactive NOC triage
          </div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Contracted Credit Reserve Pool
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-primary)', letterSpacing: '-0.02em', margin: '0.25rem 0' }}>
            ${SLA_PENALTY_DATA.rebateReserveFund.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Liquid escrow allocated for SLA SLA guarantees
          </div>
        </div>
      </div>

      {/* Interactive Simulator Section */}
      <div style={{ 
        background: 'rgba(0, 198, 167, 0.04)', 
        border: '1px solid rgba(0, 198, 167, 0.25)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ Interactive Downtime What-If Simulator
            </span>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Slide hypothetical downtime duration to model financial refund exposure across enterprise contracts.
            </div>
          </div>

          {/* Tier Switcher for Simulator */}
          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
            {['platinum', 'gold', 'silver'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedSimTier(t)}
                style={{
                  background: selectedSimTier === t ? 'var(--brand-gradient)' : 'transparent',
                  color: selectedSimTier === t ? '#05141f' : 'var(--text-secondary)',
                  fontWeight: selectedSimTier === t ? 700 : 500,
                  fontSize: '0.72rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {t} ({SLA_PENALTY_DATA.accountTiers[t].count})
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>
            <span>Simulated Outage Duration: <strong style={{ color: simulatedDowntimeMins === 0 ? '#00c6a7' : '#f59e0b' }}>{simulatedDowntimeMins} Minutes</strong></span>
            <span>Monthly Uptime: <strong style={{ color: calculatedUptime >= 99.9 ? '#00c6a7' : '#ef4444' }}>{calculatedUptime.toFixed(3)}%</strong></span>
          </div>

          <input 
            type="range" 
            min="0" 
            max="120" 
            step="1"
            value={simulatedDowntimeMins}
            onChange={(e) => setSimulatedDowntimeMins(parseInt(e.target.value, 10))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              accentColor: '#00c6a7',
              cursor: 'pointer'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            <span>0m (Target: 99.99%)</span>
            <span>30m</span>
            <span>60m (1h Outage)</span>
            <span>90m</span>
            <span>120m (Critical Outage)</span>
          </div>
        </div>

        {/* Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SERVICE CREDIT CLAUSE</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: currentPenaltyPct === 0 ? '#00c6a7' : '#f59e0b', marginTop: '0.25rem' }}>
              {currentPenaltyPct}% Credit Rebate
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {currentPenaltyPct === 0 ? "Zero customer credits triggered" : `${currentPenaltyPct}% fee credit applied to billing invoice`}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ESTIMATED REFUND PAYOUT</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: estimatedRefundLiability === 0 ? '#00c6a7' : '#ef4444', marginTop: '0.25rem' }}>
              ${estimatedRefundLiability.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Across {tierConfig.count} {selectedSimTier} accounts
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>NET REVENUE IMPACT</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
              ${(monthlyRevenue - estimatedRefundLiability).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Retained monthly ARR margin
            </div>
          </div>
        </div>
      </div>

      {/* Contractual Tier Terms Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem', fontWeight: 600 }}>SLA Compliance Band</th>
              <th style={{ padding: '0.75rem', fontWeight: 600 }}>Monthly Uptime Range</th>
              <th style={{ padding: '0.75rem', fontWeight: 600 }}>Contractual Service Credit</th>
              <th style={{ padding: '0.75rem', fontWeight: 600 }}>Legal Remedy Terms</th>
            </tr>
          </thead>
          <tbody>
            {SLA_PENALTY_DATA.refundRules.map((rule) => {
              const isMatch = calculatedUptime >= rule.minUptime && calculatedUptime <= rule.maxUptime;
              return (
                <tr 
                  key={rule.status} 
                  style={{ 
                    borderBottom: '1px solid var(--border-subtle)',
                    background: isMatch ? 'rgba(0, 198, 167, 0.08)' : 'transparent',
                    transition: 'background 0.2s'
                  }}
                >
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: rule.color }}>
                    {isMatch && <span style={{ marginRight: '0.5rem' }}>👉</span>}
                    {rule.status}
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {rule.minUptime}% - {rule.maxUptime}%
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: rule.color }}>
                    {rule.rebatePercent}% Invoice Credit
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                    {rule.rebatePercent === 0 
                      ? "Full contractual satisfaction. Standard billing applied."
                      : `Automated credit voucher deposited into customer billing portal within 30 days.`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
