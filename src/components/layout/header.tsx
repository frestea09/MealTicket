'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, HelpCircle, LayoutDashboard, LogOut } from 'lucide-react'

import { logout } from '@/lib/actions/auth'
import { i18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: i18n.header.dashboard, icon: LayoutDashboard },
    { href: '/faq', label: i18n.header.faq, icon: HelpCircle },
    { href: '/guide', label: i18n.header.guide, icon: BookOpen },
  ]

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold font-headline md:text-xl">
          {i18n.app.title}
        </h1>
        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <form action={logout}>
        <Button variant="ghost" size="icon" type="submit">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">{i18n.header.logout}</span>
        </Button>
      </form>
    </header>
  )
}
