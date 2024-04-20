import { Box, Typography } from '@mui/material'

const HeaderPublic = (): JSX.Element => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px',
      }}
    >
      <img src="/images/logos/logoIcon.svg" alt="repayment" />
      <Typography
        variant="h3"
        component="h1"
        sx={{ ml: '8px', letterSpacing: '-0.03em', fontWeight: '700' }}
      >
        Repayment
      </Typography>
    </Box>
  )
}

export default HeaderPublic
