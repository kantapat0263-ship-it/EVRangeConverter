"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trophy } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useCar } from '@/context/car-context';
import { EV_CARS, getCarById, toEpaKm } from '@/lib/ev-cars';

function CarPicker({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
}) {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof EV_CARS>();
    for (const car of EV_CARS) {
      const list = map.get(car.brand) ?? [];
      list.push(car);
      map.set(car.brand, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 bg-[#121516] border-white/10">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {grouped.map(([brand, cars]) => (
          <SelectGroup key={brand}>
            <SelectLabel className="text-primary">{brand}</SelectLabel>
            {cars.map((car) => (
              <SelectItem key={car.id} value={car.id}>
                {car.model}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export function EVCompare() {
  const { t } = useLanguage();
  const { selectedCar } = useCar();

  const [idA, setIdA] = useState<string>('');
  const [idB, setIdB] = useState<string>('');

  // Seed the first slot with the user's saved car for convenience.
  useEffect(() => {
    if (selectedCar && !idA) setIdA(selectedCar.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCar?.id]);

  const carA = getCarById(idA);
  const carB = getCarById(idB);

  const metrics = useMemo(() => {
    if (!carA || !carB) return null;
    const realA = toEpaKm(carA.range, carA.standard);
    const realB = toEpaKm(carB.range, carB.standard);
    return {
      realA: Math.round(realA),
      realB: Math.round(realB),
      effA: realA / carA.batteryKwh,
      effB: realB / carB.batteryKwh,
    };
  }, [carA, carB]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(117,240,219,0.8)]" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('compare.title')}</h2>
          <p className="text-sm text-muted-foreground font-light mt-1">
            {t('compare.subtitle')}
          </p>
        </div>
      </div>

      <Card className="glass border-secondary/20 overflow-hidden">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Pickers */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {t('compare.car_a')}
              </span>
              <CarPicker value={idA} onChange={setIdA} placeholder={t('compare.pick')} />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                {t('compare.car_b')}
              </span>
              <CarPicker value={idB} onChange={setIdB} placeholder={t('compare.pick')} />
            </div>
          </div>

          {!metrics ? (
            <p className="text-sm text-muted-foreground font-light italic text-center py-6">
              {t('compare.empty')}
            </p>
          ) : (
            <div className="divide-y divide-white/5 animate-in fade-in duration-500">
              {/* Car names header */}
              <div className="grid grid-cols-2 gap-3 pb-4">
                <div className="text-center font-bold text-primary">{carA!.model}</div>
                <div className="text-center font-bold text-secondary">{carB!.model}</div>
              </div>

              <Row
                label={t('compare.battery')}
                a={`${carA!.batteryKwh} kWh`}
                b={`${carB!.batteryKwh} kWh`}
              />
              <Row
                label={t('compare.advertised')}
                a={`${carA!.range} (${carA!.standard})`}
                b={`${carB!.range} (${carB!.standard})`}
              />
              <Row
                label={t('compare.real')}
                a={`${metrics.realA.toLocaleString()} km`}
                b={`${metrics.realB.toLocaleString()} km`}
                winner={metrics.realA === metrics.realB ? 0 : metrics.realA > metrics.realB ? -1 : 1}
                betterLabel={t('compare.better')}
                highlight
              />
              <Row
                label={t('compare.efficiency')}
                a={`${metrics.effA.toFixed(1)} km/kWh`}
                b={`${metrics.effB.toFixed(1)} km/kWh`}
                winner={
                  metrics.effA.toFixed(1) === metrics.effB.toFixed(1)
                    ? 0
                    : metrics.effA > metrics.effB
                    ? -1
                    : 1
                }
                betterLabel={t('compare.better')}
                highlight
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({
  label,
  a,
  b,
  winner = 0,
  betterLabel,
  highlight = false,
}: {
  label: string;
  a: string;
  b: string;
  winner?: -1 | 0 | 1; // -1 => A wins, 1 => B wins, 0 => tie
  betterLabel?: string;
  highlight?: boolean;
}) {
  const cell = (text: string, isWinner: boolean, side: 'a' | 'b') => (
    <div
      className={`flex flex-col items-center justify-center gap-1 py-3 rounded-lg ${
        highlight && isWinner
          ? side === 'a'
            ? 'bg-primary/10 border border-primary/30'
            : 'bg-secondary/10 border border-secondary/30'
          : ''
      }`}
    >
      <span
        className={`text-lg font-bold ${
          highlight && isWinner
            ? side === 'a'
              ? 'text-primary'
              : 'text-secondary'
            : 'text-foreground'
        }`}
      >
        {text}
      </span>
      {isWinner && betterLabel && (
        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
          <Trophy className="w-3 h-3 text-yellow-400" />
          {betterLabel}
        </span>
      )}
    </div>
  );

  return (
    <div className="py-2">
      <div className="text-center text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-1">
        {label}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cell(a, winner === -1, 'a')}
        {cell(b, winner === 1, 'b')}
      </div>
    </div>
  );
}
