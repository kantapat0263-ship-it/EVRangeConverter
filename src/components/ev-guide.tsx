"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, CheckCircle2, AlertCircle, Users, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function EVGuide() {
  const { t } = useLanguage();

  return (
    <div className="space-y-12 mt-12">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <h2 className="text-3xl font-bold tracking-tight">
          {t('guide.title')}
        </h2>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          {t('guide.intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <HelpCircle className="w-6 h-6 text-primary" />
              {t('guide.q_what_is_range')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground font-light">
              {t('guide.a_what_is_range')}
            </p>
            <p className="text-muted-foreground font-light">
              {t('guide.a_what_is_range_2')}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
              {t('guide.q_why_use')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(t('guide.reasons') as string[]).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-400" />
          {t('guide.factors_title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(t('guide.factors') as any[]).map((item, i) => (
            <div key={i} className="p-4 rounded-xl glass-card border-white/5">
              <h4 className="font-bold text-sm mb-2 text-white">{item.title}</h4>
              <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Users className="w-6 h-6 text-blue-400" />
              {t('guide.who_is_it_for')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(t('guide.users') as string[]).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              {t('guide.summary_title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground font-light leading-relaxed">
              {t('guide.summary_text')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
