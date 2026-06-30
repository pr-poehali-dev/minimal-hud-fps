import { useEffect, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import HealthBar from '@/components/hud/HealthBar';
import AmmoCounter from '@/components/hud/AmmoCounter';
import Crosshair from '@/components/hud/Crosshair';
import MiniMap from '@/components/hud/MiniMap';

const BG = 'https://cdn.poehali.dev/projects/e3e5237e-be37-40f3-9efd-b6728002faaa/files/8b71597c-a3c3-4db0-abae-dbf169530e9e.jpg';

const WEAPONS = [
  { name: 'AK-74M', icon: 'Crosshair', magMax: 30, reserve: 120 },
  { name: 'SPECTRE-9', icon: 'Zap', magMax: 25, reserve: 100 },
  { name: 'RAILGUN MK-II', icon: 'Flame', magMax: 8, reserve: 32 },
];

const Index = () => {
  const [health, setHealth] = useState(100);
  const [armor, setArmor] = useState(75);
  const [weaponIdx, setWeaponIdx] = useState(0);
  const [magazine, setMagazine] = useState(30);
  const [reserve, setReserve] = useState(120);
  const [firing, setFiring] = useState(false);

  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(60);
  const [heading, setHeading] = useState(0);

  const weapon = WEAPONS[weaponIdx];

  const switchWeapon = useCallback(() => {
    setWeaponIdx((i) => {
      const next = (i + 1) % WEAPONS.length;
      setMagazine(WEAPONS[next].magMax);
      setReserve(WEAPONS[next].reserve);
      return next;
    });
  }, []);

  const reload = useCallback(() => {
    setMagazine((mag) => {
      if (mag >= weapon.magMax) return mag;
      const need = weapon.magMax - mag;
      const take = Math.min(need, reserve);
      setReserve((r) => r - take);
      return mag + take;
    });
  }, [weapon.magMax, reserve]);

  const shoot = useCallback(() => {
    setFiring(true);
    setTimeout(() => setFiring(false), 90);
    setMagazine((m) => (m > 0 ? m - 1 : 0));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyR') reload();
      if (e.code === 'KeyQ') switchWeapon();
    };
    const onClick = () => shoot();
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [reload, switchWeapon, shoot]);

  useEffect(() => {
    const movement = setInterval(() => {
      setPlayerX((x) => Math.max(15, Math.min(85, x + (Math.random() - 0.5) * 8)));
      setPlayerY((y) => Math.max(15, Math.min(85, y + (Math.random() - 0.5) * 8)));
      setHeading((h) => (h + (Math.random() - 0.5) * 40 + 360) % 360);
    }, 1200);

    const combat = setInterval(() => {
      if (Math.random() > 0.6) {
        setHealth((h) => Math.max(0, h - Math.floor(Math.random() * 12)));
      }
      if (Math.random() > 0.8) {
        setArmor((a) => Math.max(0, a - Math.floor(Math.random() * 8)));
      }
      if (Math.random() > 0.85) {
        setHealth((h) => (h < 50 ? Math.min(100, h + 20) : h));
        setArmor((a) => Math.min(100, a + 15));
      }
    }, 2000);

    return () => {
      clearInterval(movement);
      clearInterval(combat);
    };
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black select-none font-display"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.85)]" />

      <div className="absolute top-0 left-0 right-0 flex items-center px-8 py-3 animate-flicker">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-[hsl(var(--hud-cyan))]/80">
          <Icon name="Activity" size={14} className="text-[hsl(var(--hud-green))]" />
          <span>OPERATIVE: GHOST-01</span>
          <span className="text-[hsl(var(--hud-cyan))]/30">|</span>
          <span>MISSION: BLACKOUT</span>
        </div>
      </div>

      <Crosshair firing={firing} />

      {firing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Icon name="X" size={28} className="text-[hsl(var(--hud-red))] opacity-80" />
        </div>
      )}

      <div className="absolute top-14 left-8">
        <MiniMap playerX={playerX} playerY={playerY} heading={heading} />
      </div>

      <div className="absolute bottom-8 left-8">
        <HealthBar health={health} armor={armor} />
      </div>

      <div className="absolute bottom-8 right-8">
        <AmmoCounter
          weaponName={weapon.name}
          weaponIcon={weapon.icon}
          magazine={magazine}
          magazineMax={weapon.magMax}
          reserve={reserve}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono text-[10px] tracking-[0.15em] text-[hsl(var(--hud-cyan))]/40">
        <span>[ЛКМ] ОГОНЬ</span>
        <span>[R] ПЕРЕЗАРЯДКА</span>
        <span>[Q] СМЕНА ОРУЖИЯ</span>
      </div>
    </div>
  );
};

export default Index;