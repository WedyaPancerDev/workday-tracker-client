import type { CSSProperties } from 'react'

import { Card } from '@mui/material'
import { useSelector, type AppState } from '@/store/Store'

interface Props {
  children: JSX.Element | JSX.Element[]
  sx?: CSSProperties
}

const AppCard = ({ children, sx }: Props): JSX.Element => {
  const customizer = useSelector((state: AppState) => state.customizer)

  return (
    <Card
      sx={{ display: 'flex', p: 0, ...sx }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  )
}

export default AppCard
