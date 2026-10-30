import React, { useEffect, useRef } from 'react';

interface FluidAudioVisualizerProps {
  status: 'idle' | 'listening' | 'thinking' | 'speaking';
  height?: number;
  width?: number;
  className?: string;
}

export const FluidAudioVisualizer: React.FC<FluidAudioVisualizerProps> = ({
  status,
  height = 140,
  width = 380,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      step += 0.05;
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const waveCount = status === 'speaking' ? 4 : status === 'listening' ? 3 : status === 'thinking' ? 2 : 1;
      
      // Dynamic amplitude based on status
      const baseAmp = 
        status === 'speaking' ? 28 :
        status === 'listening' ? 18 :
        status === 'thinking' ? 12 : 5;

      const colors = [
        { stroke: 'rgba(16, 185, 129, 0.85)', glow: 'rgba(16, 185, 129, 0.4)' }, // emerald
        { stroke: 'rgba(45, 212, 191, 0.75)', glow: 'rgba(45, 212, 191, 0.3)' }, // teal
        { stroke: 'rgba(56, 189, 248, 0.65)', glow: 'rgba(56, 189, 248, 0.2)' }, // sky
        { stroke: 'rgba(168, 85, 247, 0.55)', glow: 'rgba(168, 85, 247, 0.2)' }, // purple
      ];

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        ctx.lineWidth = w === 0 ? 3 : 2;
        ctx.strokeStyle = colors[w % colors.length].stroke;
        ctx.shadowColor = colors[w % colors.length].glow;
        ctx.shadowBlur = 12;

        const freq = 0.02 + w * 0.008;
        const speed = (w + 1) * 0.75;
        const phase = step * speed;

        for (let x = 0; x < width; x += 3) {
          // Windowing envelope to taper smoothly at both canvas edges
          const envelope = Math.sin((x / width) * Math.PI);
          
          let y = centerY;
          if (status === 'thinking') {
            // Pulse ripple
            y += Math.sin(x * freq + phase) * Math.cos(phase * 0.5) * baseAmp * envelope;
          } else if (status === 'speaking') {
            // Rich multi-harmonic speech wave
            const harmonic1 = Math.sin(x * freq + phase);
            const harmonic2 = Math.cos(x * freq * 2 - phase * 1.5) * 0.5;
            const harmonic3 = Math.sin(x * 0.05 + phase * 2) * 0.25;
            y += (harmonic1 + harmonic2 + harmonic3) * baseAmp * envelope;
          } else if (status === 'listening') {
            // Reactive listening wave
            y += Math.sin(x * freq + phase) * baseAmp * envelope;
          } else {
            // Idle ambient breathing line
            y += Math.sin(x * 0.015 + step * 0.5) * baseAmp * envelope;
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Center glowing pulse core if thinking or speaking
      if (status === 'thinking' || status === 'speaking' || status === 'listening') {
        const pulseR = 8 + Math.sin(step * 2) * 3;
        const radGrad = ctx.createRadialGradient(width / 2, centerY, 0, width / 2, centerY, pulseR * 2.5);
        radGrad.addColorStop(0, 'rgba(52, 211, 153, 0.9)');
        radGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.4)');
        radGrad.addColorStop(1, 'rgba(45, 212, 191, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(width / 2, centerY, pulseR * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [status, height, width]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="max-w-full drop-shadow-md"
      />
    </div>
  );
};
