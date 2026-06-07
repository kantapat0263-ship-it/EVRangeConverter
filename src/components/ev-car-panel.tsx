"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EVCarSelector } from '@/components/ev-car-selector';
import { useLanguage } from '@/context/language-context';

/**
 * Prominent car picker at the top of the page. Selecting a car here feeds every
 * tool below (real-range, converter, savings, accessories) via CarContext.
 */
export function EVCarPanel() {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold tracking-tight">{t('section.car_title')}</h2>
        <p className="text-sm text-muted-foreground font-light">{t('section.car_sub')}</p>
      </div>
      <Card className="glass border-primary/30 overflow-hidden">
        <CardContent className="p-6">
          <EVCarSelector />
        </CardContent>
      </Card>
    </div>
  );
}
