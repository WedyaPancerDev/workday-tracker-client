import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { SessionProvider } from 'next-auth/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Box, CircularProgress } from '@mui/material'
import { CacheProvider, type EmotionCache } from '@emotion/react'

import Store from '@/store/Store'
import { ThemeSettings } from '@/theme/Theme'
import createEmotionCache from '@/createEmotionCache'

import BlankLayout from '@/layouts/blank/BlankLayout'
import FullLayout from '@/layouts/full/FullLayout'

import '@/theme/global.css'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const layouts: Record<string, any> = {
  Blank: BlankLayout
}

let isTimeout: ReturnType<typeof setTimeout>

const MyApp = (props: MyAppProps): JSX.Element => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleStart = (url: string): void => {
      url !== router.pathname && setIsLoading(true)
    }

    const handleComplete = (url: string): void => {
      url === router.pathname
        ? (isTimeout = setTimeout(() => {
            setIsLoading(false)
          }, 500))
        : setIsLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      clearTimeout(isTimeout)

      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps }
  }: any = props
  const theme = ThemeSettings()
  const Layout = layouts[Component.layout] || FullLayout

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>

            <NextNProgress
              color="#5d87ff"
              startPosition={0.3}
              stopDelayMs={200}
              height={4}
              showOnShallow={false}
            />

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 6000
              }}
            />
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </>
  )
}

const App = (props: MyAppProps): JSX.Element => {
  return (
    <Provider store={Store}>
      <MyApp {...props} />
    </Provider>
  )
}

export default App
