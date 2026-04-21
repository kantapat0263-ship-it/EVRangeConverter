"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Zap, Fuel, TrendingDown } from 'lucide-react';

export function CostCalculator({ kmPerCharge }: { kmPerCharge: number }) {
  const [electricityRate, setElectricityRate] = useState<number>(4.2);
  const [batterySize, setBatterySize] = useState<number>(60);
  const [gasPrice, setGasPrice] = useState<number>(38);
  const [fuelEconomy, setFuelEconomy] = useState<number>(15); // km/L

  const evCostPerKm = (batterySize * electricityRate) / kmPerCharge;
  const gasCostPerKm = gasPrice / fuelEconomy;
  const savings = gasCostPerKm - evCostPerKm;

  return (
    <Card className="glass border-white/5 overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-white/5 py-4">
        <CardTitle className="text-lg font-light flex items-center gap-2 tracking-widest uppercase">
          <TrendingDown className="w-5 h-5 text-secondary" />
          คำนวณเปรียบเทียบค่าใช้จ่าย
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6 flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">ค่าไฟ (บาท/หน่วย)</Label>
            <Input 
              type="number" 
              value={electricityRate} 
              onChange={(e) => setElectricityRate(Number(e.target.value))}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">ขนาดแบตเตอรี่ (kWh)</Label>
            <Input 
              type="number" 
              value={batterySize} 
              onChange={(e) => setBatterySize(Number(e.target.value))}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">ราคาน้ำมัน (บาท/ลิตร)</Label>
            <Input 
              type="number" 
              value={gasPrice} 
              onChange={(e) => setGasPrice(Number(e.target.value))}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">อัตราสิ้นเปลือง (กม./ลิตร)</Label>
            <Input 
              type="number" 
              value={fuelEconomy} 
              onChange={(e) => setFuelEconomy(Number(e.target.value))}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm">EV (เฉลี่ย)</span>
            </div>
            <span className="font-bold text-primary">{evCostPerKm.toFixed(2)} บาท/กม.</span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-orange-400" />
              <span className="text-sm">ICE (น้ำมัน)</span>
            </div>
            <span className="font-bold text-white">{gasCostPerKm.toFixed(2)} บาท/กม.</span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/20">
            <div className="text-xs text-secondary/70 uppercase tracking-widest mb-1">ประหยัดได้ประมาณ</div>
            <div className="text-3xl font-bold text-secondary">
              {savings > 0 ? (savings * 1000).toFixed(0) : 0} <span className="text-sm font-light">บาท / 1,000 กม.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
