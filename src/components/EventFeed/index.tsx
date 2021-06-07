import { User } from '@prisma/client'
import moment from 'moment'
import { Card, Grid, Avatar } from 'tabler-react'
import { useState } from 'react'
import { PortfolioEvent, PortfolioEventEnum } from '.prisma/client'
import AsyncScroll from '../AsyncScroll'
import { get } from '../../Api'
import { DEFAULT_FEED_SIZE } from '../../Consts'

type PortfolioEventWithUser = PortfolioEvent & { user: User }

interface Props {
    feedName: string
    portfolioEvents: PortfolioEventWithUser[]
    fetchOptions?: {
        size?: number
        index?: number
        userId?: string
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
    const [index, setIndex] = useState(fetchOptions?.index || 0)

    const size = fetchOptions?.size || DEFAULT_FEED_SIZE

    const fetchData = async () => {
        const response = await get<PortfolioEventWithUser[]>('feed', {
            ...fetchOptions,
            size,
            index,
        })

        if (response.length > 0) {
            setEvents([...events, ...response])
            setIndex(index + size)
        } else {
            setHasMore(false)
        }
    }

    const refresh = async () => {
        const response = await get<PortfolioEventWithUser[]>('feed', {
            ...fetchOptions,
            size,
            index: 0,
        })

        setEvents(response)
        setIndex(0)
        setHasMore(true)
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{feedName}</Card.Title>
                {events.length === 0 && <div>Lonely place here. Start Mentioning this</div>}

                <AsyncScroll
                    className="divide-y overflow-x-hidden"
                    fetchData={fetchData}
                    refresh={refresh}
                    hasMore={hasMore}
                >
                    {events.map((e, i) => (
                        <Grid.Row key={i}>
                            <Grid.Col auto>
                                <Avatar imageURL={e.user.picture} size="md" />
                            </Grid.Col>
                            <Grid.Col auto>
                                <div className="text-truncate">
                                    <strong>{e.user.username}</strong> {actionToVerb[e.action]}{' '}
                                    <strong>
                                        <a href={`/stock/${e.symbol}`}>${e.symbol}</a>
                                    </strong>{' '}
                                    at ${e.price}
                                </div>
                                <div className="text-muted">{moment(e.createdOn).fromNow()}</div>

                                <div>{e.message}</div>
                            </Grid.Col>
                        </Grid.Row>
                    ))}
                </AsyncScroll>
            </Card.Body>
        </Card>
    )
}

export default EventFeed
