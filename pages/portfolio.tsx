import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { Grid } from 'tabler-react'
import { PortfolioTicker } from '.prisma/client'
import { getUserFromRequest } from '../middleware/withUser'
import { getUserFeed } from '../services/FeedService'
import { getSymbolQuotePrice } from '../services/PortfolioService'
import { getUserPortfolioTickers } from '../services/UserService'
import AddToPortfolio from '../src/components/AddToPortfolio'
import EventFeed from '../src/components/EventFeed'
import Page from '../src/components/Page'
import PortfolioList from '../src/components/PortfolioList'
import { redirectToLogin } from '../src/pageMiddleware/ensureUseIsLogged'
import PortfolioProgressBar from '../src/components/PortfolioProgressBar'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context

    const user = await getUserFromRequest(req, res)

    if (!user) {
        redirectToLogin(res)
        return { props: {} }
    }

    const portfolioTickers = await getUserPortfolioTickers(user)
    const tickerPricesPromises = portfolioTickers
        .map((pt: PortfolioTicker) => pt.symbol)
        .map((s: string) => getSymbolQuotePrice(s))
    const tickerQuotes = await Promise.all(tickerPricesPromises)

    const userFeed = await getUserFeed(user)
    return {
        props: {
            portfolioTickers,
            tickerQuotes,
            userFeed,
        },
    }
}

const Component = ({
    portfolioTickers,
    tickerQuotes,
    userFeed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <Page>
        <Grid.Row>
            <Grid.Col>
                <AddToPortfolio />
            </Grid.Col>
        </Grid.Row>
        <Grid.Row>
            <Grid.Col>
                <PortfolioList portfolioTickers={portfolioTickers || []} tickerQuotes={tickerQuotes || []} />
            </Grid.Col>
            <Grid.Col>
                <EventFeed portfolioEvents={userFeed || []} feedName="My Feed" />
            </Grid.Col>
        </Grid.Row>
    </Page>
)

export default Component
