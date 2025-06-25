'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, HelpCircle, LayoutDashboard, LogOut } from 'lucide-react'

import { i18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { logout } from '@/lib/actions/auth'

export function SideMenu() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: i18n.header.dashboard, icon: LayoutDashboard },
    { href: '/faq', label: i18n.header.faq, icon: HelpCircle },
    { href: '/guide', label: i18n.header.guide, icon: BookOpen },
  ]

  return (
    <>
      <SidebarHeader>
        <h1 className="text-lg font-semibold font-headline md:text-xl">
          {i18n.app.title}
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <form action={logout} className="w-full">
          <SidebarMenuButton asChild variant="ghost" className="w-full">
            <button type="submit" className="w-full">
              <LogOut />
              <span>{i18n.header.logout}</span>
            </button>
          </SidebarMenuButton>
        </form>
      </SidebarFooter>
    </>
  )
}
