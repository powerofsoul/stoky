import { UserProvider } from '@auth0/nextjs-auth0'
import type { AppProps } from 'next/app'
import 'react-toastify/scss/main.scss'
import '../styles/global.scss'
import { ToastContainer } from 'react-toastify'
import { AppWrapper } from '../src/context/AppContext'
import React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <AppWrapper>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                    />
                </Head>
                <ToastContainer />
                <Component {...pageProps} />
            </AppWrapper>
        </UserProvider>
    )
}

export default MyApp
