"use client"

import React, { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Car, Battery, Gauge, X } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useCar } from '@/context/car-context';
import { EV_CARS } from '@/lib/ev-cars';

export function EVCarSelector() {
  const { t } = useLanguage();
  const { selectedCarId, selectedCar, setSelectedCarId } = useCar();

  // Group models by brand for the dropdown.
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
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
          <Car className="w-4 h-4 text-primary" />
          {t('car.label')}
        </label>
        {selectedCar && (
          <button
            type="button"
            onClick={() => setSelectedCarId(null)}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            {t('car.clear')}
          </button>
        )}
      </div>

      <Select
        value={selectedCarId ?? ''}
        onValueChange={(v) => setSelectedCarId(v || null)}
      >
        <SelectTrigger className="h-14 bg-[#121516] border-white/10 text-base">
          <SelectValue placeholder={t('car.placeholder')} />
        </SelectTrigger>
        <SelectContent className="max-h-80">
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

      {selectedCar && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
            <Battery className="w-3.5 h-3.5" />
            {t('car.battery')}: {selectedCar.batteryKwh} kWh
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Gauge className="w-3.5 h-3.5" />
            {t('car.range')}: {selectedCar.range} km ({selectedCar.standard})
          </span>
          <span className="text-muted-foreground font-light italic ml-1">
            {t('car.note')}
          </span>
        </div>
      )}
    </div>
  );
}
