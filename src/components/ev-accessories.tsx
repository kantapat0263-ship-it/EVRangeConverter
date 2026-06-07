"use client"

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const UNIVERSAL = 'Universal';

export function EVAccessories() {
  const { t } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Brands that have at least one dedicated accessory (excluding Universal).
  const brands = useMemo(
    () =>
      Array.from(
        new Set(
          PlaceHolderImages.map((i) => i.brand).filter(
            (b): b is string => !!b && b !== UNIVERSAL
          )
        )
      ).sort(),
    []
  );

  // When a brand is picked, show its items first, then universal items that fit any car.
  const items = useMemo(() => {
    if (selectedBrand === 'all') return PlaceHolderImages;
    const branded = PlaceHolderImages.filter((i) => i.brand === selectedBrand);
    const universal = PlaceHolderImages.filter((i) => i.brand === UNIVERSAL);
    return [...branded, ...universal];
  }, [selectedBrand]);

  const hasBranded =
    selectedBrand === 'all' ||
    PlaceHolderImages.some((i) => i.brand === selectedBrand);

  const chipBase =
    'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap';
  const chipActive = 'bg-primary text-primary-foreground border-primary neon-glow';
  const chipIdle =
    'bg-white/5 text-muted-foreground border-white/10 hover:border-primary/40 hover:text-foreground';

  return (
    <div className="w-full space-y-6 mt-12">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(117,240,219,0.8)]" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {t('accessories.title')}
          </h2>
          <p className="text-sm text-muted-foreground font-light mt-1">
            {t('accessories.subtitle')}
          </p>
        </div>
      </div>

      {/* Brand filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedBrand('all')}
          className={`${chipBase} ${selectedBrand === 'all' ? chipActive : chipIdle}`}
        >
          {t('accessories.filter_all')}
        </button>
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => setSelectedBrand(brand)}
            className={`${chipBase} ${selectedBrand === brand ? chipActive : chipIdle}`}
          >
            {brand}
          </button>
        ))}
      </div>

      {!hasBranded && (
        <p className="text-sm text-muted-foreground font-light italic">
          {t('accessories.empty')}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
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
                {/* Brand / fitment badge */}
                {item.brand && (
                  <span className="absolute top-2 left-2 z-10 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-sm">
                    {item.brand === UNIVERSAL ? t('accessories.fits_all') : item.brand}
                  </span>
                )}
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

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm font-light">
          {t('info.seo_link')}
          <a href="/" className="text-primary hover:underline font-medium ml-2">EV Range Calculator Tool</a>
        </p>
      </div>
    </div>
  );
}
