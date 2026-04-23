"use client"

import * as React from "react"
import {
  Home,
  Calculator,
  Info,
  ShoppingBag,
  Zap,
  BookOpen
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "หน้าหลัก",
    url: "#top",
    icon: Home,
  },
  {
    title: "คำนวณระยะทาง",
    url: "#converter",
    icon: Calculator,
  },
  {
    title: "คู่มือการใช้งาน",
    url: "#guide",
    icon: BookOpen,
  },
  {
    title: "ข้อมูลมาตรฐาน",
    url: "#info",
    icon: Info,
  },
  {
    title: "อุปกรณ์แนะนำ",
    url: "#accessories",
    icon: ShoppingBag,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-white/5 bg-background/50 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 neon-glow">
            <Zap className="w-5 h-5 text-primary" fill="currentColor" />
          </div>
          <span className="font-bold tracking-tighter text-xl neon-text uppercase font-headline">EV RANGE</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/50 tracking-[0.3em] uppercase text-[9px] px-4 mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton asChild tooltip={item.title} className="h-12 px-4 hover:bg-white/5 transition-all duration-300 group">
                    <a href={item.url} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-light tracking-widest text-sm uppercase group-hover:text-foreground transition-colors">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
