import Icon from '@/components/ui/icon';

interface MiniMapProps {
  playerX: number;
  playerY: number;
  heading: number;
}

const MiniMap = ({ playerX, playerY, heading }: MiniMapProps) => {
  return (
    <div className="corner-bracket box-glow bg-[hsl(var(--hud-dark)/0.6)] backdrop-blur-sm p-3 w-52">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--hud-cyan))]/70">
          SECTOR-7
        </span>
        <Icon name="Map" size={14} className="text-[hsl(var(--hud-cyan))]" />
      </div>

      <div className="relative w-full aspect-square overflow-hidden border border-[hsl(var(--hud-cyan)/0.2)] hud-grid bg-[hsl(var(--hud-cyan)/0.03)]">
        {/* линия сканирования */}
        <div className="absolute left-0 right-0 h-px bg-[hsl(var(--hud-cyan)/0.4)] animate-scan-line shadow-[0_0_8px_hsl(var(--hud-cyan))]" />

        {/* схематичные «стены» уровня */}
        <div className="absolute left-[15%] top-[20%] w-[30%] h-[3px] bg-[hsl(var(--hud-cyan)/0.35)]" />
        <div className="absolute left-[15%] top-[20%] w-[3px] h-[40%] bg-[hsl(var(--hud-cyan)/0.35)]" />
        <div className="absolute right-[20%] top-[30%] w-[3px] h-[45%] bg-[hsl(var(--hud-cyan)/0.35)]" />
        <div className="absolute left-[30%] bottom-[18%] w-[40%] h-[3px] bg-[hsl(var(--hud-cyan)/0.35)]" />

        {/* точка интереса */}
        <div className="absolute right-[24%] top-[26%] -translate-y-1/2">
          <div className="w-2 h-2 bg-[hsl(var(--hud-amber))] rotate-45 shadow-[0_0_6px_hsl(var(--hud-amber))]" />
        </div>

        {/* игрок */}
        <div
          className="absolute transition-all duration-500 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${playerX}%`, top: `${playerY}%` }}
        >
          <div className="relative" style={{ transform: `rotate(${heading}deg)` }}>
            <Icon name="Navigation" size={16} className="text-[hsl(var(--hud-cyan))] text-glow" />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2 px-1 font-mono text-[9px] text-[hsl(var(--hud-cyan))]/50">
        <span>X:{Math.round(playerX * 10)}</span>
        <span>Y:{Math.round(playerY * 10)}</span>
        <span>{Math.round(heading)}°</span>
      </div>
    </div>
  );
};

export default MiniMap;
