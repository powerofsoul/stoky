import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { Grid, Profile, Loader, Card } from 'tabler-react'
import { PortfolioTicker } from '.prisma/client'
import { getUserFeed } from '../../services/FeedService'
import { getSymbolQuotePrice } from '../../services/PortfolioService'
import SqlDAO from '../../services/SqlDAO'
import { getUserPortfolioTickers, getUserTimeline } from '../../services/UserService'
import EventFeed from '../../src/components/EventFeed'
import Page from '../../src/components/Page'
import PortfolioList from '../../src/components/PortfolioList'
import Consts from '../../src/Consts'
import { redirectToLogin } from '../../src/pageMiddleware/ensureUseIsLogged'
import LineChart from '../../src/components/Charts/LineChart'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { res } = context
    const { username } = context.query as { [key: string]: string }

    const user = await SqlDAO.user.findFirst({
        where: {
            username,
        },
    })

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
    const userTimeline = await getUserTimeline(user)

    return {
        props: {
            portfolioTickers,
            tickerQuotes,
            userFeed,
            userTimeline,
            user,
        },
    }
}

const H = ({ username }: any) => (
    <Head>
        <title>{username} profile</title>
        <meta property="og:title" content={`${username} profile`} />
        <meta property="og:description" content={`Profile of ${username}`} />
        <meta property="og:image" content={`${Consts.url}/api/profile/${username}/preview`} />
        <meta name="twitter:image" content={`${Consts.url}/api/profile/${username}/preview`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="617" />
        <meta name="twitter:card" content="summary_large_image" />
    </Head>
)

const Component = ({
    portfolioTickers,
    tickerQuotes,
    userFeed,
    userTimeline,
    user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return user ? (
        <Page user={user}>
            <H username={user?.username} />
            <Grid.Row>
                <Grid.Col className="d-flex justify-content-center">
                    <Profile name={`${user.firstName ?? ''} ${user.lastName ?? ''}`} avatarURL={user.picture || ''}>
                        {user?.aboutMe}
                    </Profile>
                </Grid.Col>
            </Grid.Row>
            {userTimeline && userTimeline.length > 2 && (
                <Grid.Row>
                    <Grid.Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>${user.username}</Card.Title>
                                <LineChart data={userTimeline} />
                            </Card.Body>
                        </Card>
                    </Grid.Col>
                </Grid.Row>
            )}
            <Grid.Row>
                <Grid.Col>
                    <PortfolioList
                        portfolioTickers={portfolioTickers || []}
                        tickerQuotes={tickerQuotes || []}
                        title="Portfolio"
                    />
                </Grid.Col>
                <Grid.Col>
                    <EventFeed portfolioEvents={userFeed || []} feedName="Feed" fetchOptions={{ userId: user.id }} />
                </Grid.Col>
            </Grid.Row>
        </Page>
    ) : (
        <Loader />
    )
}

export default Component
