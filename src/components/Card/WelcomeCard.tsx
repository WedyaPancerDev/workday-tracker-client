import React from 'react'
import moment from 'moment'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'

const WelcomeCard = (): JSX.Element => {
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
                  Selamat Datang Admin <b>Okto Maniani!</b>
                </Typography>

                <Typography
                  variant="body1"
                  fontSize="16px"
                  fontWeight={400}
                  marginTop="6px"
                  color="#7C8FAC"
                >
                  Kamu masih ada
                  <Typography
                    variant="caption"
                    fontWeight={800}
                    fontSize="16px"
                    margin="0 4px"
                    color="#2A3547"
                    lineHeight={1.45}
                  >
                    3
                  </Typography>
                  pelanggan yang belum di tangani
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Box mb="-51px">
              <img
                src="/images/backgrounds/welcome-bg.svg"
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

export default WelcomeCard
