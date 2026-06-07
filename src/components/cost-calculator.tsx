"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Zap, Fuel, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useCar } from '@/context/car-context';

export function CostCalculator({
  kmPerCharge,
  batteryKwh,
}: {
  kmPerCharge?: number;
  batteryKwh?: number;
}) {
  const { t } = useLanguage();
  const { selectedCar } = useCar();

  // Range per full charge: use the value passed in, else the selected car's
  // range, else a sensible default. Battery size mirrors the same priority.
  const effectiveKm = kmPerCharge ?? selectedCar?.range ?? 400;
  const effectiveBattery = batteryKwh ?? selectedCar?.batteryKwh;

  const [electricityRate, setElectricityRate] = useState<string>("4.2");
  const [batterySize, setBatterySize] = useState<string>("60");

  // Common Thailand charging sources (approximate THB/kWh, editable).
  const chargingPresets: { key: string; rate: number }[] = [
    { key: 'home_offpeak', rate: 2.6 },
    { key: 'home_normal', rate: 4.2 },
    { key: 'home_onpeak', rate: 5.8 },
    { key: 'public_ac', rate: 7.5 },
    { key: 'dc_fast', rate: 8.0 },
  ];

  // Pre-fill the battery size when a car is selected upstream (still editable).
  useEffect(() => {
    if (effectiveBattery) setBatterySize(String(effectiveBattery));
  }, [effectiveBattery]);
  const [gasPrice, setGasPrice] = useState<string>("38");
  const [fuelEconomy, setFuelEconomy] = useState<string>("15"); // km/L

  const evCostPerKm = (parseFloat(batterySize) * parseFloat(electricityRate)) / effectiveKm;
  const gasCostPerKm = parseFloat(gasPrice) / parseFloat(fuelEconomy);
  const savings = gasCostPerKm - evCostPerKm;

  return (
    <Card className="glass border-white/5 overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-white/5 py-4">
        <CardTitle className="text-lg font-light flex items-center gap-2 tracking-widest uppercase">
          <TrendingDown className="w-5 h-5 text-secondary" />
          {t('cost.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6 flex-1">
        {/* Thailand charging-source presets */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">{t('charging.title')}</Label>
          <div className="flex flex-wrap gap-2">
            {chargingPresets.map(({ key, rate }) => {
              const active = parseFloat(electricityRate) === rate;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setElectricityRate(String(rate))}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${
                    active
                      ? 'bg-secondary text-secondary-foreground border-secondary'
                      : 'bg-white/5 text-muted-foreground border-white/10 hover:border-secondary/40 hover:text-foreground'
                  }`}
                >
                  {t(`charging.${key}`)} · {rate}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">{t('cost.rate')}</Label>
            <Input 
              type="number" 
              value={electricityRate} 
              onChange={(e) => setElectricityRate(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">{t('cost.battery')}</Label>
            <Input 
              type="number" 
              value={batterySize} 
              onChange={(e) => setBatterySize(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">{t('cost.gas_price')}</Label>
            <Input 
              type="number" 
              value={gasPrice} 
              onChange={(e) => setGasPrice(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">{t('cost.economy')}</Label>
            <Input 
              type="number" 
              value={fuelEconomy} 
              onChange={(e) => setFuelEconomy(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm">{t('cost.ev_avg')}</span>
            </div>
            <span className="font-bold text-primary">
              {isNaN(evCostPerKm) ? "0.00" : evCostPerKm.toFixed(2)} {t('cost.per_km')}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-orange-400" />
              <span className="text-sm">{t('cost.ice_avg')}</span>
            </div>
            <span className="font-bold text-white">
              {isNaN(gasCostPerKm) ? "0.00" : gasCostPerKm.toFixed(2)} {t('cost.per_km')}
            </span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/20">
            <div className="text-xs text-secondary/70 uppercase tracking-widest mb-1">{t('cost.savings_label')}</div>
            <div className="text-3xl font-bold text-secondary">
              {!isNaN(savings) && savings > 0 ? (savings * 1000).toFixed(0) : 0} <span className="text-sm font-light">{t('cost.savings_unit')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
