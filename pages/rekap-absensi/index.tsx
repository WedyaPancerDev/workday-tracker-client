import React from 'react'
import { Authenticated } from '@/middlewares/HOC/Authenticated'

const RekapAbsensi = (): JSX.Element => {
  return <div>RekapAbsensi</div>
}

export default Authenticated(RekapAbsensi)
