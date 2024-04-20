import React, { type CSSProperties } from 'react'
import { Box } from '@mui/material'

import HeaderPublic from '../HeaderPublic'

interface IGuestLayout {
  children: React.ReactNode
  sx?: CSSProperties
  size?: 'sm' | 'md' | 'lg'
}

const sizeContainer: Record<string, string> = {
  sm: '1000px',
  md: '1100px',
  lg: '1200px'
}

const GuestLayout = ({
  children,
  sx,
  size = 'sm'
}: IGuestLayout): JSX.Element => {
  return (
    <Box
      sx={{
        ...sx,
        maxWidth: sizeContainer[size] || '900px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      <HeaderPublic />
      <Box component="main">{children}</Box>
    </Box>
  )
}

export default GuestLayout
