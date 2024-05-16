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
  '/manajemen-pegawai/create',
  '/manajemen-pegawai/edit/[^/]+',
  '/manajemen-pengguna',
  '/manajemen-pengguna/create',
  '/manajemen-pengguna/edit/[^/]+',
  '/cuti-pegawai',
  '/cuti-pegawai/info/[^/]+',
  '/chat-room',
  '/absensi-pegawai'
])
