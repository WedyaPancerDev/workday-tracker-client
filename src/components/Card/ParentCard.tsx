import React, { Fragment, type CSSProperties } from 'react'
import { useTheme } from '@mui/material/styles'
import { Card, CardHeader, Divider, Box } from '@mui/material'
import { useSelector, type AppState } from '@/store/Store'

interface Props {
  header: string | JSX.Element
  footer?: string | JSX.Element
  children: JSX.Element
  sx?: CSSProperties
}

const ParentCard = ({ header, children, footer, sx }: Props): JSX.Element => {
  const customizer = useSelector((state: AppState) => state.customizer)

  const theme = useTheme()
  const borderColor = theme.palette.divider

  return (
    <Card
      sx={{
        padding: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
        ...sx
      }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      <CardHeader title={header} />
      <Divider />

      <Fragment>{children}</Fragment>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ''
      )}
    </Card>
  )
}

export default ParentCard
