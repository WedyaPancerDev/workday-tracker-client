import { Fragment } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import { Box } from '@mui/material'

import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ChatContainer = dynamic(
  async () => await import('@/containers/ChatContainer'),
  {
    ssr: false
  }
)

const ManajemenCutiPegawai = (): JSX.Element => {
  return (
    <Fragment>
      <SEO title="Chat Room | Workday Tracker" />

      <Box component="section">
        <ChatContainer />
      </Box>
    </Fragment>
  )
}

export default Authenticated(ManajemenCutiPegawai)
