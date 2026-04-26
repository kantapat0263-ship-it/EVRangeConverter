import { EVConverter } from '@/components/ev-converter';
import { EVMonthlyEstimator } from '@/components/ev-monthly-estimator';
import { EVHeader } from '@/components/ev-header';
import { EVInformation } from '@/components/ev-information';
import { EVAccessories } from '@/components/ev-accessories';
import { EVGuide } from '@/components/ev-guide';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <LanguageSwitcher />
        <main id="top" className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center gap-12 relative">
          <SidebarTrigger className="fixed top-4 left-4 z-50 md:hidden bg-primary/20 hover:bg-primary/40 border border-primary/30" />
          
          <EVHeader />
          
          <div className="w-full max-w-4xl space-y-24">
            <section id="converter" className="scroll-mt-24">
              <EVConverter />
            </section>

            <section id="monthly" className="scroll-mt-24">
              <EVMonthlyEstimator />
            </section>

            <section id="guide" className="scroll-mt-24">
              <EVGuide />
            </section>
            
            <section id="info" className="scroll-mt-24">
              <EVInformation />
            </section>
            
            <section id="accessories" className="scroll-mt-24">
              <EVAccessories />
            </section>
          </div>
          
          <Footer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
