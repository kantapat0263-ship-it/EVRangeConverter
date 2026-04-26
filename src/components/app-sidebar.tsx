"use client"

import * as React from "react"
import {
  Home,
  Calculator,
  Info,
  ShoppingBag,
  Zap,
  BookOpen,
  Banknote
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
import { useLanguage } from "@/context/language-context"

export function AppSidebar() {
  const { t } = useLanguage();

  const items = [
    {
      title: t('nav.home'),
      url: "#top",
      icon: Home,
    },
    {
      title: t('nav.calculator'),
      url: "#converter",
      icon: Calculator,
    },
    {
      title: t('nav.saving'),
      url: "#saving",
      icon: Banknote,
    },
    {
      title: t('nav.guide'),
      url: "#guide",
      icon: BookOpen,
    },
    {
      title: t('nav.info'),
      url: "#info",
      icon: Info,
    },
    {
      title: t('nav.accessories'),
      url: "#accessories",
      icon: ShoppingBag,
    },
  ]

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
            {t('nav.navigation')}
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
