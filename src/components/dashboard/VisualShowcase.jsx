import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Server, 
  Globe, 
  Users, 
  Activity, 
  ExternalLink, 
  Maximize2, 
  ChevronRight, 
  Sparkles,
  Award
} from 'lucide-react';
import { SLA_SHOWCASE_IMAGES } from '../../data/slaData';

export default function VisualShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const activeItem = SLA_SHOWCASE_IMAGES[activeIdx];

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem', overflow: 'hidden' }}>
      <div className="sla-card-header">
        <div>
          <div className="sla-card-title">
            <Award size={20} color="#2563eb" />
            <span>Stackly SLA Infrastructure & Reliability Pillars</span>
            <span className="status-pill healthy" style={{ marginLeft: '0.5rem' }}>
              5 Dedicated Facilities
            </span>
          </div>
          <div className="sla-card-subtitle">
            Physical redundancy, 24/7 NOC command center, low-latency edge routing, and automated compliance shields.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setModalImage(activeItem)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
          >
            <Maximize2 size={13} />
            <span>Full View</span>
          </button>
        </div>
      </div>

      {/* Featured Visual Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '1.5rem',
        alignItems: 'center',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: '16px',
        padding: '1.25rem',
        marginBottom: '1.25rem'
      }}>
        {/* Left: Featured Image with Glassmorphism Overlay */}
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          boxShadow: 'var(--shadow-lg)',
          background: 'var(--bg-surface)',
          cursor: 'pointer'
        }} onClick={() => setModalImage(activeItem)}>
          <img 
            src={activeItem.image} 
            alt={activeItem.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{
            position: 'absolute',
            top: '0.875rem',
            left: '0.875rem',
            background: 'rgba(7, 13, 24, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--brand-primary)',
            border: '1px solid var(--brand-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}>
            <span className="status-indicator-dot" style={{ color: 'var(--brand-primary)' }}></span>
            {activeItem.tag}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '0.875rem',
            right: '0.875rem',
            background: 'rgba(7, 13, 24, 0.88)',
            color: '#00c6a7',
            border: '1px solid rgba(0, 198, 167, 0.3)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)'
          }}>
            {activeItem.metric}
          </div>
        </div>

        {/* Right: Featured Detail Context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--brand-primary)', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em' 
            }}>
              {activeItem.category}
            </span>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)', 
              marginTop: '0.25rem',
              lineHeight: 1.3 
            }}>
              {activeItem.title}
            </h3>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {activeItem.description}
          </p>

          <div style={{ 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-light)', 
            borderRadius: '10px', 
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Verified Performance Metric
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--status-healthy)', fontFamily: 'var(--font-sans)' }}>
                {activeItem.metric}
              </div>
            </div>
            <span className="status-pill healthy">
              <ShieldCheck size={12} />
              Audited 2026
            </span>
          </div>
        </div>
      </div>

      {/* 5 Thumbnails Carousel / Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.875rem'
      }}>
        {SLA_SHOWCASE_IMAGES.map((item, idx) => {
          const isSelected = idx === activeIdx;
          return (
            <div
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                cursor: 'pointer',
                border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'var(--bg-subtle)',
                boxShadow: isSelected ? '0 0 14px rgba(0, 198, 167, 0.3)' : 'none',
                transition: 'all 0.2s ease',
                padding: '0.375rem'
              }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                marginBottom: '0.5rem'
              }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid #2563eb',
                    borderRadius: '8px',
                    pointerEvents: 'none'
                  }}></div>
                )}
              </div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: isSelected ? 700 : 600,
                color: isSelected ? '#1d4ed8' : '#334155',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.tag}
              </div>
              <div style={{
                fontSize: '0.6875rem',
                color: '#64748b',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600
              }}>
                {item.metric}
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Res Modal Zoom */}
      {modalImage && (
        <div 
          onClick={() => setModalImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '960px',
              width: '100%',
              background: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <img 
                src={modalImage.image} 
                alt={modalImage.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  {modalImage.title}
                </h3>
                <span className="status-pill healthy" style={{ fontSize: '0.8125rem' }}>
                  {modalImage.metric}
                </span>
              </div>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {modalImage.description}
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => setModalImage(null)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
