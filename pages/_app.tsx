import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'

import '../styles/globals.css'
import { UIProvider } from '../context/ui'
import { EntriesProvider } from '../context/entries'
import { darkTheme } from '../themes'
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}
