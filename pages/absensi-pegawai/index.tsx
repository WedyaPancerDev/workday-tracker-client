import { Authenticated } from '@/middlewares/HOC/Authenticated'

const AbsensiPegawai = (): JSX.Element => {
  return <div>AbsensiPegawai</div>
}

export default Authenticated(AbsensiPegawai)
