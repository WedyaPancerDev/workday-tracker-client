import { nanoid as uniqueId } from 'nanoid'
import {
  IconClock,
  IconLayoutDashboard,
  IconMessage,
  IconReport,
  IconReportOff,
  IconSmartHome,
  IconUser,
  IconUsers
} from '@tabler/icons-react'

interface MenuitemsType {
  [x: string]: any
  id?: string
  navlabel?: boolean
  subheader?: string
  title?: string
  icon?: any
  href?: string
  children?: MenuitemsType[]
  chip?: string
  chipColor?: string
  variant?: string
  external?: boolean
}

export const AdminMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Home'
  },
  {
    id: uniqueId(10),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
    chipColor: 'secondary'
  },
  {
    id: uniqueId(10),
    title: 'Lokasi Kantor',
    icon: IconSmartHome,
    href: '/lokasi-kantor',
    chipColor: 'secondary'
  },
  {
    id: uniqueId(10),
    title: 'Manajemen Pegawai',
    icon: IconUsers,
    href: '/manajemen-pegawai',
    chipColor: 'secondary'
  },
  {
    id: uniqueId(10),
    title: 'Cuti Pegawai',
    icon: IconReportOff,
    href: '/cuti-pegawai',
    chipColor: 'secondary'
  },
  {
    id: uniqueId(10),
    title: 'Absensi Pegawai',
    icon: IconClock,
    href: '/absensi-pegawai',
    chipColor: 'secondary'
  },
  {
    id: uniqueId(10),
    title: 'Rekap Absensi',
    icon: IconReport,
    href: '/rekap-absensi',
    chipColor: 'secondary'
  },
  {
    navlabel: true,
    subheader: 'Applications'
  },
  {
    id: uniqueId(10),
    title: 'Manajemen Pengguna',
    icon: IconUser,
    href: '/manajemen-pengguna',
    chipColor: 'secondary'
  },
  {
    id: uniqueId(10),
    title: 'Chat Room',
    icon: IconMessage,
    href: '/chat-room',
    chipColor: 'secondary'
  }
]
