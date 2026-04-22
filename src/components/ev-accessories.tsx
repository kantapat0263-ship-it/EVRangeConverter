"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingBag, ExternalLink } from 'lucide-react';

export function EVAccessories() {
  return (
    <div className="w-full space-y-6 mt-12">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(117,240,219,0.8)]" />
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          🛍️ อุปกรณ์รถ EV ที่แนะนำ
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PlaceHolderImages.map((item) => (
          <a 
            key={item.id}
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="glass-card border-white/5 overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-2">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title || item.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={item.imageHint}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <CardContent className="p-4 bg-white/[0.02]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      {item.description}
                    </p>
                  </div>
                  <ShoppingBag className="w-5 h-5 text-secondary shrink-0" />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
