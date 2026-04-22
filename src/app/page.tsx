import Image from 'next/image';
import { EVConverter } from '@/components/ev-converter';
import { EVHeader } from '@/components/ev-header';
import { EVInformation } from '@/components/ev-information';
import { EVAccessories } from '@/components/ev-accessories';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center gap-12">
      <EVHeader />
      <div className="w-full max-w-4xl space-y-12">
        <EVConverter />
        <EVInformation />
        <EVAccessories />
      </div>
      
      <footer className="mt-12 text-muted-foreground text-sm font-light text-center flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <a 
            href="https://www.facebook.com/lek8528" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center gap-2 transition-all duration-300"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary group-hover:scale-110 transition-all duration-300 neon-glow">
              <Image 
                src="https://img1.pic.in.th/images/ChatGPT-Image-22-..-2569-17_00_13.png" 
                alt="Facebook Page" 
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[10px] text-muted-foreground group-hover:text-primary tracking-[0.2em] uppercase font-medium transition-colors">
              ติดตั้งลำโพงคุณภาพ
            </span>
          </a>
        </div>

        <div className="space-y-1">
          <p>© {new Date().getFullYear()} EV Range Converter. Built for the future of mobility.</p>
          <p className="text-xs opacity-50">SEO Keywords: EV Thailand, CLTC to WLTP, EPA Range Converter, Electric Vehicle Range</p>
        </div>
      </footer>
    </main>
  );
}
