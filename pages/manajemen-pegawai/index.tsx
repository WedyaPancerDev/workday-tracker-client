import React from 'react'
import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ManajemenPegawai = (): JSX.Element => {
  return <div>ManajemenPegawai</div>
}

export default Authenticated(ManajemenPegawai)
