import type { AppProps } from 'next/app'
import 'react-toastify/scss/main.scss'
import 'tippy.js/dist/tippy.css' // optional
import '../styles/global.scss'
import { ToastContainer } from 'react-toastify'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            // @ts-ignore
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                />
            </Head>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
