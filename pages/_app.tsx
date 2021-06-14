import type { AppProps } from 'next/app'
import 'react-toastify/scss/main.scss'
import 'tippy.js/dist/tippy.css' // optional
import '../styles/global.scss'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-N7XCNVZ9M7', { page_path: window.location.pathname });
                                `,
                    }}
                />
            </Head>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
