import { Grid, Box } from '@mui/material'

import AppLayout from '@/components/AppLayout'
import AuthLogin from '@/components/Form/AuthLogin'
import Logo from '@/components/Icon/Logo'

const Login = (): JSX.Element => {
  return (
    <AppLayout title="Workday Tracker - Login">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: '100vh' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3'
            }
          }}
        >
          <Box position="relative">
            <Box px={3} marginTop="10px">
              <Logo sx={{ height: 50, width: 50 }} />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex'
                }
              }}
            >
              <img
                src={'/images/backgrounds/login-bg.svg'}
                alt="bg"
                style={{
                  width: '100%',
                  maxWidth: '500px'
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={2} width="75%" marginInline="auto">
            <AuthLogin />
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  )
}

Login.layout = 'Blank'

export default Login
