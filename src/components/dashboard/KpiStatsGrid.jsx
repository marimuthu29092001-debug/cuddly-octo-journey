import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { SLA_SUMMARY_METRICS } from '../../data/slaData';

export default function KpiStatsGrid({ selectedStatus = 'all', onSelectStatus = () => {} }) {
  const iconMap = {
    ShieldCheck: ShieldCheck,
    Activity: Activity,
    AlertTriangle: AlertTriangle,
    CheckCircle2: CheckCircle2,
    Layers: Layers
  };

  return (
    <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
      {SLA_SUMMARY_METRICS.map((kpi) => {
        const IconComponent = iconMap[kpi.iconName] || ShieldCheck;
        const isSelected = selectedStatus === kpi.key || (kpi.key === 'total' && selectedStatus === 'all');

        return (
          <div 
            key={kpi.id} 
            className="sla-card kpi-interactive-card"
            onClick={() => onSelectStatus(kpi.key === 'total' ? 'all' : kpi.key)}
            style={{ 
              borderLeft: `4px solid ${kpi.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: isSelected ? `0 0 0 2px ${kpi.color}, 0 8px 24px ${kpi.color}22` : undefined,
              transform: isSelected ? 'translateY(-2px)' : undefined,
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            title={`Filter SLA records by ${kpi.label}`}
          >
            <div>
              {/* Header: Label, Status Indicator, and Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: kpi.color,
                    boxShadow: `0 0 8px ${kpi.color}`,
                    display: 'inline-block'
                  }}></span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.01em' }}>
                    {kpi.label}
                  </span>
                </div>

                <div style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '10px', 
                  background: kpi.bgColor, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: kpi.color,
                  border: `1px solid ${kpi.color}33`,
                  boxShadow: `0 0 12px ${kpi.color}20`
                }}>
                  <IconComponent size={19} />
                </div>
              </div>

              {/* Large Value */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <span style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  letterSpacing: '-0.03em', 
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1
                }}>
                  {kpi.value}
                </span>

                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 700, 
                  padding: '0.15rem 0.5rem', 
                  borderRadius: '9999px',
                  background: kpi.bgColor,
                  color: kpi.color,
                  border: `1px solid ${kpi.color}40`
                }}>
                  {kpi.statusLabel}
                </span>
              </div>

              {/* Subtext description */}
              <div style={{ fontSize: '0.78125rem', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
                {kpi.subtext}
              </div>

              {/* Progress Indicator Component inside Card */}
              <div style={{ marginTop: '0.65rem', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.71875rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Progress</span>
                  <span style={{ color: kpi.color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {kpi.progressLabel}
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '6px', 
                  backgroundColor: 'var(--border-light)', 
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ 
                    width: `${Math.min(100, Math.max(5, kpi.progress))}%`, 
                    height: '100%', 
                    backgroundColor: kpi.color,
                    background: `linear-gradient(90deg, ${kpi.color}aa, ${kpi.color})`,
                    borderRadius: '9999px',
                    transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: `0 0 8px ${kpi.color}66`
                  }}></div>
                </div>
              </div>
            </div>

            {/* Footer row: Trend & Filter hint */}
            <div style={{ 
              marginTop: '1rem', 
              paddingTop: '0.75rem', 
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem'
            }}>
              <span style={{ 
                color: kpi.changeType === 'positive' ? '#10b981' : kpi.changeType === 'danger' ? '#ef4444' : '#f59e0b',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                {kpi.changeType === 'positive' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {kpi.change}
              </span>
              <span style={{ 
                color: isSelected ? kpi.color : 'var(--text-muted)', 
                fontSize: '0.7rem',
                fontWeight: isSelected ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}>
                {isSelected ? 'Filtered' : 'Click to filter'}
                <ArrowUpRight size={11} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
