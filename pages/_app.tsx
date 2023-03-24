import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

const basicTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={basicTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
