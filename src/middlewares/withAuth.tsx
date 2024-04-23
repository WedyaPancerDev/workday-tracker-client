import type { Roles } from '@/types/role'
import { type JWT, getToken } from 'next-auth/jwt'
import {
  type NextMiddleware,
  type NextRequest,
  type NextFetchEvent,
  NextResponse
} from 'next/server'

interface ICurrentResponse {
  id: string
  token: string
  role: Roles
}

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
): NextMiddleware {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname

    if (requireAuth.includes(pathname)) {
      const token = (await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
      })) as JWT & ICurrentResponse

      if (!token) {
        const url = new URL('/login', req.url)
        url.searchParams.set('callbackUrl', encodeURI(req.url))

        return NextResponse.redirect(url)
      }
    }

    return await middleware(req, next)
  }
}
