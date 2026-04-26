"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Zap, MapPin, TrendingDown, Info, Calculator } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function EVMonthlyEstimator() {
  const { t } = useLanguage();
  const [touKwh, setTouKwh] = useState<string>('647');
  const [vehicleCons, setVehicleCons] = useState<string>('13.1');
  const [lossFactor, setLossFactor] = useState<number[]>([38]);
  const [monthlyCost, setMonthlyCost] = useState<string>('1993.55');

  const [results, setResults] = useState<{
    distance: number;
    adjustedCons: number;
    costPerKm: number | null;
  } | null>(null);

  const calculate = () => {
    const tou = parseFloat(touKwh);
    const cons = parseFloat(vehicleCons);
    const loss = lossFactor[0];
    const cost = parseFloat(monthlyCost);

    if (isNaN(tou) || isNaN(cons)) return;

    const adjustedCons = cons * (1 + loss / 100);
    const estimatedDistance = tou / (adjustedCons / 100);
    const costPerKm = isNaN(cost) ? null : cost / estimatedDistance;

    setResults({
      distance: estimatedDistance,
      adjustedCons: adjustedCons,
      costPerKm: costPerKm
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <h2 className="text-3xl font-bold tracking-tight">
          {t('monthly.title')}
        </h2>
      </div>

      <Card className="glass border-primary/20 overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  {t('monthly.tou_usage')}
                </Label>
                <Input
                  type="number"
                  value={touKwh}
                  onChange={(e) => setTouKwh(e.target.value)}
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="647"
                />
                <p className="text-[10px] text-muted-foreground font-light italic">
                  {t('monthly.tou_desc')}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-secondary" />
                  {t('monthly.vehicle_cons')}
                </Label>
                <Input
                  type="number"
                  value={vehicleCons}
                  onChange={(e) => setVehicleCons(e.target.value)}
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="13.1"
                />
                <p className="text-[10px] text-muted-foreground font-light italic">
                  {t('monthly.vehicle_desc')}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-orange-400" />
                    {t('monthly.loss_factor')}
                  </Label>
                  <span className="text-primary font-bold">{lossFactor[0]}%</span>
                </div>
                <Slider
                  value={lossFactor}
                  onValueChange={setLossFactor}
                  max={60}
                  step={1}
                  className="py-4"
                />
                <p className="text-[10px] text-muted-foreground font-light italic">
                  {t('monthly.loss_desc')}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {t('monthly.monthly_cost')}
                </Label>
                <Input
                  type="number"
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(e.target.value)}
                  className="bg-white/5 border-white/10 h-12"
                  placeholder="1993.55"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={calculate}
            className="w-full h-14 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(51,188,255,0.4)] hover:shadow-[0_0_30px_rgba(51,188,255,0.6)] transition-all duration-300"
          >
            {t('monthly.calculate')}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card border-primary/30 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('monthly.res_distance')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-headline text-primary">
                  {results.distance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-sm font-normal text-muted-foreground ml-2">km</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary neon-glow" />
            </CardContent>
          </Card>

          <Card className="glass-card border-secondary/30 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('monthly.res_adjusted')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-headline text-secondary">
                  {results.adjustedCons.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-2">kWh/100km</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary neon-glow" />
            </CardContent>
          </Card>

          <Card className="glass-card border-orange-400/30 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-orange-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('monthly.res_cost_km')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-headline text-orange-400">
                  {results.costPerKm ? results.costPerKm.toFixed(2) : '-'}
                  <span className="text-sm font-normal text-muted-foreground ml-2">THB/km</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-400 neon-glow" />
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground font-light leading-relaxed italic">
            {t('monthly.disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
}
