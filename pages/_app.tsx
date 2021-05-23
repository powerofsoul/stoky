import '../styles/style.scss'
import type { AppProps } from 'next/app'
import { AppWrapper } from '../src/context/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <AppWrapper>
      <Component {...pageProps} />
   </AppWrapper>
}
export default MyApp
