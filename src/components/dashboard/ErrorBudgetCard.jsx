import React, { useState } from 'react';
import { 
  Gauge, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  Clock, 
  Zap, 
  ShieldAlert, 
  ArrowUpRight,
  Sliders
} from 'lucide-react';
import { ERROR_BUDGET_METRICS } from '../../data/slaData';

export default function ErrorBudgetCard() {
  const [selectedTierIdx, setSelectedTierIdx] = useState(0);
  const activeTier = ERROR_BUDGET_METRICS.tiers[selectedTierIdx];

  // Helper to determine color based on remaining budget %
  const getBudgetColor = (pct) => {
    if (pct > 60) return '#00c6a7';
    if (pct > 30) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="sla-card-title">
            <Gauge size={20} color="var(--brand-primary)" />
            <span>Google SRE Error Budget & Burn Rate Monitor</span>
          </h2>
          <p className="sla-card-subtitle">
            30-day rolling error allowance before contractual SLA breach penalty triggers &bull; {ERROR_BUDGET_METRICS.daysRemainingInPeriod} days remaining in current cycle
          </p>
        </div>

        {/* Tier Selector Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
          {ERROR_BUDGET_METRICS.tiers.map((t, idx) => (
            <button
              key={t.tierName}
              type="button"
              onClick={() => setSelectedTierIdx(idx)}
              style={{
                background: idx === selectedTierIdx ? 'var(--brand-gradient)' : 'transparent',
                color: idx === selectedTierIdx ? '#05141f' : 'var(--text-secondary)',
                fontWeight: idx === selectedTierIdx ? 700 : 500,
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {t.tierName.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column Error Budget Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Metric 1: Budget Gauge & Remaining */}
        <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Error Budget Remaining
            </span>
            <span 
              className="status-pill" 
              style={{ 
                background: activeTier.percentageRemaining > 50 ? 'rgba(0,198,167,0.15)' : 'rgba(245,158,11,0.15)',
                color: activeTier.percentageRemaining > 50 ? '#00c6a7' : '#f59e0b',
                border: `1px solid ${activeTier.percentageRemaining > 50 ? 'rgba(0,198,167,0.35)' : 'rgba(245,158,11,0.35)'}`
              }}
            >
              {activeTier.percentageRemaining.toFixed(1)}% Available
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
            <span style={{ fontSize: '2.1rem', fontWeight: 800, color: getBudgetColor(activeTier.percentageRemaining), fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}>
              {activeTier.remainingFormatted}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              of {activeTier.allowedDowntimeFormatted} cap
            </span>
          </div>

          {/* Dual Bar (Consumed vs Remaining) */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden', margin: '0.75rem 0', display: 'flex' }}>
            <div 
              style={{ 
                width: `${100 - activeTier.percentageRemaining}%`, 
                background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                borderRadius: '9999px'
              }} 
              title={`Consumed: ${activeTier.consumedFormatted}`}
            />
            <div 
              style={{ 
                width: `${activeTier.percentageRemaining}%`, 
                background: 'linear-gradient(90deg, #00c6a7, #06b6d4)',
                borderRadius: '9999px'
              }} 
              title={`Remaining: ${activeTier.remainingFormatted}`}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Consumed: <strong style={{ color: '#ef4444' }}>{activeTier.consumedFormatted}</strong></span>
            <span>Unused: <strong style={{ color: '#00c6a7' }}>{activeTier.remainingFormatted}</strong></span>
          </div>
        </div>

        {/* Metric 2: Burn Rate Multiplier */}
        <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Hourly Burn Rate Multiplier
            </span>
            <span className="status-pill healthy" style={{ fontSize: '0.7rem' }}>
              {activeTier.burnStatus}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
            <span style={{ fontSize: '2.1rem', fontWeight: 800, color: activeTier.burnRateMultiplier <= 1.2 ? '#00c6a7' : '#f59e0b', fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}>
              {activeTier.burnRateMultiplier}x
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              vs 1.0x baseline target
            </span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0.5rem 0' }}>
            {activeTier.burnRateMultiplier <= 1.2 
              ? "At current consumption, budget will safely sustain beyond cycle window."
              : "Moderate burn rate detected. Sustained rate will exhaust budget in " + activeTier.estimatedDaysToExhaustion + " days."}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
            <Clock size={13} color="var(--brand-primary)" />
            <span>Time to Exhaustion: <strong>~{activeTier.estimatedDaysToExhaustion} Days</strong></span>
          </div>
        </div>

        {/* Metric 3: Contract Tier Breach Protection */}
        <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Contractual SLA Guarantee
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 700 }}>
              {activeTier.slaTarget}% Target
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
            <span style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}>
              {activeTier.serviceCount}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Active Enterprise Clients
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#00c6a7', margin: '0.5rem 0' }}>
            <CheckCircle2 size={15} />
            <span>Zero contract SLA violations recorded this cycle</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
            <span>Breach Penalty Clause:</span>
            <strong style={{ color: 'var(--text-primary)' }}>30% Credit Rebate</strong>
          </div>
        </div>
      </div>

      {/* SRE Alert Banner */}
      {ERROR_BUDGET_METRICS.highBurnAlerts.length > 0 && (
        <div style={{ 
          background: 'rgba(245, 158, 11, 0.08)', 
          border: '1px solid rgba(245, 158, 11, 0.3)', 
          borderRadius: 'var(--radius-md)', 
          padding: '0.875rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>
                Elevated Error Budget Consumption: {ERROR_BUDGET_METRICS.highBurnAlerts[0].service}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {ERROR_BUDGET_METRICS.highBurnAlerts[0].reason} &bull; Burn Rate: <strong style={{ color: '#f59e0b' }}>{ERROR_BUDGET_METRICS.highBurnAlerts[0].currentBurn}</strong>
              </div>
            </div>
          </div>

          <button 
            type="button"
            className="btn-secondary"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}
            onClick={() => alert("Automated circuit breaker drain initiated for socket cluster.")}
          >
            <Zap size={13} color="#f59e0b" />
            <span>Apply SRE Mitigation</span>
          </button>
        </div>
      )}
    </div>
  );
}
