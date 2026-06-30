interface CrosshairProps {
  spread?: number;
  firing?: boolean;
}

const Crosshair = ({ spread = 8, firing = false }: CrosshairProps) => {
  const gap = spread + (firing ? 6 : 0);
  const color = 'hsl(var(--hud-cyan))';

  const lineStyle = (extra: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    backgroundColor: color,
    boxShadow: `0 0 4px ${color}`,
    transition: 'all 80ms ease-out',
    ...extra,
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-crosshair-pulse">
      <div className="relative w-16 h-16">
        <div style={lineStyle({ top: `calc(50% - ${gap + 10}px)`, left: '50%', width: 2, height: 10, transform: 'translateX(-50%)' })} />
        <div style={lineStyle({ top: `calc(50% + ${gap}px)`, left: '50%', width: 2, height: 10, transform: 'translateX(-50%)' })} />
        <div style={lineStyle({ left: `calc(50% - ${gap + 10}px)`, top: '50%', height: 2, width: 10, transform: 'translateY(-50%)' })} />
        <div style={lineStyle({ left: `calc(50% + ${gap}px)`, top: '50%', height: 2, width: 10, transform: 'translateY(-50%)' })} />
        <div
          className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
        />
      </div>
    </div>
  );
};

export default Crosshair;
