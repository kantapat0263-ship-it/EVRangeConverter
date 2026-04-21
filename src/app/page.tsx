import { EVConverter } from '@/components/ev-converter';
import { EVHeader } from '@/components/ev-header';
import { EVInformation } from '@/components/ev-information';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center gap-12">
      <EVHeader />
      <div className="w-full max-w-4xl space-y-12">
        <EVConverter />
        <EVInformation />
      </div>
      
      <footer className="mt-12 text-muted-foreground text-sm font-light text-center">
        <p>© {new Date().getFullYear()} EV Range Converter. Built for the future of mobility.</p>
        <p className="mt-2 text-xs opacity-50">SEO Keywords: EV Thailand, CLTC to WLTP, EPA Range Converter, Electric Vehicle Range</p>
      </footer>
    </main>
  );
}
