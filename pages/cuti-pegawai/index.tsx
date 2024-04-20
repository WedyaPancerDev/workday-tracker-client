import { Authenticated } from '@/middlewares/HOC/Authenticated'

const CutiPegawai = (): JSX.Element => {
  return <div>CutiPegawai</div>
}

export default Authenticated(CutiPegawai)
