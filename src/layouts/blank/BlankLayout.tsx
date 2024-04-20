import { Box } from '@mui/material'

interface BlankLayoutProps {
  children: React.ReactNode
}

const BlankLayout = ({ children }: BlankLayoutProps): JSX.Element => {
  return <Box>{children}</Box>
}

export default BlankLayout
