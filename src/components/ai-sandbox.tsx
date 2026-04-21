"use client"

import React, { useState, useEffect } from 'react';
import { explainRangeStandards, type ExplainRangeStandardsOutput } from '@/ai/flows/explain-range-standards-flow';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Info } from 'lucide-react';

export function AISandbox() {
  const [explanations, setExplanations] = useState<ExplainRangeStandardsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const result = await explainRangeStandards({
          standards: ['CLTC', 'WLTP', 'EPA', 'NEDC']
        });
        setExplanations(result);
      } catch (error) {
        console.error("Failed to fetch AI explanations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInfo();
  }, []);

  return (
    <Card className="glass border-white/5 flex flex-col h-full">
      <CardHeader className="bg-white/5 py-4">
        <CardTitle className="text-lg font-light flex items-center gap-2 tracking-widest uppercase">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Standard Insight
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 overflow-auto custom-scrollbar flex-1">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24 bg-white/10" />
                <Skeleton className="h-16 w-full bg-white/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {explanations && Object.entries(explanations).map(([std, text]) => (
              <div key={std} className="group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h4 className="text-sm font-bold text-primary tracking-widest">{std}</h4>
                </div>
                <div className="relative p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] group-hover:border-primary/20 transition-all duration-300">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-4">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-200/70 font-light italic">
                ข้อมูลสรุปโดย AI เพื่อช่วยให้คุณเข้าใจความแตกต่างในการวัดระยะทางในแต่ละภูมิภาค
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
