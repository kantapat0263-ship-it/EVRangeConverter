"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingBag, ExternalLink } from 'lucide-react';

export function EVAccessories() {
  const accessory = PlaceHolderImages.find(img => img.id === 'ev-accessory-1');
  const shopeeUrl = "https://s.shopee.co.th/9fH8UwUmv8?share_channel_code=6";

  return (
    <div className="w-full space-y-6 mt-12">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(117,240,219,0.8)]" />
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          🛍️ อุปกรณ์รถ EV ที่น่าสนใจ
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <a 
          href={shopeeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group block"
        >
          <Card className="glass-card border-white/5 overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
            <div className="relative aspect-square w-full overflow-hidden">
              {accessory && (
                <Image
                  src={accessory.imageUrl}
                  alt={accessory.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={accessory.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-primary text-primary-foreground p-3 rounded-full">
                  <ExternalLink className="w-6 h-6" />
                </div>
              </div>
            </div>
            <CardContent className="p-4 bg-white/[0.02]">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    เบาะรองนั่งกันสีกางเกงยีนส์สำหรับ BYD
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 font-light">
                    เพิ่มความสบายและปกป้องเบาะรถของคุณ
                  </p>
                </div>
                <ShoppingBag className="w-5 h-5 text-secondary shrink-0" />
              </div>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}
