"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ShieldCheck, History, Landmark, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function EVInformation() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 mt-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          ⚡ {t('info.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CLTC */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <Landmark className="w-5 h-5" />
              {t('info.cltc_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {t('info.cltc_desc')}
              <span className="block mt-1 text-primary/80">{t('info.cltc_highlight')}</span>
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{t('info.cltc_summary')}</span>
              <p className="text-sm mt-1">{t('info.cltc_summary_text')}</p>
            </div>
          </CardContent>
        </Card>

        {/* WLTP */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-secondary">
              <Globe className="w-5 h-5" />
              {t('info.wltp_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {t('info.wltp_desc')}
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{t('info.wltp_summary')}</span>
              <p className="text-sm mt-1">{t('info.wltp_summary_text')}</p>
            </div>
          </CardContent>
        </Card>

        {/* EPA */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-orange-400">
              <ShieldCheck className="w-5 h-5" />
              {t('info.epa_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {t('info.epa_desc')}
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">{t('info.epa_summary')}</span>
              <p className="text-sm mt-1">{t('info.epa_summary_text')}</p>
            </div>
          </CardContent>
        </Card>

        {/* NEDC */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-400">
              <History className="w-5 h-5" />
              {t('info.nedc_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {t('info.nedc_desc')}
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-green-400">{t('info.nedc_summary')}</span>
              <p className="text-sm mt-1">{t('info.nedc_summary_text')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="py-4 text-center">
        <p className="text-muted-foreground text-sm font-light">
          {t('info.seo_link')}
          <a href="/" className="text-primary hover:underline font-medium ml-2">EV Range Calculator Tool</a>
        </p>
      </div>

      {/* Insight Section */}
      <Card className="glass border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-primary">{t('info.insight_title')}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t('info.insight_desc')}
              </p>
              <p className="text-sm font-medium text-foreground">
                {t('info.insight_recommend')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
