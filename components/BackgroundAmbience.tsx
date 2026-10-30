import React from 'react';

export const BackgroundAmbience: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Subtle top ambient glow for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/[0.06] via-transparent to-transparent dark:from-emerald-400/[0.07] dark:via-transparent dark:to-transparent" />
      
      {/* Delicate background grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};
