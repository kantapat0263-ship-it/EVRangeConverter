"use client"

import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CostCalculator } from '@/components/cost-calculator';
import { Battery, Zap, Gauge, MapPin } from 'lucide-react';

type Standard = 'CLTC' | 'WLTP' | 'EPA' | 'NEDC';

const standardDescriptions: Record<Standard, string> = {
  CLTC: 'Optimistic range',
  WLTP: 'Balanced standard',
  EPA: 'Real-world estimate',
  NEDC: 'Legacy standard'
};

export function EVConverter() {
  const [activeStandard, setActiveStandard] = useState<Standard>('CLTC');
  const [inputValue, setInputValue] = useState<string>('');
  const [results, setResults] = useState<Record<Standard, number>>({
    CLTC: 0,
    WLTP: 0,
    EPA: 0,
    NEDC: 0
  });

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      setResults({ CLTC: 0, WLTP: 0, EPA: 0, NEDC: 0 });
      return;
    }

    let cltc = 0;
    if (activeStandard === 'CLTC') cltc = val;
    else if (activeStandard === 'WLTP') cltc = val / 0.82;
    else if (activeStandard === 'EPA') cltc = (val * 1.168) / 0.82;
    else if (activeStandard === 'NEDC') cltc = (val * 0.85) / 0.82;

    setResults({
      CLTC: cltc,
      WLTP: cltc * 0.82,
      EPA: (cltc * 0.82) / 1.168,
      NEDC: (cltc * 0.82) / 0.85
    });
  }, [inputValue, activeStandard]);

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
  };

  const getIcon = (std: Standard) => {
    switch (std) {
      case 'CLTC': return <Battery className="w-5 h-5 text-primary" />;
      case 'WLTP': return <Zap className="w-5 h-5 text-secondary" />;
      case 'EPA': return <Gauge className="w-5 h-5 text-orange-400" />;
      case 'NEDC': return <MapPin className="w-5 h-5 text-green-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="glass border-primary/20 overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <Tabs 
            value={activeStandard} 
            onValueChange={(v) => setActiveStandard(v as Standard)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full bg-white/5 p-1 h-14">
              {(['CLTC', 'WLTP', 'EPA', 'NEDC'] as Standard[]).map((std) => (
                <TabsTrigger 
                  key={std} 
                  value={std}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm transition-all duration-300 flex flex-col items-center justify-center gap-0.5 h-full"
                >
                  <span className="font-bold">{std}</span>
                  <span className="text-[8px] md:text-[9px] opacity-70 font-light hidden sm:block uppercase tracking-tighter">
                    {standardDescriptions[std].split(' ')[0]}...
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <Input
              type="number"
              placeholder="ใส่ระยะทาง (กม.)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="relative h-16 text-2xl bg-[#121516] border-white/10 rounded-xl px-6 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/30 font-headline"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-light tracking-widest text-xs md:text-sm">
              KM / {activeStandard}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(['CLTC', 'WLTP', 'EPA', 'NEDC'] as Standard[]).map((std) => (
          <Card 
            key={std} 
            className={`glass-card relative overflow-hidden group ${std === activeStandard ? 'border-primary/50' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">{std} STANDARD</span>
                    {std === 'EPA' && (
                      <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30 font-medium whitespace-nowrap">
                        ใกล้เคียงที่สุด
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground/50 font-light leading-tight mt-0.5">
                    {standardDescriptions[std]}
                  </span>
                </div>
                {getIcon(std)}
              </div>
              <div className="flex flex-col">
                <span className={`text-4xl font-bold font-headline transition-all duration-500 ${std === activeStandard ? 'text-primary scale-110 origin-left' : 'text-white'}`}>
                  {formatNumber(results[std])}
                </span>
                <span className="text-sm text-muted-foreground mt-1">กิโลเมตร</span>
              </div>
              {std === activeStandard && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary neon-glow" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <CostCalculator kmPerCharge={results[activeStandard] || 100} />
      </div>
    </div>
  );
}
