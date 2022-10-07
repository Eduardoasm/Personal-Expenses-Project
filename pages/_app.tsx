import '../styles/globals.css'
import type { AppProps } from 'next/app'
import passport from './middlewares/passport'
import passportMiddleware from "./middlewares/passport"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
