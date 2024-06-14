import { Box } from '@mui/material'
import React, { type ElementType } from 'react'
import SEO from './SEO'

const AppLayout = ({
  sx,
  alias,
  title = 'Eurocar Service',
  children
}: {
  title?: string
  alias?: ElementType
  sx?: React.CSSProperties
  children: React.ReactNode
}): JSX.Element => {
  return (
    <>
      <SEO title={title} />
      <Box component={alias} sx={{ ...sx }}>
        {children}
      </Box>
    </>
  )
}

export default AppLayout
