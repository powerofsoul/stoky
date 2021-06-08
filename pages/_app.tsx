import { UserProvider } from '@auth0/nextjs-auth0'
import type { AppProps } from 'next/app'
import 'react-toastify/scss/main.scss'
import 'tippy.js/dist/tippy.css' // optional
import '../styles/global.scss'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import Head from 'next/head'
import { AppWrapper } from '../src/context/AppContext'

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
