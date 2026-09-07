import React from 'react';

/**
 * Official STACKLY Brand Logo Component
 * Matches the uploaded brand asset: Dual-Swoosh 'S' emblem (Mint/Teal + Marine Navy) + Modern STACKLY wordmark
 */
export default function StacklyLogo({ height = 32, variant = 'white', showBadge = true, className = '' }) {
  const textColor = variant === 'white' ? '#ffffff' : '#1b365d';
  const iconWidth = Math.round(height * 0.95);
  const fontSize = Math.round(height * 0.58);

  return (
    <span 
      className={`stackly-official-brand-logo ${className}`} 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', verticalAlign: 'middle', userSelect: 'none' }}
    >
      <svg 
        width={iconWidth} 
        height={height} 
        viewBox="0 0 38 42" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ flexShrink: 0 }}
      >
        {/* Official Stackly Dual-Swoosh 'S' Icon */}
        {/* Upper Mint/Teal Leaf Swoosh */}
        <path d="M22 3.5C28.5 6 33.5 12.5 31.5 20C30 25 24 27.5 18 25C13.5 23 12 18 15 11.5C17 7.5 19.5 4.5 22 3.5Z" fill="#6ecbb7"/>
        <path d="M19 4.5C13.5 9 11 16 14.5 22C16 24 20 25 22.5 23.5C18 20 17 14 20 8C20.5 7 20 5.5 19 4.5Z" fill="#88e4d1"/>
        {/* Lower Marine Navy Leaf Swoosh */}
        <path d="M18.5 38.5C12 36 7 29.5 9 22C10.5 17 16.5 14.5 22.5 17C27 19 28.5 24 25.5 30.5C23.5 34.5 21 37.5 18.5 38.5Z" fill="#1b365d"/>
        <path d="M21.5 37.5C27 33 29.5 26 26 20C24.5 18 20.5 17 18 18.5C22.5 22 23.5 28 20.5 34C20 35 20.5 36.5 21.5 37.5Z" fill="#2d5284"/>
      </svg>
      <span 
        style={{ 
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif", 
          fontSize: `${fontSize}px`, 
          fontWeight: 900, 
          letterSpacing: '0.12em', 
          color: textColor, 
          lineHeight: 1 
        }}
      >
        STACKLY
      </span>
      {showBadge && (
        <span 
          style={{ 
            background: 'rgba(255, 107, 0, 0.18)', 
            border: '1px solid rgba(255, 107, 0, 0.4)', 
            color: '#ff7800', 
            fontSize: '0.65rem', 
            fontWeight: 800, 
            padding: '0.18rem 0.5rem', 
            borderRadius: '6px', 
            letterSpacing: '0.06em', 
            textTransform: 'uppercase' 
          }}
        >
          SLA
        </span>
      )}
    </span>
  );
}
