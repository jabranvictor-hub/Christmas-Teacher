import React from 'react';

interface SnowEffectProps {
  enabled: boolean;
}

export const SnowEffect: React.FC<SnowEffectProps> = ({ enabled }) => {
  if (!enabled) return null;

  // Predefined snowflake configurations for performant animation without layout thrashing
  const flakes = [
    { id: 1, left: '5%', size: '12px', duration: '9s', delay: '0s', char: '❄' },
    { id: 2, left: '15%', size: '18px', duration: '12s', delay: '1.5s', char: '❅' },
    { id: 3, left: '25%', size: '14px', duration: '8s', delay: '3s', char: '❄' },
    { id: 4, left: '35%', size: '20px', duration: '14s', delay: '0.8s', char: '❆' },
    { id: 5, left: '48%', size: '16px', duration: '10s', delay: '2.5s', char: '❄' },
    { id: 6, left: '58%', size: '13px', duration: '11s', delay: '4s', char: '❅' },
    { id: 7, left: '68%', size: '22px', duration: '15s', delay: '1s', char: '❄' },
    { id: 8, left: '78%', size: '15px', duration: '9s', delay: '3.5s', char: '❆' },
    { id: 9, left: '88%', size: '19px', duration: '13s', delay: '2s', char: '❄' },
    { id: 10, left: '95%', size: '14px', duration: '10s', delay: '0.2s', char: '❅' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake text-white/40 drop-shadow-sm select-none"
          style={{
            left: f.left,
            fontSize: f.size,
            animationDuration: f.duration,
            animationDelay: f.delay,
          }}
        >
          {f.char}
        </span>
      ))}
    </div>
  );
};
