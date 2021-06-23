import React, { useEffect } from 'react'
import { Grid } from 'tabler-react'
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextApiResponse } from 'next'
import { toast } from 'react-toastify'
import MentionTicker from '../src/components/MentionTicker'
import Page from '../src/components/Page'
import EventFeed from '../src/components/EventFeed'
import { getGlobalFeed } from '../services/FeedService'
import WatchList from '../src/components/WatchList'
import { getUserFromRequest } from '../middleware/withUser'
import { executeToken } from '../services/TokenService'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context
    const user = await getUserFromRequest(req, res)
    const feed = await getGlobalFeed(10)
    const tokenString = context.query.token as string
    const tokenMessage = await executeToken(tokenString)

    return {
        props: {
            feed,
            user,
            tokenMessage,
        },
    }
}

export default function Home({ feed, user, tokenMessage }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    useEffect(() => {
        if (tokenMessage?.length > 0) {
            toast(tokenMessage, {
                type: 'success',
            })
        }
    }, [])
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
