import { User } from '@prisma/client'
import moment from 'moment'
import { Card, Grid } from 'tabler-react'
import React, { useEffect, useState } from 'react'
import { PortfolioEvent, PortfolioEventEnum } from '.prisma/client'
import AsyncScroll from '../AsyncScroll'
import { get } from '../../Api'
import { DEFAULT_FEED_SIZE } from '../../Consts'
import GifBox from '../GifBox'
import Avatar from '../Avatar'

type PortfolioEventWithUser = PortfolioEvent & { user: User }

interface Props {
    feedName: string
    portfolioEvents: PortfolioEventWithUser[]
    fetchOptions?: {
        size?: number
        index?: number
        userId?: number
        symbol?: string
    }
}

const actionToVerb = {
    [PortfolioEventEnum.BUY]: 'bought',
    [PortfolioEventEnum.SELL]: 'sold',
    [PortfolioEventEnum.MENTION]: 'mentioned',
}

const EventFeed = ({ portfolioEvents, feedName, fetchOptions }: Props) => {
    const [hasMore, setHasMore] = useState(portfolioEvents.length > 0)
    const [events, setEvents] = useState(portfolioEvents)
    const [index, setIndex] = useState(fetchOptions?.index || portfolioEvents.length)
    const [timer, setTimer] = useState(0)

    const size = fetchOptions?.size || DEFAULT_FEED_SIZE

    const fetchData = async () => {
        const response = await get<PortfolioEventWithUser[]>('feed', {
            ...fetchOptions,
            size,
            index,
        })

        const newEvents = [...events, ...response]
        setEvents(newEvents)
        setIndex(newEvents.length)
        setHasMore(response.length === size)
    }

    const refresh = async () => {
        const response = await get<PortfolioEventWithUser[]>('feed', {
            ...fetchOptions,
            index: 0,
            size,
            since: events?.[0]?.createdOn?.toISOString(),
        })

        setEvents([...response, ...events])
    }

    useEffect(() => {
        const id = setInterval(() => {
            setTimer(new Date().getTime())
        }, 2000)

        return () => {
            clearInterval(id)
        }
    }, [])

    useEffect(() => {
        refresh()
    }, [timer])

    return (
        <Card>
            <Card.Body>
                <Card.Title>{feedName}</Card.Title>
                {events.length === 0 && <div>Lonely place here.</div>}
                {events.length > 0 && (
                    <AsyncScroll
                        className="divide-y overflow-x-hidden"
                        fetchData={fetchData}
                        refresh={refresh}
                        hasMore={hasMore}
                    >
                        {events.map((e, i) => (
                            <Grid.Row key={i}>
                                <Grid.Col auto>
                                    <Avatar imgHref={e.user.picture} size="md" username={e.user.username} />
                                </Grid.Col>
                                <Grid.Col auto>
                                    <div className="text-truncate">
                                        <a href={`/profile/${e.user.username}`}>
                                            <strong>{e.user.username}</strong>
                                        </a>{' '}
                                        {actionToVerb[e.action]}{' '}
                                        <strong>
                                            <a href={`/stock/${e.symbol}`}>${e.symbol}</a>
                                        </strong>{' '}
                                        at ${e.price}
                                    </div>
                                    <div className="text-muted">{moment(e.createdOn).fromNow()}</div>

                                    <div>{e.message}</div>
                                    <div>
                                        <GifBox id={e.giphyId} />
                                    </div>
                                </Grid.Col>
                            </Grid.Row>
                        ))}
                    </AsyncScroll>
                )}
            </Card.Body>
        </Card>
    )
}

export default EventFeed
