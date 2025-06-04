import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authService } from './lib/auth'

export function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = authService.verifyToken(token)

  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  // Check for admin-only routes
  if (request.nextUrl.pathname.startsWith('/api/admin') && user.role !== 'admin') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // Check for operator-only routes
  if (request.nextUrl.pathname.startsWith('/api/operator') && user.role !== 'operator' && user.role !== 'admin') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/operator/:path*'],
}
