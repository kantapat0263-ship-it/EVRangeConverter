"use client"

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { EVGuide } from '@/components/ev-guide';
import { EVInformation } from '@/components/ev-information';
import { BookOpen, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

/**
 * Collapses the long Guide + Standards content into an accordion so it no
 * longer buries the tools, while keeping the text on the page for SEO.
 * The first item is open by default.
 */
export function EVKnowledge() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('section.knowledge_title')}</h2>
          <p className="text-sm text-muted-foreground font-light mt-1">
            {t('section.knowledge_sub')}
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="guide" className="space-y-4">
        <AccordionItem value="guide" className="border border-white/10 rounded-2xl px-6 bg-white/[0.02]">
          <AccordionTrigger className="text-lg font-bold hover:no-underline">
            <span className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              {t('nav.guide')}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <EVGuide />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="info" className="border border-white/10 rounded-2xl px-6 bg-white/[0.02]">
          <AccordionTrigger className="text-lg font-bold hover:no-underline">
            <span className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-secondary" />
              {t('nav.info')}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <EVInformation />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
