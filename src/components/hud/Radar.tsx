import Icon from '@/components/ui/icon';

interface Blip {
  id: number;
  angle: number;
  dist: number;
  type: 'enemy' | 'ally' | 'objective';
}

interface RadarProps {
  blips: Blip[];
}

const colorByType = {
  enemy: 'hsl(var(--hud-red))',
  ally: 'hsl(var(--hud-green))',
  objective: 'hsl(var(--hud-amber))',
};

const Radar = ({ blips }: RadarProps) => {
  return (
    <div className="corner-bracket box-glow bg-[hsl(var(--hud-dark)/0.6)] backdrop-blur-sm p-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--hud-cyan))]/70">
          RADAR
        </span>
        <Icon name="Radar" size={14} className="text-[hsl(var(--hud-cyan))]" />
      </div>

      <div className="relative w-40 h-40 rounded-full border border-[hsl(var(--hud-cyan)/0.3)] overflow-hidden bg-[hsl(var(--hud-cyan)/0.04)]">
        {/* концентрические круги */}
        <div className="absolute inset-[18%] rounded-full border border-[hsl(var(--hud-cyan)/0.15)]" />
        <div className="absolute inset-[36%] rounded-full border border-[hsl(var(--hud-cyan)/0.15)]" />
        {/* перекрестие */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[hsl(var(--hud-cyan)/0.15)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--hud-cyan)/0.15)]" />

        {/* луч сканирования */}
        <div className="absolute inset-0 animate-radar-sweep">
          <div
            className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, hsl(var(--hud-cyan) / 0.35) 40deg, transparent 60deg)',
            }}
          />
        </div>

        {/* метки */}
        {blips.map((b) => {
          const rad = (b.angle * Math.PI) / 180;
          const r = b.dist * 46;
          const x = 50 + Math.cos(rad) * r;
          const y = 50 + Math.sin(rad) * r;
          return (
            <div
              key={b.id}
              className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 animate-blip-fade"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: colorByType[b.type],
                boxShadow: `0 0 6px ${colorByType[b.type]}`,
                animationDuration: '3s',
                animationIterationCount: 'infinite',
              }}
            />
          );
        })}

        {/* игрок в центре */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon name="Navigation" size={14} className="text-[hsl(var(--hud-cyan))] text-glow" />
        </div>
      </div>
    </div>
  );
};

export default Radar;
