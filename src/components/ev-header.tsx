"use client"

import { Zap } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function EVHeader() {
  const { t } = useLanguage();

  return (
    <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
      <div className="flex justify-center mb-6">
        <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30 neon-glow animate-pulse">
          <Zap className="w-10 h-10 text-primary" fill="currentColor" />
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-headline neon-text">
        {t('header.title')}
      </h1>
      <p className="text-xl md:text-2xl font-light text-secondary tracking-widest uppercase animate-glow-pulse">
        {t('header.subtitle')}
      </p>
    </div>
  );
}
