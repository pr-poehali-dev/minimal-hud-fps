import Icon from '@/components/ui/icon';

interface AmmoCounterProps {
  weaponName: string;
  weaponIcon: string;
  magazine: number;
  magazineMax: number;
  reserve: number;
}

const AmmoCounter = ({
  weaponName,
  weaponIcon,
  magazine,
  magazineMax,
  reserve,
}: AmmoCounterProps) => {
  const low = magazine <= magazineMax * 0.25;

  return (
    <div className="corner-bracket box-glow bg-[hsl(var(--hud-dark)/0.6)] backdrop-blur-sm px-5 py-4 w-64">
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[hsl(var(--hud-cyan)/0.2)]">
        <div className="w-9 h-9 flex items-center justify-center border border-[hsl(var(--hud-cyan)/0.4)] bg-[hsl(var(--hud-cyan)/0.08)]">
          <Icon name={weaponIcon} size={20} className="text-[hsl(var(--hud-cyan))]" />
        </div>
        <div className="min-w-0">
          <div
            key={weaponName}
            className="font-display font-bold text-sm tracking-wider text-[hsl(var(--hud-cyan))] text-glow truncate animate-fade-in"
          >
            {weaponName}
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-[hsl(var(--hud-cyan))]/50">
            PRIMARY
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end gap-2">
        <span
          className={`font-display font-bold text-5xl leading-none tabular-nums transition-colors duration-300 ${
            low
              ? 'text-[hsl(var(--hud-red))] text-glow-red animate-glow-pulse'
              : 'text-[hsl(var(--hud-cyan))] text-glow'
          }`}
        >
          {magazine.toString().padStart(2, '0')}
        </span>
        <span className="font-mono text-base text-[hsl(var(--hud-cyan))]/40 mb-1">
          / {reserve}
        </span>
      </div>

      <div className="flex gap-0.5 mt-2 justify-end">
        {Array.from({ length: magazineMax }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-3 transition-colors duration-200"
            style={{
              backgroundColor:
                i < magazine
                  ? low
                    ? 'hsl(var(--hud-red))'
                    : 'hsl(var(--hud-cyan))'
                  : 'hsl(var(--hud-cyan) / 0.12)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AmmoCounter;
