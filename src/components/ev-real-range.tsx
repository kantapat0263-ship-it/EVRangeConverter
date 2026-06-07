"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Thermometer, Route, Gauge, BatteryCharging, Info, Zap } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useCar } from '@/context/car-context';
import { toEpaKm, type RangeStandard } from '@/lib/ev-cars';
import { ShareButton } from '@/components/share-button';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const STANDARDS: RangeStandard[] = ['NEDC', 'CLTC', 'WLTP', 'EPA'];

// General real-world adjustment factors (multipliers on the EPA-equivalent).
const CLIMATE = { normal: 1.0, hot: 0.85, rain: 0.93 } as const;
const DRIVING = { city: 0.95, mixed: 1.0, highway: 0.82 } as const;
const STYLE = { eco: 1.05, normal: 1.0, aggressive: 0.85 } as const;
const AGE = { new: 1.0, mid: 0.95, old: 0.9 } as const;

type ClimateKey = keyof typeof CLIMATE;
type DrivingKey = keyof typeof DRIVING;
type StyleKey = keyof typeof STYLE;
type AgeKey = keyof typeof AGE;

export function EVRealRange() {
  const { t } = useLanguage();
  const { selectedCar } = useCar();

  const [range, setRange] = useState<string>('');
  const [standard, setStandard] = useState<RangeStandard>('NEDC');
  const [climate, setClimate] = useState<ClimateKey>('hot'); // Thailand default
  const [driving, setDriving] = useState<DrivingKey>('mixed');
  const [style, setStyle] = useState<StyleKey>('normal');
  const [age, setAge] = useState<AgeKey>('new');

  const shareRef = useRef<HTMLDivElement>(null);

  // Pre-fill from the selected car (still editable afterwards).
  useEffect(() => {
    if (selectedCar) {
      setRange(String(selectedCar.range));
      setStandard(selectedCar.standard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCar?.id]);

  const result = useMemo(() => {
    const adv = parseFloat(range);
    if (isNaN(adv) || adv <= 0) return null;
    const epa = toEpaKm(adv, standard);
    const real =
      epa * CLIMATE[climate] * DRIVING[driving] * STYLE[style] * AGE[age];
    return {
      low: Math.round((real * 0.95) / 5) * 5,
      high: Math.round((real * 1.05) / 5) * 5,
      percent: Math.round((real / adv) * 100),
    };
  }, [range, standard, climate, driving, style, age]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('realrange.title')}</h2>
          <p className="text-sm text-muted-foreground font-light mt-1">
            {t('realrange.subtitle')}
          </p>
        </div>
      </div>

      <Card className="glass border-primary/20 overflow-hidden">
        <CardContent className="p-8 space-y-8">
          {/* Source range + standard */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t('realrange.source_label')}</Label>
              <Input
                type="number"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder={t('realrange.pick_hint')}
                className="h-12 bg-[#121516] border-white/10 text-lg"
              />
            </div>
            <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
              {STANDARDS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStandard(s)}
                  className={`px-3 py-2 rounded-md text-xs font-bold transition-all ${
                    standard === s
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Adjustment factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FactorGroup
              icon={<Thermometer className="w-4 h-4 text-orange-400" />}
              label={t('realrange.climate')}
              value={climate}
              onChange={setClimate}
              options={[
                ['normal', t('realrange.climate_normal')],
                ['hot', t('realrange.climate_hot')],
                ['rain', t('realrange.climate_rain')],
              ]}
            />
            <FactorGroup
              icon={<Route className="w-4 h-4 text-secondary" />}
              label={t('realrange.driving')}
              value={driving}
              onChange={setDriving}
              options={[
                ['city', t('realrange.driving_city')],
                ['mixed', t('realrange.driving_mixed')],
                ['highway', t('realrange.driving_highway')],
              ]}
            />
            <FactorGroup
              icon={<Gauge className="w-4 h-4 text-primary" />}
              label={t('realrange.style')}
              value={style}
              onChange={setStyle}
              options={[
                ['eco', t('realrange.style_eco')],
                ['normal', t('realrange.style_normal')],
                ['aggressive', t('realrange.style_aggressive')],
              ]}
            />
            <FactorGroup
              icon={<BatteryCharging className="w-4 h-4 text-green-400" />}
              label={t('realrange.age')}
              value={age}
              onChange={setAge}
              options={[
                ['new', t('realrange.age_new')],
                ['mid', t('realrange.age_mid')],
                ['old', t('realrange.age_old')],
              ]}
            />
          </div>

          {/* Result */}
          {result && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/30 text-center animate-in fade-in duration-500">
              <div className="text-xs text-primary/70 uppercase tracking-widest mb-2">
                {t('realrange.result_label')}
              </div>
              <div className="text-5xl md:text-6xl font-bold font-headline text-primary neon-text">
                {result.low.toLocaleString()}–{result.high.toLocaleString()}
                <span className="text-xl font-light text-muted-foreground ml-2">
                  {t('realrange.unit')}
                </span>
              </div>
              <div className="mt-3 inline-block text-sm px-4 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                {t('realrange.result_percent').replace('{percent}', String(result.percent))}
              </div>
              <div className="mt-5 flex justify-center">
                <ShareButton
                  captureRef={shareRef}
                  fileName="ev-real-range.png"
                  label={t('realrange.share')}
                />
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-muted-foreground font-light italic">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
            <p>{t('realrange.disclaimer')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Off-screen branded card used for the shareable image */}
      {result && (
        <div className="fixed -left-[9999px] top-0 pointer-events-none" aria-hidden>
          <div
            ref={shareRef}
            style={{
              width: 600,
              padding: 48,
              background: 'linear-gradient(135deg, #15303d 0%, #121516 70%)',
              color: '#ffffff',
              fontFamily: 'sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <Zap style={{ width: 26, height: 26, color: '#33bcff' }} fill="#33bcff" />
              <span style={{ fontSize: 22, fontWeight: 700, color: '#33bcff', letterSpacing: 1 }}>
                {SITE_NAME}
              </span>
            </div>

            {selectedCar && (
              <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
                {selectedCar.brand} {selectedCar.model}
              </div>
            )}
            <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 24 }}>
              {t('realrange.result_label')}
            </div>

            <div style={{ fontSize: 72, fontWeight: 800, color: '#33bcff', lineHeight: 1 }}>
              {result.low.toLocaleString()}–{result.high.toLocaleString()}
              <span style={{ fontSize: 28, fontWeight: 400, color: '#94a3b8', marginLeft: 10 }}>
                {t('realrange.unit')}
              </span>
            </div>
            <div style={{ fontSize: 18, color: '#cbd5e1', marginTop: 14 }}>
              {t('realrange.result_percent').replace('{percent}', String(result.percent))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
              {[
                t(`realrange.climate_${climate}`),
                t(`realrange.driving_${driving}`),
                t(`realrange.style_${style}`),
                t(`realrange.age_${age}`),
              ].map((c, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 14,
                    color: '#cbd5e1',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 999,
                    padding: '4px 14px',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 36, fontSize: 14, color: '#64748b' }}>
              {SITE_URL.replace(/^https?:\/\//, '')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FactorGroup<T extends string>({
  icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: [T, string][];
}) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map(([key, text]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
              value === key
                ? 'bg-primary text-primary-foreground border-primary neon-glow'
                : 'bg-white/5 text-muted-foreground border-white/10 hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
