import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPageContext } from 'next'
import React from 'react'
import Page from '../src/components/Page'
import AddToPortfolio from '../src/components/AddToPortfolio'
import ensureUseIsLogged, { redirectToLogin } from '../src/pageMiddleware/ensureUseIsLogged'
import PortfolioList from '../src/components/PortfolioList'
import { getUserFromRequest } from '../middleware/withUser'
import { getUserPortfolioTickers } from '../services/UserService'
import { PortfolioEventEnum, PortfolioTicker } from '.prisma/client'
import { getSymbolQuotePrice } from '../services/PortfolioService'
import EventFeed from '../src/components/EventFeed'
import { getUserFeed } from '../services/FeedService'

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
        <AddToPortfolio />
        <PortfolioList portfolioTickers={portfolioTickers || []} tickerQuotes={tickerQuotes || []} />
        <EventFeed portfolioEvents={userFeed || []} feedName="My Feed" />
    </Page>
)

export default Component
