import React from 'react'
import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ManajemenPengguna = (): JSX.Element => {
  return <div>ManajemenPengguna</div>
}

export default Authenticated(ManajemenPengguna)
