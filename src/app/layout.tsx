import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {ThemeToggle} from "@/components/theme-toggle";
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Visa Check',
  description: 'Visa application service',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Visa Check',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={`${inter.variable} antialiased fixed inset-0 overflow-hidden`}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="h-full w-full overflow-hidden">
          {children}
          <div className="fixed bottom-4 right-4">
            <ThemeToggle/>
          </div>
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}
