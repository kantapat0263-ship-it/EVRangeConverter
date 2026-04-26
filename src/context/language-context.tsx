"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  th: {
    nav: {
      home: "หน้าหลัก",
      calculator: "คำนวณระยะทาง",
      saving: "คำนวณเงินประหยัด",
      guide: "EV Range Guide",
      info: "ข้อมูลมาตรฐาน",
      accessories: "อุปกรณ์แนะนำ",
      navigation: "เมนู"
    },
    header: {
      title: "EV Range Converter",
      subtitle: "ตัวแปลงระยะทางรถยนต์ไฟฟ้า"
    },
    converter: {
      placeholder: "ใส่ระยะทาง (กม.)...",
      unit: "กิโลเมตร",
      most_accurate: "ใกล้เคียงที่สุด",
      standard: "มาตรฐาน"
    },
    cost: {
      title: "คำนวณเปรียบเทียบค่าใช้จ่าย",
      rate: "ค่าไฟ (บาท/หน่วย)",
      battery: "ขนาดแบตเตอรี่ (kWh)",
      gas_price: "ราคาน้ำมัน (บาท/ลิตร)",
      economy: "อัตราสิ้นเปลือง (กม./ลิตร)",
      ev_avg: "EV (เฉลี่ย)",
      ice_avg: "ICE (น้ำมัน)",
      savings_label: "ประหยัดได้ประมาณ",
      savings_unit: "บาท / 1,000 กม.",
      per_km: "บาท/กม."
    },
    saving: {
      title: "EV Saving Calculator | คำนวณเงินประหยัดจากรถ EV",
      intro: "คำนวณเงินที่คุณประหยัดได้จากการเปลี่ยนมาใช้รถยนต์ไฟฟ้า เพียงกรอกค่าน้ำมันเดิมต่อเดือน และค่าไฟหรือค่าชาร์จ EV ต่อเดือน ระบบจะช่วยประเมินเงินที่ประหยัดได้ต่อเดือน ต่อปี และในระยะยาว",
      gas_label: "ค่าน้ำมันเดิมต่อเดือน",
      gas_desc: "กรอกค่าใช้จ่ายน้ำมันเฉลี่ยต่อเดือนก่อนเปลี่ยนมาใช้รถ EV เช่น 6,000 บาทต่อเดือน",
      ev_label: "ค่าไฟหรือค่าชาร์จ EV ต่อเดือน",
      ev_desc: "กรอกค่าไฟจากมิเตอร์ TOU หรือค่าชาร์จรถ EV เฉลี่ยต่อเดือน เช่น 2,000 บาทต่อเดือน",
      years_label: "จำนวนปีที่ต้องการคำนวณ",
      years_desc: "ใช้สำหรับคำนวณเงินที่ประหยัดได้ในระยะยาว เช่น 3 ปี 5 ปี หรือ 10 ปี",
      calculate: "คำนวณ",
      res_monthly: "ประหยัดต่อเดือน",
      res_yearly: "ประหยัดต่อปี",
      res_longterm: "ประหยัดใน {years} ปี",
      res_percentage: "ลดค่าใช้จ่ายลง",
      disclaimer: "หมายเหตุ: ผลลัพธ์นี้เป็นค่าประมาณจากค่าใช้จ่ายเฉลี่ยต่อเดือนที่ผู้ใช้กรอกจริง ไม่รวมค่าใช้จ่ายอื่น เช่น ค่าบำรุงรักษา ค่ายาง ค่าประกันภัย ค่าเสื่อมราคา ค่าติดตั้งเครื่องชาร์จ หรือค่าเปลี่ยนแบตเตอรี่ในอนาคต",
      unit_baht: "บาท",
      unit_per_month: "บาท/เดือน",
      unit_per_year: "บาท/ปี"
    },
    info: {
      title: "มาตรฐานระยะทางรถยนต์ไฟฟ้า (EV)",
      cltc_title: "🚗 CLTC (China Light-Duty Vehicle Test Cycle)",
      cltc_desc: "ใช้ในประเทศจีน โดยจำลองการขับขี่ในเมืองที่มีการหยุด-วิ่งบ่อย ความเร็วไม่สูง",
      cltc_highlight: "👉 ทำให้ใช้พลังงานน้อยกว่าความเป็นจริง",
      cltc_summary: "สรุป:",
      cltc_summary_text: "ตัวเลขที่ได้มัก “สูงที่สุด” เหมาะใช้ดูเป็นค่าทางทฤษฎี แต่การใช้งานจริงมักวิ่งได้น้อยกว่า",
      wltp_title: "🌍 WLTP (Worldwide Harmonized Light Vehicles Test Procedure)",
      wltp_desc: "มาตรฐานยุโรปและใช้กันแพร่หลายทั่วโลก มีการจำลองทั้งการขับในเมืองและนอกเมือง รวมถึงการเร่งและความเร็วที่หลากหลาย",
      wltp_summary: "สรุป:",
      wltp_summary_text: "ให้ค่าที่ “สมดุล” และใกล้เคียงการใช้งานจริง เหมาะใช้เปรียบเทียบรถแต่ละรุ่น",
      epa_title: "🇺🇸 EPA (Environmental Protection Agency)",
      epa_desc: "มาตรฐานจากสหรัฐอเมริกา มีความเข้มงวดสูง รวมถึงการทดสอบในสภาพที่ใกล้เคียงการใช้งานจริง เช่น การเปิดแอร์ ความเร็วสูง และการสูญเสียพลังงาน",
      epa_summary: "สรุป:",
      epa_summary_text: "ตัวเลขมัก “ต่ำที่สุด” แต่เชื่อถือได้มากที่สุด และใกล้เคียงการใช้งานจริงที่สุด",
      nedc_title: "🛣️ NEDC (New European Driving Cycle)",
      nedc_desc: "มาตรฐานเก่าของยุโรป ใช้การทดสอบที่ความเร็วต่ำ และรูปแบบการขับที่ไม่สะท้อนการใช้งานจริง",
      nedc_summary: "สรุป:",
      nedc_summary_text: "ตัวเลขมัก “สูง” แต่ไม่แม่นยำ ปัจจุบันแทบไม่ใช้แล้ว (ถูกแทนด้วย WLTP)",
      seo_link: "ลองใช้เครื่องมือของเราได้ที่นี่ 👉",
      insight_title: "💡 Insight",
      insight_desc: "ระยะทาง EV ที่ผู้ผลิตระบุ อาจแตกต่างจากการใช้งานจริง เพราะแต่ละมาตรฐานใช้วิธีทดสอบไม่เหมือนกัน",
      insight_recommend: "แนะนำให้ใช้ค่า EPA หรือ WLTP เป็นตัวอ้างอิงในการใช้งานจริง"
    },
    guide: {
      title: "EV Range Calculator Guide: คำนวณระยะทางรถ EV แบบง่ายและแม่นยำ",
      intro: "ถ้าคุณกำลังใช้รถไฟฟ้า (EV) หรือกำลังสนใจซื้อ EV หนึ่งในคำถามที่สำคัญที่สุดคือ “รถวิ่งได้กี่กิโลเมตรต่อการชาร์จ 1 ครั้ง?” นี่คือเหตุผลที่ EV Range Calculator กลายเป็นเครื่องมือที่จำเป็นมากในยุคนี้",
      q_what_is_range: "EV Range คืออะไร?",
      a_what_is_range: "EV Range คือ “ระยะทางสูงสุด” ที่รถไฟฟ้าสามารถวิ่งได้จากแบตเตอรี่เต็ม 100% โดยค่าดังกล่าวขึ้นอยู่กับหลายปัจจัย เช่น ขนาดแบตเตอรี่ (kWh), การใช้พลังงาน (Wh/km), สภาพถนน และพฤติกรรมการขับขี่",
      a_what_is_range_2: "การใช้ EV range calculator จะช่วยให้คุณสามารถประเมินระยะทางได้แบบแม่นยำมากขึ้น แทนการเดาแบบคร่าว ๆ",
      q_why_use: "ทำไมต้องใช้ EV Range Calculator?",
      reasons: [
        "วางแผนการเดินทางได้แม่นยำ",
        "รู้ว่าต้องชาร์จเมื่อไหร่",
        "เปรียบเทียบรถ EVแต่ละรุ่นได้",
        "ลดความเสี่ยงแบตหมดกลางทาง"
      ],
      factors_title: "ปัจจัยที่มีผลต่อ EV Range",
      factors: [
        { title: "1. ความเร็วในการขับขี่", desc: "ยิ่งขับเร็ว ยิ่งใช้พลังงานมาก ทำให้ EV range ลดลง" },
        { title: "2. อุณหภูมิ", desc: "อากาศร้อนหรือเย็นจัด ส่งผลต่อประสิทธิภาพแบตเตอรี่" },
        { title: "3. การใช้แอร์", desc: "ระบบปรับอากาศใช้พลังงานสูง โดยเฉพาะในรถ EV" },
        { title: "4. น้ำหนักรถ", desc: "บรรทุกหนัก = ใช้ไฟมากขึ้น" }
      ],
      who_is_it_for: "EV Range Calculator เหมาะกับใคร?",
      users: [
        "เจ้าของรถ EV เช่น Tesla, BYD",
        "คนที่กำลังจะซื้อรถไฟฟ้า",
        "คนที่ต้องเดินทางไกล"
      ],
      summary_title: "สรุป",
      summary_text: "การใช้ EV range calculator ช่วยให้คุณเข้าใจการใช้พลังงานของรถไฟฟ้าได้ดีขึ้น และช่วยวางแผนการใช้งานได้อย่างมั่นใจมากขึ้น"
    },
    accessories: {
      title: "🛍️ อุปกรณ์รถ EV ที่แนะนำ"
    },
    footer: {
      install: "ติดตั้งลำโพงคุณภาพ",
      copyright: "Built for the future of mobility."
    }
  },
  en: {
    nav: {
      home: "Home",
      calculator: "Calculator",
      saving: "Saving Calculator",
      guide: "EV Range Guide",
      info: "Standards Info",
      accessories: "Accessories",
      navigation: "Navigation"
    },
    header: {
      title: "EV Range Converter",
      subtitle: "Electric Vehicle Distance Converter"
    },
    converter: {
      placeholder: "Enter distance (km)...",
      unit: "Kilometers",
      most_accurate: "Most Accurate",
      standard: "Standard"
    },
    cost: {
      title: "Cost Comparison Calculator",
      rate: "Electric Rate (THB/Unit)",
      battery: "Battery Size (kWh)",
      gas_price: "Gas Price (THB/Litre)",
      economy: "Fuel Economy (km/L)",
      ev_avg: "EV (Average)",
      ice_avg: "ICE (Gasoline)",
      savings_label: "Estimated Savings",
      savings_unit: "THB / 1,000 km",
      per_km: "THB/km"
    },
    saving: {
      title: "EV Saving Calculator | Calculate Savings from EV",
      intro: "Calculate how much you save by switching to an electric vehicle. Simply enter your previous monthly gasoline cost and your current monthly EV charging cost. Our tool will estimate your savings per month, per year, and in the long term.",
      gas_label: "Monthly Gasoline Cost",
      gas_desc: "Enter your average monthly gasoline cost before switching to an EV, e.g., 6,000 THB/month.",
      ev_label: "Monthly EV Charging Cost",
      ev_desc: "Enter your average monthly EV charging cost (e.g., from TOU meter), e.g., 2,000 THB/month.",
      years_label: "Years to Calculate",
      years_desc: "Used to calculate long-term savings, e.g., 3, 5, or 10 years.",
      calculate: "Calculate",
      res_monthly: "Monthly Saving",
      res_yearly: "Yearly Saving",
      res_longterm: "{years}-Year Saving",
      res_percentage: "Saving Percentage",
      disclaimer: "Note: These results are estimates based on your provided average monthly costs. It does not include other costs such as maintenance, tires, insurance, depreciation, charger installation, or future battery replacement.",
      unit_baht: "THB",
      unit_per_month: "THB/month",
      unit_per_year: "THB/year"
    },
    info: {
      title: "EV Range Standards Info",
      cltc_title: "🚗 CLTC (China Light-Duty Vehicle Test Cycle)",
      cltc_desc: "Used in China, simulates urban driving with frequent stop-and-go at low speeds.",
      cltc_highlight: "👉 Results are usually more optimistic than reality.",
      cltc_summary: "Summary:",
      cltc_summary_text: "Typically gives the highest numbers; best used as a theoretical maximum.",
      wltp_title: "🌍 WLTP (Worldwide Harmonized Light Vehicles Test Procedure)",
      wltp_desc: "European standard used globally, simulating both city and highway driving with varying speeds.",
      wltp_summary: "Summary:",
      wltp_summary_text: "Balanced and closer to real-world usage; great for comparing different models.",
      epa_title: "🇺🇸 EPA (Environmental Protection Agency)",
      epa_desc: "U.S. standard with strict testing, including air conditioning use, high speeds, and energy loss.",
      epa_summary: "Summary:",
      epa_summary_text: "Numbers are usually the lowest but most reliable and closest to real driving.",
      nedc_title: "🛣️ NEDC (New European Driving Cycle)",
      nedc_desc: "Older European standard, tested at low speeds that don't reflect modern driving habits.",
      nedc_summary: "Summary:",
      nedc_summary_text: "Numbers are high but inaccurate; mostly replaced by WLTP.",
      seo_link: "Try our tool here 👉",
      insight_title: "💡 Insight",
      insight_desc: "Manufacturer ranges can differ from reality because each standard uses different testing methods.",
      insight_recommend: "We recommend using EPA or WLTP values for real-world planning."
    },
    guide: {
      title: "EV Range Calculator Guide: Easy & Accurate Conversion",
      intro: "If you're an EV owner or considering buying one, one of the most important questions is: \"How many kilometers can it travel on a single charge?\" This is why an EV Range Calculator is essential today.",
      q_what_is_range: "What is EV Range?",
      a_what_is_range: "EV Range is the maximum distance an electric vehicle can travel on a 100% full battery. This depends on factors like battery size (kWh), energy consumption (Wh/km), road conditions, and driving habits.",
      a_what_is_range_2: "Using an EV range calculator helps you estimate distance more accurately than just guessing.",
      q_why_use: "Why Use an EV Range Calculator?",
      reasons: [
        "Plan trips accurately",
        "Know when to charge",
        "Compare EV models",
        "Reduce range anxiety"
      ],
      factors_title: "Factors Affecting EV Range",
      factors: [
        { title: "1. Driving Speed", desc: "Higher speeds consume more energy, reducing overall range." },
        { title: "2. Temperature", desc: "Extreme heat or cold affects battery efficiency." },
        { title: "3. A/C Usage", desc: "Climate control systems use significant energy in EVs." },
        { title: "4. Vehicle Weight", desc: "Heavier loads mean higher power consumption." }
      ],
      who_is_it_for: "Who is it for?",
      users: [
        "EV owners (Tesla, BYD, etc.)",
        "Potential EV buyers",
        "Long-distance travelers"
      ],
      summary_title: "Conclusion",
      summary_text: "An EV range calculator helps you understand your vehicle's energy usage and plan your drives with more confidence."
    },
    accessories: {
      title: "🛍️ Recommended EV Accessories"
    },
    footer: {
      install: "Quality Speaker Installation",
      copyright: "Built for the future of mobility."
    }
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('th');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'th' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (path: string) => {
    const parts = path.split('.');
    let current: any = translations[language];
    for (const part of parts) {
      if (!current || current[part] === undefined) return path;
      current = current[part];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
