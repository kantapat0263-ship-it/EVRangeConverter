"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Globe, ShieldCheck, History, Landmark, Lightbulb } from 'lucide-react';

export function EVInformation() {
  return (
    <div className="space-y-8 mt-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          ⚡ มาตรฐานระยะทางรถยนต์ไฟฟ้า (EV)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CLTC */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <Landmark className="w-5 h-5" />
              🚗 CLTC (China Light-Duty Vehicle Test Cycle)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              ใช้ในประเทศจีน โดยจำลองการขับขี่ในเมืองที่มีการหยุด-วิ่งบ่อย ความเร็วไม่สูง
              <span className="block mt-1 text-primary/80">👉 ทำให้ใช้พลังงานน้อยกว่าความเป็นจริง</span>
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">สรุป:</span>
              <p className="text-sm mt-1">ตัวเลขที่ได้มัก <span className="text-primary font-bold">“สูงที่สุด”</span> เหมาะใช้ดูเป็นค่าทางทฤษฎี แต่การใช้งานจริงมักวิ่งได้น้อยกว่า</p>
            </div>
          </CardContent>
        </Card>

        {/* WLTP */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-secondary">
              <Globe className="w-5 h-5" />
              🌍 WLTP (Worldwide Harmonized Light Vehicles Test Procedure)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              มาตรฐานยุโรปและใช้กันแพร่หลายทั่วโลก มีการจำลองทั้งการขับในเมืองและนอกเมือง รวมถึงการเร่งและความเร็วที่หลากหลาย
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">สรุป:</span>
              <p className="text-sm mt-1">ให้ค่าที่ <span className="text-secondary font-bold">“สมดุล”</span> และใกล้เคียงการใช้งานจริง เหมาะใช้เปรียบเทียบรถแต่ละรุ่น</p>
            </div>
          </CardContent>
        </Card>

        {/* EPA */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-orange-400">
              <ShieldCheck className="w-5 h-5" />
              🇺🇸 EPA (Environmental Protection Agency)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              มาตรฐานจากสหรัฐอเมริกา มีความเข้มงวดสูง รวมถึงการทดสอบในสภาพที่ใกล้เคียงการใช้งานจริง เช่น การเปิดแอร์ ความเร็วสูง และการสูญเสียพลังงาน
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">สรุป:</span>
              <p className="text-sm mt-1">ตัวเลขมัก <span className="text-orange-400 font-bold">“ต่ำที่สุด”</span> แต่เชื่อถือได้มากที่สุด และใกล้เคียงการใช้งานจริงที่สุด</p>
            </div>
          </CardContent>
        </Card>

        {/* NEDC */}
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-400">
              <History className="w-5 h-5" />
              🛣️ NEDC (New European Driving Cycle)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              มาตรฐานเก่าของยุโรป ใช้การทดสอบที่ความเร็วต่ำ และรูปแบบการขับที่ไม่สะท้อนการใช้งานจริง
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-green-400">สรุป:</span>
              <p className="text-sm mt-1">ตัวเลขมัก <span className="text-green-400 font-bold">“สูง”</span> แต่ไม่แม่นยำ ปัจจุบันแทบไม่ใช้แล้ว (ถูกแทนด้วย WLTP)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="py-4 text-center">
        <p className="text-muted-foreground text-sm font-light">
          ลองใช้เครื่องมือของเราได้ที่นี่ 👉 
          <a href="/" className="text-primary hover:underline font-medium ml-2">EV Range Calculator Tool</a>
        </p>
      </div>

      {/* Insight Section */}
      <Card className="glass border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-primary">💡 Insight</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                ระยะทาง EV ที่ผู้ผลิตระบุ อาจแตกต่างจากการใช้งานจริง เพราะแต่ละมาตรฐานใช้วิธีทดสอบไม่เหมือนกัน
              </p>
              <p className="text-sm font-medium text-foreground">
                แนะนำให้ใช้ค่า <span className="text-orange-400">EPA</span> หรือ <span className="text-secondary">WLTP</span> เป็นตัวอ้างอิงในการใช้งานจริง
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
