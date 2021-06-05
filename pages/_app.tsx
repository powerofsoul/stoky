import { UserProvider } from '@auth0/nextjs-auth0'
import type { AppProps } from 'next/app'
import 'react-toastify/scss/main.scss'
import '../styles/global.scss'
import { ToastContainer } from 'react-toastify'
import { AppWrapper } from '../src/context/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <AppWrapper>
                <ToastContainer />
                <Component {...pageProps} />
            </AppWrapper>
        </UserProvider>
    )
}

export default MyApp
