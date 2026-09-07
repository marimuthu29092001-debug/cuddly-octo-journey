import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  X, 
  Sparkles, 
  Activity,
  Layers,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import StacklyLogo from '../common/StacklyLogo';
import { DEMO_USERS } from '../../data/slaData';
import './Login.css';

// 5 High-Definition Background Images with Smooth Auto-Transition
const BACKGROUND_SLIDES = [
  {
    id: 0,
    // Laptop displaying futuristic enterprise dashboard on desk - matches reference screenshot
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85',
    fallback: 'public/images/ops-command-center.jpg',
    title: 'Autonomous SLA & SRE Command Center',
    tag: 'Slide 01 • Mission-Critical SLA Telemetry & SRE Cockpit'
  },
  {
    id: 1,
    url: 'public/images/datacenter-servers.jpg',
    fallback: 'public/images/datacenter-servers.jpg',
    title: 'Tier-4 Cloud Datacenter Infrastructure',
    tag: 'Slide 02 • 99.999% High Availability Datacenter Racks'
  },
  {
    id: 2,
    url: 'public/images/ops-command-center.jpg',
    fallback: 'public/images/ops-command-center.jpg',
    title: '24/7 Global NOC Command Telemetry',
    tag: 'Slide 03 • Real-Time Ingress Latency & SLO Tracking'
  },
  {
    id: 3,
    url: 'public/images/uptime-shield.jpg',
    fallback: 'public/images/uptime-shield.jpg',
    title: 'Autonomous SLA Guarantee Shield',
    tag: 'Slide 04 • Financial Penalty Liability & Refund Simulator'
  },
  {
    id: 4,
    url: 'public/images/global-edge-network.jpg',
    fallback: 'public/images/global-edge-network.jpg',
    title: 'Global Anycast Low-Latency Edge Mesh',
    tag: 'Slide 05 • Sub-Millisecond Global Ingress Telemetry'
  }
];

export default function Login({ onLoginSuccess }) {
  // Slideshow state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Interactive Landing Telemetry Section State
  const [landingSection, setLandingSection] = useState('slo');
  const [simulatedDowntimeMins, setSimulatedDowntimeMins] = useState(4.5);
  const [errorSpikeActive, setErrorSpikeActive] = useState(false);
  const [selectedHeatmapDay, setSelectedHeatmapDay] = useState(89);

  // Auth modal / card state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(DEMO_USERS[0].role);
  const [email, setEmail] = useState(DEMO_USERS[0].email);
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 5-Image automatic changing interval (every 5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Lock body scroll when auth modal is open to prevent background scrolling (backscrole)
  useEffect(() => {
    if (authModalOpen) {
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
  }, [authModalOpen]);

  // Demo user role selector
  const handleRoleSelect = (user) => {
    setSelectedRole(user.role);
    setEmail(user.email);
    setPassword('••••••••••••');
    setErrorMsg('');
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your enterprise credentials');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const activeUser = DEMO_USERS.find((u) => u.role === selectedRole) || DEMO_USERS[0];
      setIsLoading(false);
      setAuthModalOpen(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      onLoginSuccess({
        ...activeUser,
        email: email
      });
    }, 600);
  };

  return (
    <div 
      className="landing-login-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================================================
          BACKGROUND 5-IMAGE CROSSFADING CAROUSEL
          ========================================================================= */}
      <div className="bg-slideshow-container">
        {BACKGROUND_SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlide;
          return (
            <div
              key={slide.id}
              className={`bg-slide-item ${isActive ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.url}), url(${slide.fallback})`,
              }}
            />
          );
        })}

        {/* Cinematic Deep Dark Gradient Mask to ensure contrast */}
        <div className="bg-overlay-gradient"></div>
        {/* Subtle high-tech dot grid pattern */}
        <div className="bg-overlay-grid"></div>
      </div>

      {/* =========================================================================
          TOP NAVIGATION BAR (Cyber Orange SLA Theme)
          ========================================================================= */}
      <header className="landing-navbar">
        {/* Brand Logo - Official Stackly Brand Asset */}
        <div className="landing-brand" onClick={() => setLandingSection('slo')} style={{ cursor: 'pointer' }}>
          <StacklyLogo height={32} variant="white" showBadge={true} />
        </div>

        {/* Center Nav Links - 7 Interactive Telemetry Sections */}
        <nav className="landing-nav-links">
          <button 
            type="button" 
            className={`nav-link ${landingSection === 'slo' ? 'active' : ''}`}
            onClick={() => setLandingSection('slo')}
          >
            SLO Health
          </button>
          <button 
            type="button" 
            className={`nav-link ${landingSection === 'error-budget' ? 'active' : ''}`}
            onClick={() => setLandingSection('error-budget')}
          >
            Error Budgets
          </button>
          <button 
            type="button" 
            className={`nav-link ${landingSection === 'penalties' ? 'active' : ''}`}
            onClick={() => setLandingSection('penalties')}
          >
            Penalty Simulator
          </button>
          <button 
            type="button" 
            className={`nav-link ${landingSection === 'heatmap' ? 'active' : ''}`}
            onClick={() => setLandingSection('heatmap')}
          >
            90D Heatmap
          </button>
          <button 
            type="button" 
            className={`nav-link ${landingSection === 'incidents' ? 'active' : ''}`}
            onClick={() => setLandingSection('incidents')}
          >
            Incidents
          </button>
          <button 
            type="button" 
            className={`nav-link ${landingSection === 'edge' ? 'active' : ''}`}
            onClick={() => setLandingSection('edge')}
          >
            Global Edge
          </button>
          <button 
            type="button" 
            className={`nav-link ${landingSection === 'contracts' ? 'active' : ''}`}
            onClick={() => setLandingSection('contracts')}
          >
            Contracts
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="landing-nav-actions">
          <button 
            type="button"
            className="btn-nav-login"
            onClick={() => setAuthModalOpen(true)}
            id="nav-login-button"
          >
            Log In
          </button>
          <button 
            type="button"
            className="btn-nav-signup"
            onClick={() => setAuthModalOpen(true)}
            id="nav-signup-button"
          >
            Launch Cockpit
          </button>
        </div>
      </header>

      {/* =========================================================================
          HERO CENTER SECTION (Tailored to Enterprise SLA & SRE Command Center)
          ========================================================================= */}
      <main className="landing-hero-center">
        {/* Release Pill Badge */}
        <div className="hero-announcement-pill">
          <span className="announcement-dot"></span>
          <span>New: Autonomous SLA Breach Copilot & SRE Telemetry v2.0 Released</span>
        </div>

        {/* Giant Headline - Matching visual hierarchy with glowing orange highlights */}
        <h1 className="hero-main-headline">
          The Global <span className="highlight-enterprise">SLA Intelligence</span><br />
          <span className="highlight-os">Command OS</span> for 2026
        </h1>

        {/* Subtitle - Tailored for SLA Dashboard */}
        <p className="hero-subtext">
          Monitor 99.999% high-availability, track real-time error budget burn rates, eliminate contractual breach penalties, and orchestrate SRE microservices across global edge clusters.
        </p>

        {/* Hero Call-to-Action Buttons */}
        <div className="hero-cta-group">
          <button 
            type="button"
            className="btn-hero-teal"
            onClick={() => setAuthModalOpen(true)}
            id="hero-signup-button"
          >
            Launch SLA Cockpit
          </button>

          <button 
            type="button"
            className="btn-hero-glass"
            onClick={() => setLandingSection('penalties')}
            id="hero-demo-button"
          >
            Simulate SLA Penalties
          </button>
        </div>

        {/* Dynamic Telemetry Showcase (Live Related Content for the 7 Navbar Links) */}
        <div className="landing-interactive-showcase" id="landingTelemetrySection" style={{ width: '100%', maxWidth: '1140px', margin: '1.75rem auto 1.5rem auto', textAlign: 'left' }}>
          {landingSection === 'slo' && (
            <div className="telemetry-showcase-panel" style={{ background: 'rgba(13, 20, 36, 0.94)', border: '1px solid rgba(255, 107, 0, 0.32)', borderRadius: '20px', padding: '1.6rem 1.85rem', backdropFilter: 'blur(28px)', boxShadow: '0 25px 70px rgba(0, 0, 0, 0.75), 0 0 40px rgba(255, 107, 0, 0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981', display: 'inline-block' }}></span>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff7800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Active Telemetry View &bull; SLO Health
                    </div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                      Production SLO Availability: <span style={{ color: '#10b981' }}>99.994%</span>
                    </h3>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#10b981', fontSize: '0.6875rem', fontWeight: 700, padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>18 of 18 SLOs In Bounds</span>
                  <button type="button" onClick={() => setAuthModalOpen(true)} style={{ background: 'linear-gradient(135deg, #ff6b00, #ff8800)', color: '#000000', fontSize: '0.8125rem', fontWeight: 700, padding: '0.45rem 1.15rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                    Launch Cockpit &rarr;
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>⚡</span><span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>99.998%</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Core API Ingress Gateway</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: '0.35rem 0' }}>12ms <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>p99</span></div>
                  <div style={{ fontSize: '0.71875rem', color: 'rgba(255,255,255,0.55)' }}>42,800 req/s &bull; 0 breach minutes</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>💳</span><span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>99.992%</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Transaction Ledger</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: '0.35rem 0' }}>28ms <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>p99</span></div>
                  <div style={{ fontSize: '0.71875rem', color: 'rgba(255,255,255,0.55)' }}>18,400 tps &bull; Strict ACID</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>🌊</span><span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.75rem' }}>99.985% Watch</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Kafka Event Streaming</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: '0.35rem 0' }}>110ms <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>p99</span></div>
                  <div style={{ fontSize: '0.71875rem', color: 'rgba(255,255,255,0.55)' }}>Consumer lag: 1.2s &bull; Auto-scaled</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>🛡️</span><span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>100.00%</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Anycast Edge Cache</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: '0.35rem 0' }}>4ms <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>p99</span></div>
                  <div style={{ fontSize: '0.71875rem', color: 'rgba(255,255,255,0.55)' }}>24 Global PoPs &bull; Zero downtime</div>
                </div>
              </div>
            </div>
          )}

          {landingSection === 'error-budget' && (
            <div className="telemetry-showcase-panel" style={{ background: 'rgba(13, 20, 36, 0.94)', border: '1px solid rgba(255, 107, 0, 0.32)', borderRadius: '20px', padding: '1.6rem 1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.35rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff7800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Active Telemetry View &bull; Error Budgets
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    Monthly Remaining Budget: <span style={{ color: errorSpikeActive ? '#ef4444' : '#10b981' }}>{errorSpikeActive ? '58.4%' : '84.2%'}</span>
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => setErrorSpikeActive(!errorSpikeActive)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.8125rem', fontWeight: 600, padding: '0.45rem 1rem', borderRadius: '9999px', cursor: 'pointer' }}>
                    {errorSpikeActive ? '⚡ Reset Simulation' : '🚨 Simulate 12x Traffic Spike'}
                  </button>
                  <button type="button" onClick={() => setAuthModalOpen(true)} style={{ background: 'linear-gradient(135deg, #ff6b00, #ff8800)', color: '#000000', fontSize: '0.8125rem', fontWeight: 700, padding: '0.45rem 1.15rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                    Open Policies &rarr;
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>1-Hour Burn</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{errorSpikeActive ? '12.4x' : '0.8x'}</div>
                  <div style={{ fontSize: '0.75rem', color: errorSpikeActive ? '#ef4444' : 'rgba(255,255,255,0.55)', marginTop: '0.25rem' }}>
                    {errorSpikeActive ? 'Automated freeze active' : 'Normal consumption'}
                  </div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>6-Hour Burn</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{errorSpikeActive ? '3.8x' : '1.1x'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.25rem' }}>Paging threshold: 6.0x</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>24-Hour Burn</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>0.9x</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.25rem' }}>26.4 Days until depletion</div>
                </div>
              </div>
            </div>
          )}

          {landingSection === 'penalties' && (
            <div className="telemetry-showcase-panel" style={{ background: 'rgba(13, 20, 36, 0.94)', border: '1px solid rgba(255, 107, 0, 0.32)', borderRadius: '20px', padding: '1.6rem 1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.35rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff7800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Active Telemetry View &bull; Penalty Simulator
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    SLA Service Credit: <span style={{ color: simulatedDowntimeMins <= 4.38 ? '#10b981' : simulatedDowntimeMins <= 15 ? '#ffaa00' : '#ef4444' }}>
                      {simulatedDowntimeMins <= 4.38 ? '$0.00 (Zero Penalty)' : simulatedDowntimeMins <= 15 ? '$12,500.00 (5% Rebate)' : simulatedDowntimeMins <= 30 ? '$37,500.00 (15% Rebate)' : '$75,000.00 (30% Max Cap)'}
                    </span>
                  </h3>
                </div>
                <button type="button" onClick={() => setAuthModalOpen(true)} style={{ background: 'linear-gradient(135deg, #ff6b00, #ff8800)', color: '#000000', fontSize: '0.8125rem', fontWeight: 700, padding: '0.45rem 1.15rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                  Open Audit &rarr;
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff' }}>Simulated Monthly Outage Duration:</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ff7800', background: 'rgba(255,107,0,0.15)', padding: '0.2rem 0.65rem', borderRadius: '6px' }}>{simulatedDowntimeMins.toFixed(1)} Minutes</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="60" 
                  step="0.5" 
                  value={simulatedDowntimeMins} 
                  onChange={(e) => setSimulatedDowntimeMins(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#ff6b00', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Contract Value</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>$250,000 / mo</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Simulated Availability</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{((43200 - simulatedDowntimeMins) / 43200 * 100).toFixed(4)}%</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', padding: '1.15rem 1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Credit Due</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: simulatedDowntimeMins <= 4.38 ? '#10b981' : '#ff7800' }}>
                    {simulatedDowntimeMins <= 4.38 ? '0% Credit' : simulatedDowntimeMins <= 15 ? '5% Credit' : simulatedDowntimeMins <= 30 ? '15% Credit' : '30% Credit'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {landingSection === 'heatmap' && (
            <div className="telemetry-showcase-panel" style={{ background: 'rgba(13, 20, 36, 0.94)', border: '1px solid rgba(255, 107, 0, 0.32)', borderRadius: '20px', padding: '1.6rem 1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.35rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff7800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Active Telemetry View &bull; 90-Day Continuous Availability Heatmap
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    90-Day Rolling Availability: <span style={{ color: '#10b981' }}>99.992%</span>
                  </h3>
                </div>
                <button type="button" onClick={() => setAuthModalOpen(true)} style={{ background: 'linear-gradient(135deg, #ff6b00, #ff8800)', color: '#000000', fontSize: '0.8125rem', fontWeight: 700, padding: '0.45rem 1.15rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                  Audit PDF &rarr;
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 1fr)', gap: '4px', padding: '0.875rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                {Array.from({ length: 90 }).map((_, idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    onClick={() => setSelectedHeatmapDay(idx)}
                    style={{ height: '18px', borderRadius: '3px', background: idx === 72 ? '#f59e0b' : idx === 41 ? '#f59e0b' : '#10b981', border: selectedHeatmapDay === idx ? '2px solid #ffffff' : 'none', cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          )}

          {landingSection === 'incidents' && (
            <div className="telemetry-showcase-panel" style={{ background: 'rgba(13, 20, 36, 0.94)', border: '1px solid rgba(255, 107, 0, 0.32)', borderRadius: '20px', padding: '1.6rem 1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff7800', textTransform: 'uppercase' }}>Incident Triage</div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>0 Critical P1 Breaches</h3>
                </div>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8125rem' }}>Mean MTTR: 4m 18s (SLA: 15m)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#ffffff' }}>INC-8921: EU-Central Rate Limiting Spike</strong>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>Mitigated in 4m 12s &bull; Auto-scaled pods &bull; SLA Intact</div>
                  </div>
                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>RESOLVED</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#ffffff' }}>INC-8894: PostgreSQL Replica Lag</strong>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>Mitigated in 2m 45s &bull; Autonomous failover &bull; Zero data loss</div>
                  </div>
                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>RESOLVED</span>
                </div>
              </div>
            </div>
          )}

          {landingSection === 'edge' && (
            <div className="telemetry-showcase-panel" style={{ background: 'rgba(13, 20, 36, 0.94)', border: '1px solid rgba(255, 107, 0, 0.32)', borderRadius: '20px', padding: '1.6rem 1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff7800', textTransform: 'uppercase' }}>Global Edge Mesh</div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>24 Regions &bull; Sub-50ms Routing</h3>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem' }}>
                {[
                  { name: 'US-East (Virginia)', ping: '12ms' },
                  { name: 'US-West (Oregon)', ping: '18ms' },
                  { name: 'EU-Central (Frankfurt)', ping: '14ms' },
                  { name: 'AP-South (Mumbai)', ping: '32ms' }
                ].map((r, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{r.name}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{r.ping}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {landingSection === 'contracts' && (
            <div className="telemetry-showcase-panel" style={{ background: 'rgba(13, 20, 36, 0.94)', border: '1px solid rgba(255, 107, 0, 0.32)', borderRadius: '20px', padding: '1.6rem 1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff7800', textTransform: 'uppercase' }}>Contractual Tiers</div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>Enterprise Master Service Agreements</h3>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { tier: 'Platinum Sovereign', uptime: '99.999%', mttr: '5 min P1 Response', color: '#ff6b00' },
                  { tier: 'Gold Mission Critical', uptime: '99.99%', mttr: '15 min P1 Response', color: '#10b981' },
                  { tier: 'Silver Business', uptime: '99.95%', mttr: '1 hr P1 Response', color: '#3b82f6' }
                ].map((t, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.color}`, padding: '1.15rem', borderRadius: '14px' }}>
                    <div style={{ color: t.color, fontWeight: 800, fontSize: '0.85rem' }}>{t.tier}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>{t.uptime}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{t.mttr}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick 1-Click Demo Shortcut */}
        <div className="hero-quick-login-hint">
          <span>Explore SLA Demo as:</span>
          <button 
            type="button" 
            className="quick-role-badge"
            onClick={() => {
              handleRoleSelect(DEMO_USERS[0]);
              setAuthModalOpen(true);
            }}
          >
            Super Admin (VP Ops)
          </button>
          <button 
            type="button" 
            className="quick-role-badge"
            onClick={() => {
              handleRoleSelect(DEMO_USERS[1]);
              setAuthModalOpen(true);
            }}
          >
            SLA Manager (Lead SRE)
          </button>
          <button 
            type="button" 
            className="quick-role-badge"
            onClick={() => {
              handleRoleSelect(DEMO_USERS[2]);
              setAuthModalOpen(true);
            }}
          >
            Enterprise Auditor
          </button>
        </div>
      </main>

      {/* =========================================================================
          FROSTED GLASS LOGIN MODAL (Triggered by Log In / Sign Up)
          ========================================================================= */}
      {authModalOpen && (
        <div 
          className="auth-modal-backdrop" 
          onClick={() => setAuthModalOpen(false)}
        >
          <div 
            className="auth-modal-card" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setAuthModalOpen(false)}
              aria-label="Close Login Modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="auth-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <StacklyLogo height={36} variant="white" showBadge={true} />
              </div>
              <h2 className="auth-modal-title">Sign In to SLA Command Center</h2>
              <p className="auth-modal-subtitle">
                Enterprise 99.999% Cloud Performance & SRE Telemetry Portal
              </p>
            </div>

            {/* Quick 1-Click Role Switcher */}
            <div className="auth-roles-box">
              <div className="roles-box-label">
                <span>1-Click Demo Accounts</span>
                <span className="roles-box-active-tag">SSO Ready</span>
              </div>
              <div className="roles-buttons-grid">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.role}
                    type="button"
                    className={`auth-role-chip ${selectedRole === u.role ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect(u)}
                  >
                    <div className="role-chip-name">{u.role}</div>
                    <div className="role-chip-title">{u.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="auth-login-form">
              <div className="auth-form-field">
                <label className="auth-field-label" htmlFor="auth-email">
                  Enterprise Email Address
                </label>
                <div className="auth-input-container">
                  <Mail size={16} className="auth-field-icon" />
                  <input
                    id="auth-email"
                    type="email"
                    className="auth-text-input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-field">
                <div className="password-label-row">
                  <label className="auth-field-label" htmlFor="auth-password">
                    Password / Master Key
                  </label>
                  <span className="demo-hint-text">Demo pre-filled</span>
                </div>
                <div className="auth-input-container">
                  <Lock size={16} className="auth-field-icon" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-text-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="auth-options-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Keep session active</span>
                </label>
                <span className="auth-help-link">Need assistance?</span>
              </div>

              {errorMsg && (
                <div className="auth-error-banner">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={isLoading}
                id="enter-dashboard-button"
              >
                {isLoading ? (
                  <>
                    <div className="auth-loading-spinner"></div>
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <>
                    <span>Enter SLA Command Center</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-modal-footer">
              <ShieldCheck size={14} color="#10b981" />
              <span>TLS 1.3 End-to-End Encryption &bull; SOC-2 Type II Certified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
