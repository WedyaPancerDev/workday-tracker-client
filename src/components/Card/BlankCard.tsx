import { Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { type AppState, useSelector } from '@/store/Store'
import type { CSSProperties } from 'react'

interface Props {
  className?: string
  children: JSX.Element | JSX.Element[]
  sx?: CSSProperties
}

const BlankCard = ({ children, className, sx }: Props): JSX.Element => {
  const customizer = useSelector((state: AppState) => state.customizer)

  const theme = useTheme()
  const borderColor = theme.palette.divider

  return (
    <Card
      sx={{
        p: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
        position: 'relative',
        ...sx
      }}
      className={className}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  )
}

export default BlankCard
