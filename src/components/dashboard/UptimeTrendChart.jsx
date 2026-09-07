import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Clock, 
  Info, 
  Sliders, 
  CheckCircle, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { HOURLY_PERFORMANCE } from '../../data/slaData';

export default function UptimeTrendChart() {
  const [activeMetric, setActiveMetric] = useState('uptime'); // 'uptime' or 'latency'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG dimensions
  const svgWidth = 720;
  const svgHeight = 220;
  const paddingX = 45;
  const paddingY = 30;

  // Min / Max calculations
  const dataPoints = HOURLY_PERFORMANCE;
  const minUptime = 99.94;
  const maxUptime = 100.00;
  const slaThreshold = 99.95; // Contract SLA minimum

  const minLatency = 10;
  const maxLatency = 50;

  // Calculate coordinates
  const points = dataPoints.map((d, index) => {
    const x = paddingX + (index / (dataPoints.length - 1)) * (svgWidth - paddingX * 2);
    
    let y = 0;
    if (activeMetric === 'uptime') {
      // Scale between minUptime (bottom) and maxUptime (top)
      const ratio = (d.uptime - minUptime) / (maxUptime - minUptime);
      y = (svgHeight - paddingY) - ratio * (svgHeight - paddingY * 2);
    } else {
      // Latency: higher latency is higher on graph
      const ratio = (d.latency - minLatency) / (maxLatency - minLatency);
      y = (svgHeight - paddingY) - ratio * (svgHeight - paddingY * 2);
    }

    return { x, y, data: d };
  });

  // Generate SVG path string
  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  // Fill area under curve
  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`;

  // SLA baseline line (99.95%)
  const thresholdRatio = (slaThreshold - minUptime) / (maxUptime - minUptime);
  const thresholdY = (svgHeight - paddingY) - thresholdRatio * (svgHeight - paddingY * 2);

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem' }}>
      <div className="sla-card-header">
        <div>
          <div className="sla-card-title">
            <Activity size={20} color="var(--brand-primary)" />
            <span>Real-time SLA Performance & Latency Trend</span>
            <span className="status-pill healthy" style={{ marginLeft: '0.5rem' }}>
              Compliant (+0.032%)
            </span>
          </div>
          <div className="sla-card-subtitle">
            Continuous synthetic probes and edge telemetry across all 24 ingress gateways.
          </div>
        </div>

        {/* Metric Switcher & Range */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            display: 'flex',
            background: 'var(--bg-subtle)',
            padding: '0.25rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)'
          }}>
            <button
              type="button"
              onClick={() => setActiveMetric('uptime')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: activeMetric === 'uptime' ? 700 : 500,
                background: activeMetric === 'uptime' ? 'var(--brand-gradient)' : 'transparent',
                color: activeMetric === 'uptime' ? '#05141f' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Availability (%)
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('latency')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: activeMetric === 'latency' ? 700 : 500,
                background: activeMetric === 'latency' ? 'var(--brand-gradient)' : 'transparent',
                color: activeMetric === 'latency' ? '#05141f' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Response Latency (ms)
            </button>
          </div>
        </div>
      </div>

      {/* SVG Interactive Chart Container */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          style={{ width: '100%', height: 'auto', minWidth: '550px', display: 'block' }}
        >
          <defs>
            {/* Gradient for area fill */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-primary, #ff6b00)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--brand-primary, #ff6b00)" stopOpacity="0.0" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="var(--brand-primary, #ff6b00)" floodOpacity="0.65" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="var(--border-light)" />

          {/* SLA Threshold line if showing Uptime */}
          {activeMetric === 'uptime' && (
            <g>
              <line 
                x1={paddingX} 
                y1={thresholdY} 
                x2={svgWidth - paddingX} 
                y2={thresholdY} 
                stroke="#ef4444" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
              <text 
                x={svgWidth - paddingX - 10} 
                y={thresholdY - 6} 
                textAnchor="end" 
                fill="#ef4444" 
                fontSize="10" 
                fontWeight="700"
              >
                SLA Guarantee Cap (99.950%)
              </text>
            </g>
          )}

          {/* Area Fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Metric Line Path with Neon Glow */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="var(--brand-primary, #ff6b00)" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          {/* Data interactive dots */}
          {points.map((pt, idx) => {
            const isHovered = hoveredPoint && hoveredPoint.time === pt.data.time;
            return (
              <g key={idx}>
                <circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r={isHovered ? 6 : 4} 
                  fill="var(--bg-primary, #090a0f)" 
                  stroke="var(--brand-primary, #ff6b00)" 
                  strokeWidth={isHovered ? 3 : 2}
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  onMouseEnter={() => setHoveredPoint(pt.data)}
                />
                {/* Time labels below axis */}
                <text 
                  x={pt.x} 
                  y={svgHeight - 10} 
                  textAnchor="middle" 
                  fill="#94a3b8" 
                  fontSize="10" 
                  fontWeight="600"
                >
                  {pt.data.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered Point Info Card Overlay */}
        {hoveredPoint && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            background: 'var(--bg-surface-elevated)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-light)',
            borderRadius: '10px',
            padding: '0.625rem 0.875rem',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            pointerEvents: 'none'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Time: </span>
              <strong style={{ color: 'var(--text-primary)' }}>{hoveredPoint.time}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Uptime: </span>
              <strong style={{ color: hoveredPoint.uptime >= 99.95 ? '#00c6a7' : '#ef4444' }}>
                {hoveredPoint.uptime.toFixed(3)}%
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Latency: </span>
              <strong style={{ color: 'var(--text-primary)' }}>{hoveredPoint.latency}ms</strong>
            </div>
          </div>
        )}
      </div>

      {/* Footer Metrics Row */}
      <div style={{
        marginTop: '1rem',
        paddingTop: '0.875rem',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00c6a7' }}></span>
            <span>Current Uptime: <strong style={{ color: 'var(--text-primary)' }}>99.982%</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span>Contract Threshold: <strong style={{ color: 'var(--text-primary)' }}>99.950%</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Zap size={13} color="#06b6d4" />
            <span>Avg Response: <strong style={{ color: 'var(--text-primary)' }}>22ms</strong></span>
          </div>
        </div>

        <div style={{ fontWeight: 600, color: '#00c6a7', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <CheckCircle size={13} />
          <span>Zero SLA breach intervals detected in last 24h</span>
        </div>
      </div>
    </div>
  );
}
