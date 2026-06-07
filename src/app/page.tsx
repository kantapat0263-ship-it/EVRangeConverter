import { EVConverter } from '@/components/ev-converter';
import { EVRealRange } from '@/components/ev-real-range';
import { EVSavingCalculator } from '@/components/ev-saving-calculator';
import { EVHeader } from '@/components/ev-header';
import { EVInformation } from '@/components/ev-information';
import { EVAccessories } from '@/components/ev-accessories';
import { EVGuide } from '@/components/ev-guide';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Footer } from '@/components/footer';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: ['th-TH', 'en-US'],
    },
    {
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      description: SITE_DESCRIPTION,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'EV Range คืออะไร?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EV Range คือระยะทางสูงสุดที่รถไฟฟ้าสามารถวิ่งได้จากแบตเตอรี่เต็ม 100% ขึ้นอยู่กับขนาดแบตเตอรี่ (kWh), การใช้พลังงาน (Wh/km), สภาพถนน และพฤติกรรมการขับขี่',
          },
        },
        {
          '@type': 'Question',
          name: 'ทำไมต้องใช้ EV Range Calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ช่วยวางแผนการเดินทางได้แม่นยำ รู้ว่าต้องชาร์จเมื่อไหร่ เปรียบเทียบรถ EV แต่ละรุ่นได้ และลดความเสี่ยงแบตหมดกลางทาง',
          },
        },
        {
          '@type': 'Question',
          name: 'รถ EV วิ่งจริงได้กี่กิโลเมตร? ต่างจากที่โฆษณาเท่าไหร่?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ระยะวิ่งจริงของรถ EV มักได้ประมาณ 70–85% ของตัวเลขที่โฆษณา (โดยเฉพาะค่า NEDC/CLTC) เพราะการใช้งานจริงต้องเปิดแอร์ เจอรถติด ความเร็วสูง และแบตเตอรี่เสื่อมตามอายุ ใช้เครื่องคำนวณระยะวิ่งจริงของเราเพื่อประเมินตามรถและการขับขี่ของคุณ',
          },
        },
        {
          '@type': 'Question',
          name: 'มาตรฐาน CLTC, WLTP, EPA, NEDC ต่างกันอย่างไร?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CLTC มักให้ค่าระยะทางสูงสุด, WLTP ให้ค่าสมดุลใกล้เคียงการใช้งานจริง, EPA เข้มงวดที่สุดและน่าเชื่อถือที่สุด ส่วน NEDC เป็นมาตรฐานเก่าที่ปัจจุบันแทบไม่ใช้แล้ว แนะนำให้อ้างอิงค่า EPA หรือ WLTP',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <SidebarProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

            <section id="real-range" className="scroll-mt-24">
              <EVRealRange />
            </section>

            <section id="saving" className="scroll-mt-24">
              <EVSavingCalculator />
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
