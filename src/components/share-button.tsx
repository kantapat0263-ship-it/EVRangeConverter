"use client"

import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Loader2 } from 'lucide-react';

/**
 * Captures a (usually off-screen) DOM node as a PNG and shares it via the Web
 * Share API where available, otherwise downloads it. Pure client-side — no API.
 */
export function ShareButton({
  captureRef,
  fileName = 'ev-range-result.png',
  label,
}: {
  captureRef: React.RefObject<HTMLElement | null>;
  fileName?: string;
  label: string;
}) {
  const [busy, setBusy] = useState(false);

  const handleShare = async () => {
    const node = captureRef.current;
    if (!node || busy) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#121516',
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName, { type: 'image/png' });

      // Prefer native share sheet (mobile) when it can handle the file.
      if (
        typeof navigator !== 'undefined' &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({ files: [file] });
      } else {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        link.click();
      }
    } catch (err) {
      // Swallow user-cancelled shares; log anything unexpected.
      console.error('Share failed:', err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={busy}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary font-medium text-sm transition-all duration-200 disabled:opacity-60"
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
      {label}
    </button>
  );
}
