import React from 'react'
import { Grid } from 'tabler-react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import MentionTicker from '../src/components/MentionTicker'
import Page from '../src/components/Page'
import EventFeed from '../src/components/EventFeed'
import { getGlobalFeed } from '../services/FeedService'
import WatchList from '../src/components/WatchList'
import { getUserFromRequest } from '../middleware/withUser'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context
    const user = await getUserFromRequest(req, res)

    const feed = await getGlobalFeed(10)

    return {
        props: {
            feed,
            user,
        },
    }
}

export default function Home({ feed, user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const loggedComponent = (
        <Page user={user}>
            <Grid.Row>
                <Grid.Col>
                    <WatchList />
                </Grid.Col>
                <Grid.Col>
                    <Grid.Row>
                        <Grid.Col>
                            <MentionTicker />
                        </Grid.Col>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Col>
                            <EventFeed feedName="Feed" portfolioEvents={feed} />
                        </Grid.Col>
                    </Grid.Row>
                </Grid.Col>
            </Grid.Row>
        </Page>
    )

    const notLoggedComponent = (
        <Page user={user}>
            <Grid.Row>
                <Grid.Col>
                    <EventFeed feedName="Feed" portfolioEvents={feed} />
                </Grid.Col>
            </Grid.Row>
        </Page>
    )
    return user ? loggedComponent : notLoggedComponent
}
