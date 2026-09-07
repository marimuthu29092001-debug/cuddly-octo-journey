import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Calendar,
  Building
} from 'lucide-react';
import { COMPANY_INFO, SLA_TIERS } from '../../data/slaData';

export default function ReportExportModal({ isOpen, onClose }) {
  const [downloadSuccess, setDownloadSuccess] = useState('');

  if (!isOpen) return null;

  const handleDownload = (type) => {
    setDownloadSuccess(`Generated and downloaded Stackly_SLA_Audit_Report_${new Date().toISOString().split('T')[0]}.${type}`);
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(4, 8, 16, 0.78)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
        padding: '1.5rem',
        overscrollBehavior: 'contain'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '740px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          touchAction: 'auto',
          background: 'var(--bg-surface-elevated)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-xl)',
          padding: '2rem',
          border: '1px solid var(--border-light)',
          position: 'relative',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                Executive SLA Compliance Audit Report
              </h2>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                Official Service Level Agreement Verification &bull; Stackly Cloud Technologies
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {downloadSuccess && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.25rem',
            fontSize: '0.8125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={16} />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Report Content Body */}
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: '14px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-sans)'
        }}>
          {/* Executive Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Company</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{COMPANY_INFO.name} Cloud Inc.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Audit Period</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>August - September 2026</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Audit Status</div>
              <div style={{ fontWeight: 700, color: 'var(--status-healthy)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={13} /> Fully Certified
              </div>
            </div>
          </div>

          {/* Key SLA Findings */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.625rem' }}>
              Contractual SLA Fulfillment Summary
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Measured Availability</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-healthy)', fontFamily: 'var(--font-sans)' }}>99.982%</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--status-healthy)' }}>Target: 99.900% (+0.082%)</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>MTTR Average</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-sans)' }}>14m 20s</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--brand-primary)' }}>Cap: 45m 00s (68% margin)</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>SLA Refund Liability</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-healthy)', fontFamily: 'var(--font-sans)' }}>$0.00</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--status-healthy)' }}>Zero Breaches Recorded</div>
              </div>
            </div>
          </div>

          {/* Compliance Statement */}
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            This certification confirms that Stackly Enterprise Cloud has met and exceeded all contractual uptime, latency, and incident response requirements across all enterprise customer tiers (Platinum, Gold, Silver). Zero service fee refunds or credits were triggered during this billing interval.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--border-light)', paddingTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div>
              <strong>Audited by:</strong> Grant Thornton Tech Assurance &bull; ISO 27001
            </div>
            <div>
              <strong>Report Hash:</strong> <code style={{ color: 'var(--brand-primary)' }}>0x8f4d...3b21</code>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button 
            className="btn-secondary" 
            onClick={handlePrint}
            style={{ fontSize: '0.8125rem' }}
          >
            <Printer size={15} />
            <span>Print Report</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn-secondary" 
              onClick={() => handleDownload('csv')}
              style={{ fontSize: '0.8125rem' }}
            >
              <FileText size={15} />
              <span>Export CSV</span>
            </button>
            <button 
              className="btn-primary" 
              onClick={() => handleDownload('pdf')}
              style={{ fontSize: '0.8125rem' }}
            >
              <Download size={15} />
              <span>Download Signed PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
