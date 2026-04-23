"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, HelpCircle, CheckCircle2, AlertCircle, Users, Lightbulb } from 'lucide-react';

export function EVGuide() {
  return (
    <div className="space-y-12 mt-12">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <h2 className="text-3xl font-bold tracking-tight">
          EV Range Calculator Guide: คำนวณระยะทางรถ EV แบบง่ายและแม่นยำ
        </h2>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          ถ้าคุณกำลังใช้รถไฟฟ้า (EV) หรือกำลังสนใจซื้อ EV หนึ่งในคำถามที่สำคัญที่สุดคือ 
          <span className="text-primary font-medium"> “รถวิ่งได้กี่กิโลเมตรต่อการชาร์จ 1 ครั้ง?” </span>
          นี่คือเหตุผลที่ <strong>EV Range Calculator</strong> กลายเป็นเครื่องมือที่จำเป็นมากในยุคนี้
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <HelpCircle className="w-6 h-6 text-primary" />
              EV Range คืออะไร?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground font-light">
              EV Range คือ “ระยะทางสูงสุด” ที่รถไฟฟ้าสามารถวิ่งได้จากแบตเตอรี่เต็ม 100% 
              โดยค่าดังกล่าวขึ้นอยู่กับหลายปัจจัย เช่น ขนาดแบตเตอรี่ (kWh), การใช้พลังงาน (Wh/km), 
              สภาพถนน และพฤติกรรมการขับขี่
            </p>
            <p className="text-muted-foreground font-light">
              การใช้ <strong>EV range calculator</strong> จะช่วยให้คุณสามารถประเมินระยะทางได้แบบแม่นยำมากขึ้น
              แทนการเดาแบบคร่าว ๆ
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
              ทำไมต้องใช้ EV Range Calculator?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "วางแผนการเดินทางได้แม่นยำ",
                "รู้ว่าต้องชาร์จเมื่อไหร่",
                "เปรียบเทียบรถ EVแต่ละรุ่นได้",
                "ลดความเสี่ยงแบตหมดกลางทาง"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-primary">
            <BookOpen className="w-6 h-6" />
            วิธีใช้ EV Range Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground font-light">
            เครื่องมือ <strong>EV range calculator</strong> ของเราถูกออกแบบให้ใช้งานง่าย:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", text: "ใส่ระยะทางที่ต้องการ (km)" },
              { step: "2", text: "ใส่อัตราการใช้พลังงาน (Wh/km)" },
              { step: "3", text: "ระบบจะคำนวณพลังงานที่ใช้ทันที" }
            ].map((item) => (
              <div key={item.step} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <p className="text-sm font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-400" />
          ปัจจัยที่มีผลต่อ EV Range
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "1. ความเร็วในการขับขี่", desc: "ยิ่งขับเร็ว ยิ่งใช้พลังงานมาก ทำให้ EV range ลดลง" },
            { title: "2. อุณหภูมิ", desc: "อากาศร้อนหรือเย็นจัด ส่งผลต่อประสิทธิภาพแบตเตอรี่" },
            { title: "3. การใช้แอร์", desc: "ระบบปรับอากาศใช้พลังงานสูง โดยเฉพาะในรถ EV" },
            { title: "4. น้ำหนักรถ", desc: "บรรทุกหนัก = ใช้ไฟมากขึ้น" }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl glass-card border-white/5">
              <h4 className="font-bold text-sm mb-2 text-white">{item.title}</h4>
              <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Users className="w-6 h-6 text-blue-400" />
              EV Range Calculator เหมาะกับใคร?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "เจ้าของรถ EV เช่น Tesla, BYD",
                "คนที่กำลังจะซื้อรถไฟฟ้า",
                "คนที่ต้องเดินทางไกล"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              สรุป
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground font-light leading-relaxed">
              การใช้ <strong>EV range calculator</strong> ช่วยให้คุณเข้าใจการใช้พลังงานของรถไฟฟ้าได้ดีขึ้น 
              และช่วยวางแผนการใช้งานได้อย่างมั่นใจมากขึ้น
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
