import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0'
import { useState } from 'react'
import { get } from '../src/Api'
import Page from '../src/components/Page'
import { useAppContext } from '../src/context/AppContext'
import TickerSearch from '../src/components/TickerSearch'
import CandleStickChart from '../src/components/Charts/CandleStickChart'
import ChartFetcher from '../src/components/Charts/ChartFetcher'

export default function Home() {
    const [symbol, setSymbol] = useState('')
    return (
        <Page>
            <ChartFetcher Chart={CandleStickChart} symbol={symbol} />
            <TickerSearch onChange={setSymbol} />
        </Page>
    )
}
