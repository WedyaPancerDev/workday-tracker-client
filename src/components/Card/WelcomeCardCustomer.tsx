import React from 'react'
import moment from 'moment'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'

const WelcomeCardCustomer = (): JSX.Element => {
  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}
    >
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box>
              <Typography variant="body1" fontSize="16px" fontWeight={700}>
                {moment(new Date().toISOString()).format('dddd, DD MMMM YYYY')}
              </Typography>

              <Box
                mt={5}
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'flex'
                  },
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography variant="h4" fontWeight={500} lineHeight={1.45}>
                  Selamat Datang Pelanggan <br /> <b>Okto Maniani!</b>
                </Typography>

                <Typography
                  variant="body1"
                  fontSize="16px"
                  fontWeight={400}
                  marginTop="6px"
                  color="#7C8FAC"
                >
                  Kamu bisa melanjutkan transaksi yang <br /> belum selesai{' '}
                  <span
                    style={{ color: '#5D87FF', textDecoration: 'underline' }}
                  >
                    disini
                  </span>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Box mb="-51px">
              <img
                src="/images/backgrounds/piggy.png"
                alt="img"
                width={'340px'}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WelcomeCardCustomer
