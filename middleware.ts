import withAuth from '@/middlewares/withAuth'
import { NextResponse, type NextRequest } from 'next/server'

export function mainMiddleware(req: NextRequest): NextResponse {
  const res = NextResponse.next()

  return res
}

export default withAuth(mainMiddleware, [
  '/dashboard',
  '/rekap-absensi',
  '/manajemen-pegawai',
  '/manajemen-pengguna',
  '/cuti-pegawai',
  '/chat-room'
])
