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
import MentionTicker from '../../src/components/MentionTicker'
import { getUserFromRequest } from '../../middleware/withUser'
import CandleStickChart from '../../src/components/Charts/CandleStickChart'
import { getHistoryForSymbol } from '../api/stock/historical'
import ValueBadge from '../../src/components/ValueBadge'
import { toPrecision } from '../../src/Utils'
import { getSymbolQuotePrice } from '../../services/PortfolioService'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query, req, res } = context
    const symbol = (query.symbol as string)?.toUpperCase()
    const feed = await getSymbolFeed(symbol)
    const user = await getUserFromRequest(req, res)
    const historicalData = await getHistoryForSymbol(symbol)
    const currentPrice = await getSymbolQuotePrice(symbol)

    return {
        props: {
            feed,
            symbol,
            user,
            historicalData,
            currentPrice,
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

const StockPage = ({
    symbol,
    feed,
    user,
    historicalData,
    currentPrice,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (!symbol) {
        return (
            <span>
                <H symbol={symbol} />
                <Loader />;
            </span>
        )
    }

    return (
        <Page user={user}>
            <H symbol={symbol} />
            <Grid.Row>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={4}>
                    <Grid.Row>
                        <Grid.Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {symbol}{' '}
                                        <ValueBadge
                                            prefix={`${toPrecision(currentPrice?.regularMarketPrice, 2)} (`}
                                            value={currentPrice?.regularMarketChangePercent * 100}
                                            suffix="%)"
                                            precision={2}
                                        />
                                    </Card.Title>

                                    <LineChart data={historicalData} height={75} hideAxis />
                                </Card.Body>
                            </Card>
                        </Grid.Col>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Col>{user && <MentionTicker symbol={symbol} />}</Grid.Col>
                    </Grid.Row>
                </Grid.Col>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={8}>
                    <Grid.Row>
                        <Grid.Col>
                            <Card>
                                <Card.Body>
                                    <CandleStickChart data={historicalData} />
                                </Card.Body>
                            </Card>
                        </Grid.Col>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Col>
                            <EventFeed
                                portfolioEvents={feed || []}
                                feedName={`${symbol} feed`}
                                fetchOptions={{ symbol }}
                            />
                        </Grid.Col>
                    </Grid.Row>
                </Grid.Col>
            </Grid.Row>
        </Page>
    )
}

export default StockPage
