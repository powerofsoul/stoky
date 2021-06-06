import { Card, Grid, Loader } from 'tabler-react'
import Head from 'next/head'
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPageContext } from 'next'
import React from 'react'
import ChartFetcher from '../../src/components/Charts/ChartFetcher'
import LineChart from '../../src/components/Charts/LineChart'
import Page from '../../src/components/Page'
import Consts from '../../src/Consts'
import EventFeed from '../../src/components/EventFeed'
import { getSymbolFeed } from '../../services/FeedService'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query } = context
    const symbol = (query.symbol as string)?.toUpperCase()
    const feed = await getSymbolFeed(symbol)

    return {
        props: {
            feed,
            symbol,
        },
    }
}

const H = ({ symbol }: any) => (
    <Head>
        <title>{symbol}</title>
        <meta property="og:title" content={symbol.toLocaleUpperCase()} />
        <meta property="og:description" content={`Feed for ${symbol}`} />
        <meta property="og:image" content={`${Consts.url}/api/stock/${symbol}/preview`} />
        <meta name="twitter:image" content={`${Consts.url}/api/stock/${symbol}/preview`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="617" />
        <meta name="twitter:card" content="summary_large_image" />
    </Head>
)

const StockPage = ({ symbol, feed }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (!symbol) {
        return (
            <span>
                <H symbol={symbol} />
                <Loader />;
            </span>
        )
    }
    return (
        <Page>
            <H symbol={symbol} />
            <Grid.Row>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{symbol}</Card.Title>
                            <ChartFetcher
                                symbol={symbol}
                                chartProps={{
                                    height: 200,
                                    xTicks: 2,
                                }}
                                Chart={LineChart}
                            />
                        </Card.Body>
                    </Card>
                </Grid.Col>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={8}>
                    <EventFeed portfolioEvents={feed || []} feedName={`${symbol} feed`} />
                </Grid.Col>
            </Grid.Row>
        </Page>
    )
}

export default StockPage
