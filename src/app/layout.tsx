import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { i18n } from '@/lib/i18n'
import { getSession } from '@/lib/session'
import { Header } from '@/components/layout/header'
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { SideMenu } from '@/components/layout/side-menu'

export const metadata: Metadata = {
  title: i18n.app.title,
  description: i18n.app.description,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {session ? (
          <SidebarProvider>
            <Sidebar collapsible="icon">
              <SideMenu />
            </Sidebar>
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
        ) : (
          children
        )}
        <Toaster />
      </body>
    </html>
  )
}
