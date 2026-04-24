"use client"

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 px-3 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${
          language === 'th' ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(51,188,255,0.5)]' : 'text-muted-foreground'
        }`}
        onClick={() => setLanguage('th')}
      >
        TH
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 px-3 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${
          language === 'en' ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(51,188,255,0.5)]' : 'text-muted-foreground'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
    </div>
  );
}
