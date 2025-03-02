import { clerkMiddleware } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware';
import { NextMiddleware, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing';

export default chainMiddleware([() => clerkMiddleware(), () => createMiddleware(routing)])

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/(ru|en)/:path*',

  ],
}


function chainMiddleware(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = functions[index]
  if (current) {
    const next = chainMiddleware(functions, index + 1)
    return current(next)
  }
  return () => NextResponse.next()
}

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware
