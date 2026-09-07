import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { UPTIME_CALENDAR_DATA } from '../../data/slaData';

export default function UptimeCalendarHeatmap() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [filterMode, setFilterMode] = useState('all');

  const optimalCount = UPTIME_CALENDAR_DATA.filter(d => d.status === 'Optimal').length;
  const degradedCount = UPTIME_CALENDAR_DATA.filter(d => d.status === 'Degraded').length;

  const filteredDays = UPTIME_CALENDAR_DATA.filter(d => {
    if (filterMode === 'degraded') return d.status === 'Degraded';
    if (filterMode === 'optimal') return d.status === 'Optimal';
    return true;
  });

  const getBlockColor = (day) => {
    if (day.status === 'Degraded') return '#f59e0b';
    if (day.uptime === 100) return '#00c6a7';
    return '#06b6d4';
  };

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="sla-card-title">
            <Calendar size={20} color="var(--brand-primary)" />
            <span>90-Day Enterprise SLA Compliance Calendar Heatmap</span>
          </h2>
          <p className="sla-card-subtitle">
            Daily historical uptime verification records across all global datacenter nodes for Q3 2026
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            style={{
              background: filterMode === 'all' ? 'var(--brand-gradient)' : 'transparent',
              color: filterMode === 'all' ? '#05141f' : 'var(--text-secondary)',
              fontWeight: filterMode === 'all' ? 700 : 500,
              fontSize: '0.72rem',
              padding: '0.3rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            All 90 Days ({UPTIME_CALENDAR_DATA.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('optimal')}
            style={{
              background: filterMode === 'optimal' ? 'var(--brand-gradient)' : 'transparent',
              color: filterMode === 'optimal' ? '#05141f' : 'var(--text-secondary)',
              fontWeight: filterMode === 'optimal' ? 700 : 500,
              fontSize: '0.72rem',
              padding: '0.3rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            100% SLA ({optimalCount})
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('degraded')}
            style={{
              background: filterMode === 'degraded' ? 'var(--brand-gradient)' : 'transparent',
              color: filterMode === 'degraded' ? '#05141f' : 'var(--text-secondary)',
              fontWeight: filterMode === 'degraded' ? 700 : 500,
              fontSize: '0.72rem',
              padding: '0.3rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Degraded ({degradedCount})
          </button>
        </div>
      </div>

      {/* 90-Day Blocks Heatmap Grid */}
      <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          <span>90 Days Ago ({UPTIME_CALENDAR_DATA[0]?.date})</span>
          <span>Today ({UPTIME_CALENDAR_DATA[UPTIME_CALENDAR_DATA.length - 1]?.date})</span>
        </div>

        {/* Heatmap Matrix Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(11px, 1fr))', 
          gap: '4px',
          alignItems: 'center'
        }}>
          {UPTIME_CALENDAR_DATA.map((day) => {
            const isSelected = selectedDay && selectedDay.date === day.date;
            const isFaded = filterMode !== 'all' && filterMode !== day.status.toLowerCase();

            return (
              <button
                key={day.date}
                type="button"
                onClick={() => setSelectedDay(day)}
                title={`${day.date}: ${day.uptime}% uptime - ${day.note}`}
                style={{
                  height: '24px',
                  borderRadius: '4px',
                  background: getBlockColor(day),
                  border: isSelected ? '2px solid #ffffff' : '1px solid rgba(0, 0, 0, 0.2)',
                  boxShadow: isSelected ? '0 0 10px #00c6a7' : 'none',
                  cursor: 'pointer',
                  opacity: isFaded ? 0.15 : 1,
                  transition: 'all 0.15s ease',
                  padding: 0
                }}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#00c6a7' }}></span>
            <span>100% Optimal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#06b6d4' }}></span>
            <span>99.98% Compliant</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f59e0b' }}></span>
            <span>Degraded Incident</span>
          </div>
        </div>
      </div>

      {/* Selected Day Inspector / Default Summary */}
      {selectedDay ? (
        <div style={{ 
          background: 'rgba(0, 198, 167, 0.08)', 
          border: '1px solid rgba(0, 198, 167, 0.35)', 
          borderRadius: 'var(--radius-md)', 
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00c6a7', textTransform: 'uppercase' }}>
                DAY AUDIT INSPECTOR &bull; {selectedDay.date}
              </span>
              <span className={`status-pill ${selectedDay.status === 'Optimal' ? 'healthy' : 'warning'}`} style={{ fontSize: '0.6875rem' }}>
                {selectedDay.status}
              </span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: '0.25rem 0' }}>
              {selectedDay.uptime}% SLA Recorded ({selectedDay.downtimeMins}m downtime)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {selectedDay.note}
            </div>
          </div>

          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => setSelectedDay(null)}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            Clear Selection
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-subtle)', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>QUARTERLY COMPLIANCE</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#00c6a7', marginTop: '2px' }}>99.982%</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Contract Cap: 99.900%</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ZERO-INCIDENT DAYS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>88 of 90 Days</div>
            <div style={{ fontSize: '0.72rem', color: '#00c6a7' }}>97.7% Flawless Telemetry</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TOTAL QUARTER DOWNTIME</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#00c6a7', marginTop: '2px' }}>7m 12s</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Allowed Cap: 43m 49s</div>
          </div>
        </div>
      )}
    </div>
  );
}
