import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  RotateCcw, 
  ArrowUpDown, 
  Download, 
  Layers, 
  Activity,
  ChevronRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { SLA_RECORDS } from '../../data/slaData';

export default function SlaRecordsTable({ 
  externalSearch = '', 
  externalStatus = 'all', 
  onStatusChange = () => {} 
}) {
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState(externalSearch);
  const [statusFilter, setStatusFilter] = useState(externalStatus);
  const [tierFilter, setTierFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30d');
  const [customStartDate, setCustomStartDate] = useState('2026-09-01');
  const [customEndDate, setCustomEndDate] = useState('2026-09-30');
  
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Sync external search & status filter
  useEffect(() => {
    if (externalSearch !== searchTerm) {
      setSearchTerm(externalSearch);
    }
  }, [externalSearch]);

  useEffect(() => {
    if (externalStatus !== statusFilter) {
      setStatusFilter(externalStatus);
    }
  }, [externalStatus]);

  // Lock body scroll when record details modal is open
  useEffect(() => {
    if (selectedRecord) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, [selectedRecord]);

  // Simulate smooth loading state whenever filter or date range changes
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 320);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    onStatusChange(status);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTierFilter('all');
    setDateRange('30d');
    onStatusChange('all');
  };

  // Filtered & Sorted Records
  const filteredRecords = useMemo(() => {
    return SLA_RECORDS.filter((rec) => {
      // Search matching
      const matchesSearch = 
        searchTerm === '' ||
        rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.region.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = 
        statusFilter === 'all' || 
        rec.status.toLowerCase() === statusFilter.toLowerCase();

      // Tier filter
      const matchesTier = 
        tierFilter === 'all' || 
        rec.tier.toLowerCase().includes(tierFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesTier;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [searchTerm, statusFilter, tierFilter, dateRange, sortField, sortDirection]);

  // Counts for status chips
  const counts = useMemo(() => {
    return {
      all: SLA_RECORDS.length,
      active: SLA_RECORDS.filter(r => r.status === 'Active').length,
      breached: SLA_RECORDS.filter(r => r.status === 'Breached').length,
      completed: SLA_RECORDS.filter(r => r.status === 'Completed').length,
    };
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Status Indicator helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            background: 'rgba(16, 185, 129, 0.14)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#10b981'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 6px #10b981',
              display: 'inline-block'
            }}></span>
            Active
          </span>
        );
      case 'Breached':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            background: 'rgba(239, 68, 68, 0.16)',
            border: '1px solid rgba(239, 68, 68, 0.45)',
            color: '#ef4444'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              boxShadow: '0 0 8px #ef4444',
              display: 'inline-block'
            }}></span>
            Breached
          </span>
        );
      case 'Completed':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            background: 'rgba(139, 92, 246, 0.14)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            color: '#a78bfa'
          }}>
            <CheckCircle2 size={10} color="#a78bfa" />
            Completed
          </span>
        );
      default:
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            background: 'rgba(245, 158, 11, 0.14)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#f59e0b'
          }}>
            <AlertTriangle size={10} color="#f59e0b" />
            {status}
          </span>
        );
    }
  };

  // Tier Badge helper
  const renderTierBadge = (tier) => {
    if (tier.includes('Platinum')) {
      return (
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.2rem 0.55rem',
          borderRadius: '6px',
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#818cf8',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}>
          {tier}
        </span>
      );
    }
    if (tier.includes('Gold')) {
      return (
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.2rem 0.55rem',
          borderRadius: '6px',
          background: 'rgba(245, 158, 11, 0.15)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          {tier}
        </span>
      );
    }
    return (
      <span style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        padding: '0.2rem 0.55rem',
        borderRadius: '6px',
        background: 'rgba(148, 163, 184, 0.15)',
        color: '#cbd5e1',
        border: '1px solid rgba(148, 163, 184, 0.3)'
      }}>
        {tier}
      </span>
    );
  };

  return (
    <div className="sla-card" style={{ marginBottom: '1.75rem', position: 'relative' }}>
      {/* Table Header: Title, Description & Action Buttons */}
      <div className="sla-card-header" style={{ flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
        <div>
          <div className="sla-card-title">
            <FileText size={20} color="var(--brand-primary)" />
            <span>SLA Data Table & Records</span>
            <span className="status-pill neutral" style={{ marginLeft: '0.5rem' }}>
              {filteredRecords.length} of {SLA_RECORDS.length} Records
            </span>
          </div>
          <div className="sla-card-subtitle">
            Contractual service-level agreements, active tracking, breach liabilities, and progress indicators.
          </div>
        </div>

        {/* Date Range Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'var(--bg-subtle)',
            padding: '0.25rem',
            borderRadius: '10px',
            border: '1px solid var(--border-light)'
          }}>
            <Calendar size={14} style={{ marginLeft: '0.5rem', color: 'var(--text-muted)' }} />
            <button
              type="button"
              className={`role-chip ${dateRange === '24h' ? 'active' : ''}`}
              onClick={() => handleDateRangeChange('24h')}
              style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
            >
              24h
            </button>
            <button
              type="button"
              className={`role-chip ${dateRange === '7d' ? 'active' : ''}`}
              onClick={() => handleDateRangeChange('7d')}
              style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
            >
              7 Days
            </button>
            <button
              type="button"
              className={`role-chip ${dateRange === '30d' ? 'active' : ''}`}
              onClick={() => handleDateRangeChange('30d')}
              style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
            >
              30 Days
            </button>
            <button
              type="button"
              className={`role-chip ${dateRange === '90d' ? 'active' : ''}`}
              onClick={() => handleDateRangeChange('90d')}
              style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
            >
              90 Days
            </button>
            <button
              type="button"
              className={`role-chip ${dateRange === 'all' ? 'active' : ''}`}
              onClick={() => handleDateRangeChange('all')}
              style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
            >
              All Time
            </button>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleRefresh}
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
            title="Refresh SLA records telemetry"
          >
            <RefreshCw size={13} className={isLoading ? 'spin-anim' : ''} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Multi-Filter Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.875rem',
        padding: '0.875rem 1rem',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        marginBottom: '1.25rem'
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '0.35rem 0.75rem',
          flex: '1 1 260px',
          maxWidth: '380px'
        }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search agreement, client, SLA ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.8125rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Status Filter Tabs (All, Active, Breached, Completed) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.2rem' }}>
            Status:
          </span>
          <button
            type="button"
            className={`role-chip ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleStatusFilterChange('all')}
            style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            className={`role-chip ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => handleStatusFilterChange('active')}
            style={{ 
              padding: '0.3rem 0.65rem', 
              fontSize: '0.75rem', 
              color: statusFilter === 'active' ? '#ffffff' : '#10b981',
              borderColor: statusFilter === 'active' ? '#10b981' : undefined
            }}
          >
            Active ({counts.active})
          </button>
          <button
            type="button"
            className={`role-chip ${statusFilter === 'breached' ? 'active' : ''}`}
            onClick={() => handleStatusFilterChange('breached')}
            style={{ 
              padding: '0.3rem 0.65rem', 
              fontSize: '0.75rem', 
              color: statusFilter === 'breached' ? '#ffffff' : '#ef4444',
              borderColor: statusFilter === 'breached' ? '#ef4444' : undefined
            }}
          >
            Breached ({counts.breached})
          </button>
          <button
            type="button"
            className={`role-chip ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => handleStatusFilterChange('completed')}
            style={{ 
              padding: '0.3rem 0.65rem', 
              fontSize: '0.75rem', 
              color: statusFilter === 'completed' ? '#ffffff' : '#8b5cf6',
              borderColor: statusFilter === 'completed' ? '#8b5cf6' : undefined
            }}
          >
            Completed ({counts.completed})
          </button>
        </div>

        {/* Tier Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Tier:
          </span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Tiers</option>
            <option value="Platinum">Platinum Enterprise</option>
            <option value="Gold">Gold Business</option>
            <option value="Silver">Silver Growth</option>
          </select>
        </div>
      </div>

      {/* =========================================================================
          LOADING STATE SKELETON
          ========================================================================= */}
      {isLoading ? (
        <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '24px',
              height: '24px',
              border: '3px solid rgba(255, 107, 0, 0.2)',
              borderTopColor: '#ff6b00',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}></div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Loading SLA telemetry & records for {dateRange.toUpperCase()}...
            </span>
          </div>

          {/* Skeleton Table Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                style={{
                  height: '46px',
                  borderRadius: '8px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmerAnim 1.5s infinite'
                }}
              />
            ))}
          </div>
        </div>
      ) : filteredRecords.length === 0 ? (
        /* =========================================================================
           EMPTY STATE COMPONENT
           ========================================================================= */
        <div style={{
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px dashed var(--border-light)',
          margin: '0.5rem 0'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255, 107, 0, 0.1)',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff6b00',
            marginBottom: '1rem'
          }}>
            <Search size={26} />
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            No SLA Records Found
          </h3>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            {searchTerm 
              ? `No SLA agreements matched your search query "${searchTerm}".`
              : `No agreements found under the "${statusFilter}" status filter.`}
            Try adjusting your search criteria or reset filters.
          </p>

          <button
            type="button"
            className="btn-primary"
            onClick={resetAllFilters}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.1rem', fontSize: '0.8125rem' }}
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        /* =========================================================================
           SLA DATA TABLE (RESPONSIVE)
           ========================================================================= */
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', overscrollBehaviorX: 'contain' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.8125rem',
            minWidth: '880px'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid var(--border-light)',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <th style={{ padding: '0.75rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('id')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>SLA ID</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th style={{ padding: '0.75rem 0.75rem', cursor: 'pointer' }} onClick={() => handleSort('name')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>Agreement & Client</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th style={{ padding: '0.75rem 0.75rem' }}>Tier</th>
                <th style={{ padding: '0.75rem 0.75rem', cursor: 'pointer' }} onClick={() => handleSort('targetSla')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>Target SLA</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th style={{ padding: '0.75rem 0.75rem', cursor: 'pointer' }} onClick={() => handleSort('currentSla')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>Current Performance</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th style={{ padding: '0.75rem 0.75rem', width: '160px' }}>Progress Indicator</th>
                <th style={{ padding: '0.75rem 0.75rem', cursor: 'pointer' }} onClick={() => handleSort('status')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>Status Indicator</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th style={{ padding: '0.75rem 0.75rem' }}>Date Period</th>
                <th style={{ padding: '0.75rem 0.75rem' }}>Penalty Liability</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((rec) => {
                const isBreached = rec.status === 'Breached';
                const isCompleted = rec.status === 'Completed';

                return (
                  <tr
                    key={rec.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color 0.15s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setSelectedRecord(rec)}
                  >
                    {/* SLA ID */}
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: 'var(--brand-primary)',
                        fontSize: '0.75rem',
                        background: 'rgba(255, 107, 0, 0.08)',
                        padding: '0.2rem 0.45rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 107, 0, 0.25)'
                      }}>
                        {rec.id}
                      </span>
                    </td>

                    {/* Agreement & Client */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                        {rec.name}
                      </div>
                      <div style={{ fontSize: '0.71875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {rec.client} &bull; <span style={{ color: 'var(--text-secondary)' }}>{rec.region}</span>
                      </div>
                    </td>

                    {/* Tier */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      {renderTierBadge(rec.tier)}
                    </td>

                    {/* Target SLA */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {rec.targetSla}%
                      </span>
                    </td>

                    {/* Current Performance */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        color: isBreached ? '#ef4444' : isCompleted ? '#8b5cf6' : '#10b981'
                      }}>
                        {rec.currentSla}%
                      </span>
                    </td>

                    {/* Progress Indicator Column */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', marginBottom: '0.25rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Attainment</span>
                          <span style={{ 
                            fontWeight: 700, 
                            fontFamily: 'var(--font-mono)',
                            color: isBreached ? '#ef4444' : '#10b981'
                          }}>
                            {rec.progress}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '5px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '9999px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${Math.min(100, Math.max(8, rec.progress))}%`,
                            height: '100%',
                            background: isBreached 
                              ? 'linear-gradient(90deg, #f87171, #ef4444)'
                              : isCompleted
                              ? 'linear-gradient(90deg, #a78bfa, #8b5cf6)'
                              : 'linear-gradient(90deg, #34d399, #10b981)',
                            borderRadius: '9999px',
                            boxShadow: isBreached 
                              ? '0 0 6px rgba(239, 68, 68, 0.5)'
                              : '0 0 6px rgba(16, 185, 129, 0.4)'
                          }}></div>
                        </div>
                      </div>
                    </td>

                    {/* Status Indicator */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      {renderStatusBadge(rec.status)}
                    </td>

                    {/* Date Period */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {rec.dateRange}
                      </span>
                    </td>

                    {/* Penalty Liability */}
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: isBreached ? '#ef4444' : 'var(--text-muted)'
                      }}>
                        {rec.penaltyLiability}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(rec);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Table Footer: Summary */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginTop: '1.25rem',
        paddingTop: '0.875rem',
        borderTop: '1px solid var(--border-light)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          Showing <strong>{filteredRecords.length}</strong> matching SLA records &bull; Active Date Window: <strong>{dateRange === '24h' ? 'Last 24 Hours' : dateRange === '7d' ? 'Last 7 Days' : dateRange === '30d' ? 'September 2026' : 'Fiscal Q3'}</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            Active: <strong>{counts.active}</strong>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
            Breached: <strong>{counts.breached}</strong>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></span>
            Completed: <strong>{counts.completed}</strong>
          </span>
        </div>
      </div>

      {/* =========================================================================
          SLA RECORD DETAILS MODAL
          ========================================================================= */}
      {selectedRecord && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 10, 20, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem',
            overscrollBehavior: 'contain'
          }}
          onClick={() => setSelectedRecord(null)}
        >
          <div 
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              maxWidth: '620px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              position: 'relative',
              animation: 'fadeInModal 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              overscrollBehavior: 'contain',
              touchAction: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              type="button"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-muted)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedRecord(null)}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.78rem',
                color: 'var(--brand-primary)',
                background: 'rgba(255, 107, 0, 0.1)',
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
                border: '1px solid rgba(255, 107, 0, 0.3)'
              }}>
                {selectedRecord.id}
              </span>
              {renderStatusBadge(selectedRecord.status)}
              {renderTierBadge(selectedRecord.tier)}
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {selectedRecord.name}
            </h3>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Enterprise Client: <strong style={{ color: 'var(--text-primary)' }}>{selectedRecord.client}</strong> &bull; Region: {selectedRecord.region}
            </p>

            {/* 4 Telemetry Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Target vs Actual SLA</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: selectedRecord.status === 'Breached' ? '#ef4444' : '#10b981', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                  {selectedRecord.currentSla}% <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/ {selectedRecord.targetSla}%</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Response Time / Latency</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                  {selectedRecord.responseTime}
                </div>
              </div>

              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>MTTA / MTTR Resolution</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                  {selectedRecord.mtta} <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/ {selectedRecord.mttr}</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Penalty Liability</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: selectedRecord.status === 'Breached' ? '#ef4444' : '#10b981', marginTop: '0.25rem' }}>
                  {selectedRecord.penaltyLiability}
                </div>
              </div>
            </div>

            {/* Progress Bar in Modal */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Contract SLA Fulfillment Progress</span>
                <span style={{ color: selectedRecord.status === 'Breached' ? '#ef4444' : '#10b981' }}>
                  {selectedRecord.progress}%
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${selectedRecord.progress}%`,
                  height: '100%',
                  background: selectedRecord.status === 'Breached' ? '#ef4444' : '#10b981',
                  borderRadius: '9999px'
                }}></div>
              </div>
            </div>

            {/* Footer buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedRecord(null)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
