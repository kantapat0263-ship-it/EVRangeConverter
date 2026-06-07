"use client"

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CostCalculator } from '@/components/cost-calculator';
import { EVSavingCalculator } from '@/components/ev-saving-calculator';
import { useLanguage } from '@/context/language-context';

/**
 * Unified "Cost & Savings" section: one heading, two clearly-labelled modes
 * (per-kilometre vs monthly bill) instead of two scattered calculators.
 */
export function EVSavings() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(117,240,219,0.8)]" />
        <h2 className="text-3xl font-bold tracking-tight">{t('section.savings_title')}</h2>
      </div>

      <Tabs defaultValue="perkm" className="w-full">
        <TabsList className="grid grid-cols-2 w-full bg-white/5 p-1 h-12 mb-6">
          <TabsTrigger
            value="perkm"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-sm"
          >
            {t('section.savings_tab_perkm')}
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-sm"
          >
            {t('section.savings_tab_monthly')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perkm" className="mt-0">
          <CostCalculator />
        </TabsContent>
        <TabsContent value="monthly" className="mt-0">
          <EVSavingCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
