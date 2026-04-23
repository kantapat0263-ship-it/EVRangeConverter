"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Zap, Settings, Rocket, MapPin } from 'lucide-react';

export function EVTripPlanner() {
  return (
    <div className="space-y-8 mt-12">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(51,188,255,0.8)]" />
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          🗺️ แนะนำเว็บไซต์วางแผนเดินทาง
        </h2>
      </div>

      <Card className="glass overflow-hidden border-white/5">
        <CardContent className="p-0">
          <a 
            href="https://abetterrouteplanner.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block relative aspect-video md:aspect-[21/9] w-full overflow-hidden"
          >
            <Image
              src="https://img1.pic.in.th/images/1776919283317.jpg"
              alt="A Better Routeplanner"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full flex items-center gap-2 font-bold tracking-wider uppercase">
                ไปที่เว็บไซต์ <ExternalLink className="w-5 h-5" />
              </div>
            </div>
          </a>
          
          <div className="p-8 space-y-12">
            <section className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-primary">
                <Zap className="w-6 h-6" />
                🔋 A Better Routeplanner คืออะไร
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                <strong>ABRP</strong> คือเว็บ/แอปสำหรับวางแผนการเดินทางด้วยรถยนต์ไฟฟ้า (EV) โดยคำนวณเส้นทาง + จุดชาร์จให้แบบอัจฉริยะ เพื่อไม่ให้แบตหมดระหว่างทาง
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-secondary">
                  <Settings className="w-5 h-5" />
                  ⚙️ วิธีใช้งาน (เข้าใจง่ายมาก)
                </h3>
                <div className="space-y-4">
                  {[
                    "เลือกรุ่นรถ EV ของคุณ",
                    "ใส่จุดเริ่มต้น + ปลายทาง",
                    "กด “Plan”"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{i + 1}</span>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                  <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <p className="text-sm font-medium">ระบบจะคำนวณ:</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground font-light">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> คำนวณระยะทาง</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> บอกจุดชาร์จที่ควรแวะ</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> บอกเวลาถึง + %แบตที่เหลือ</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                  <Rocket className="w-5 h-5" />
                  🚀 ประโยชน์หลัก
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "วางแผนจุดชาร์จอัตโนมัติ", desc: "ไม่ต้องเดาเอง ระบบจัดให้ครบ", icon: "🔌" },
                    { title: "คำนวณระยะวิ่งแม่นยำ", desc: "ใช้ข้อมูลจริง เช่น อากาศ ทางขึ้นลงเขา", icon: "📊" },
                    { title: "ลดความกังวลแบตหมด", desc: "Range Anxiety จะหมดไป", icon: "🧠" },
                    { title: "ใช้แทน Google Maps ได้เลย", desc: "ออกแบบมาเพื่อชาว EV โดยเฉพาะ", icon: "🗺️" }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-2xl shrink-0">{item.icon}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 text-center">
              <p className="text-xl font-medium italic">
                “Google Maps สำหรับรถไฟฟ้า แต่ฉลาดกว่าเรื่องแบต + การชาร์จ”
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
