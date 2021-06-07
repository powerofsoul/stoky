import React from 'react'
import { Grid } from 'tabler-react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import MentionTicker from '../src/components/MentionTicker'
import Page from '../src/components/Page'
import EventFeed from '../src/components/EventFeed'
import { getGlobalFeed } from '../services/FeedService'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context

    const feed = await getGlobalFeed()

    return {
        props: {
            feed,
        },
    }
}

export default function Home({ feed }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Page>
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
        </Page>
    )
}
