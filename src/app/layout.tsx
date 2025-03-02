import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {ThemeToggle} from "@/components/theme-toggle";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <div className="fixed bottom-4 right-4">
          <ThemeToggle/>
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}
