import { useState, useRef, useEffect, Fragment } from 'react'
import { clearTimeout, setTimeout } from 'worker-timers'
import { Snackbar, Alert, AlertTitle, Typography } from '@mui/material'

const Welcome = (): JSX.Element => {
  const refTimeout = useRef<ReturnType<typeof setTimeout> | number>(0)
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = (): void => {
    setOpen(true)
  }

  useEffect(() => {
    if (refTimeout.current) clearTimeout(refTimeout.current)

    refTimeout.current = setTimeout(() => {
      handleClick()
    }, 1500)
  }, [])

  return (
    <Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
        onClose={() => {
          setOpen((prev) => !prev)
        }}
      >
        <Alert
          onClose={() => {
            setOpen((prev) => !prev)
          }}
          severity="info"
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          <AlertTitle sx={{ fontWeight: 800 }}>Hi, Rudi!</AlertTitle>
          <Typography variant="body2" fontWeight={500}>
            Selamat Datang di Dashboard Siswa
          </Typography>
        </Alert>
      </Snackbar>
    </Fragment>
  )
}

export default Welcome
