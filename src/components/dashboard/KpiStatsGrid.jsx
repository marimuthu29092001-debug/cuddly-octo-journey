import React from 'react';
import { 
  ShieldCheck, 
  Server, 
  Timer, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { KPI_METRICS } from '../../data/slaData';

export default function KpiStatsGrid() {
  const iconMap = {
    ShieldCheck: ShieldCheck,
    Server: Server,
    Timer: Timer,
    AlertTriangle: AlertTriangle
  };

  return (
    <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
      {KPI_METRICS.map((kpi) => {
        const IconComponent = iconMap[kpi.iconName] || ShieldCheck;

        return (
          <div 
            key={kpi.id} 
            className="sla-card"
            style={{ 
              borderLeft: `4px solid ${kpi.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {kpi.label}
                </span>
                <div style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '10px', 
                  background: `${kpi.color}1f`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: kpi.color,
                  border: `1px solid ${kpi.color}4d`,
                  boxShadow: `0 0 12px ${kpi.color}25`
                }}>
                  <IconComponent size={19} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: 800, 
                  letterSpacing: '-0.02em', 
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)'
                }}>
                  {kpi.value}
                </span>
              </div>

              <div style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>
                {kpi.subtext}
              </div>
            </div>

            <div style={{ 
              marginTop: '1.125rem', 
              paddingTop: '0.75rem', 
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem'
            }}>
              <span style={{ 
                color: kpi.changeType === 'positive' ? '#00c6a7' : kpi.changeType === 'warning' ? '#f59e0b' : 'var(--text-secondary)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                textShadow: kpi.changeType === 'positive' ? '0 0 8px rgba(0,198,167,0.4)' : 'none'
              }}>
                {kpi.changeType === 'positive' ? <TrendingUp size={14} /> : null}
                {kpi.change}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Real-time</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
