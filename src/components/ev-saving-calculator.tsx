"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Banknote, TrendingUp, Calendar, Percent, Info } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function EVSavingCalculator() {
  const { t } = useLanguage();
  const [gasCost, setGasCost] = useState<string>('6000');
  const [evCost, setEvCost] = useState<string>('2000');
  const [years, setYears] = useState<string>('5');

  const [results, setResults] = useState<{
    monthly: number;
    yearly: number;
    longterm: number;
    percentage: number;
    displayYears: number;
  } | null>(null);

  const calculate = () => {
    const gas = parseFloat(gasCost);
    const ev = parseFloat(evCost);
    const y = parseFloat(years);

    if (isNaN(gas) || isNaN(ev) || gas <= 0) return;

    const monthlySaving = gas - ev;
    const yearlySaving = monthlySaving * 12;
    const longTermSaving = yearlySaving * (isNaN(y) ? 5 : y);
    const percentage = (monthlySaving / gas) * 100;

    setResults({
      monthly: monthlySaving,
      yearly: yearlySaving,
      longterm: longTermSaving,
      percentage: percentage,
      displayYears: isNaN(y) ? 5 : y
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <h2 className="text-3xl font-bold tracking-tight">
          {t('saving.title')}
        </h2>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          {t('saving.intro')}
        </p>
      </div>

      <Card className="glass border-primary/20 overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Banknote className="w-4 h-4 text-orange-400" />
                {t('saving.gas_label')}
              </Label>
              <Input
                type="number"
                value={gasCost}
                onChange={(e) => setGasCost(e.target.value)}
                className="bg-white/5 border-white/10 h-12"
                placeholder="6000"
              />
              <p className="text-[10px] text-muted-foreground font-light italic">
                {t('saving.gas_desc')}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                {t('saving.ev_label')}
              </Label>
              <Input
                type="number"
                value={evCost}
                onChange={(e) => setEvCost(e.target.value)}
                className="bg-white/5 border-white/10 h-12"
                placeholder="2000"
              />
              <p className="text-[10px] text-muted-foreground font-light italic">
                {t('saving.ev_desc')}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                {t('saving.years_label')}
              </Label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="bg-white/5 border-white/10 h-12"
                placeholder="5"
              />
              <p className="text-[10px] text-muted-foreground font-light italic">
                {t('saving.years_desc')}
              </p>
            </div>
          </div>

          <Button 
            onClick={calculate}
            className="w-full h-14 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(51,188,255,0.4)] hover:shadow-[0_0_30px_rgba(51,188,255,0.6)] transition-all duration-300"
          >
            {t('saving.calculate')}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card border-primary/30 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('saving.res_monthly')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-headline text-primary">
                  {results.monthly.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-2">{t('saving.unit_baht')}</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary neon-glow" />
            </CardContent>
          </Card>

          <Card className="glass-card border-secondary/30 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('saving.res_yearly')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-headline text-secondary">
                  {results.yearly.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-2">{t('saving.unit_baht')}</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary neon-glow" />
            </CardContent>
          </Card>

          <Card className="glass-card border-orange-400/30 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="w-5 h-5 text-orange-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('saving.res_longterm').replace('{years}', results.displayYears.toString())}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-headline text-orange-400">
                  {results.longterm.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-2">{t('saving.unit_baht')}</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-400 neon-glow" />
            </CardContent>
          </Card>

          <Card className="glass-card border-green-400/30 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-5 h-5 text-green-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('saving.res_percentage')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-headline text-green-400">
                  {results.percentage.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-2">%</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-400 neon-glow" />
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground font-light leading-relaxed italic">
            {t('saving.disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
}
