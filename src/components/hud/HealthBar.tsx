import Icon from '@/components/ui/icon';
import { useAnimatedValue } from '@/hooks/useAnimatedValue';

interface HealthBarProps {
  health: number;
  armor: number;
}

const HealthBar = ({ health, armor }: HealthBarProps) => {
  const animHealth = useAnimatedValue(health);
  const animArmor = useAnimatedValue(armor);

  const hp = Math.round(animHealth);
  const ar = Math.round(animArmor);
  const critical = hp <= 25;

  return (
    <div className="corner-bracket box-glow bg-[hsl(var(--hud-dark)/0.6)] backdrop-blur-sm px-5 py-4 w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon
            name="Heart"
            size={18}
            className={critical ? 'text-[hsl(var(--hud-red))] text-glow-red' : 'text-[hsl(var(--hud-cyan))]'}
          />
          <span className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--hud-cyan))]/70">
            VITALS
          </span>
        </div>
        <span
          className={`font-display font-bold text-3xl leading-none tabular-nums transition-colors duration-300 ${
            critical
              ? 'text-[hsl(var(--hud-red))] text-glow-red animate-glow-pulse'
              : 'text-[hsl(var(--hud-cyan))] text-glow'
          }`}
        >
          {hp}
        </span>
      </div>

      <div className="h-2 bg-[hsl(var(--hud-cyan)/0.1)] overflow-hidden mb-3 skew-x-[-12deg]">
        <div
          className={`h-full transition-[width] duration-100 ${
            critical ? 'bg-[hsl(var(--hud-red))]' : 'bg-[hsl(var(--hud-cyan))]'
          }`}
          style={{
            width: `${hp}%`,
            boxShadow: `0 0 10px ${critical ? 'hsl(var(--hud-red))' : 'hsl(var(--hud-cyan))'}`,
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="Shield" size={14} className="text-[hsl(var(--hud-amber))]" />
        <div className="flex-1 h-1.5 bg-[hsl(var(--hud-amber)/0.1)] overflow-hidden skew-x-[-12deg]">
          <div
            className="h-full bg-[hsl(var(--hud-amber))] transition-[width] duration-100"
            style={{ width: `${ar}%`, boxShadow: '0 0 8px hsl(var(--hud-amber))' }}
          />
        </div>
        <span className="font-mono text-xs text-[hsl(var(--hud-amber))] tabular-nums w-6 text-right">
          {ar}
        </span>
      </div>
    </div>
  );
};

export default HealthBar;
