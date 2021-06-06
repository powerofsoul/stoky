import { User } from '@prisma/client'
import moment from 'moment'
import { Card, Grid, Avatar } from 'tabler-react'
import { PortfolioEvent, PortfolioEventEnum } from '.prisma/client'

interface Props {
    feedName: string
    portfolioEvents: (PortfolioEvent & { user: User })[]
}

const actionToVerb = {
    [PortfolioEventEnum.BUY]: 'bought',
    [PortfolioEventEnum.SELL]: 'sold',
    [PortfolioEventEnum.MENTION]: 'bought',
}

const EventFeed = ({ portfolioEvents, feedName }: Props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{feedName}</Card.Title>
                {portfolioEvents.length === 0 && <div>Lonely place here. Start Mentioning this</div>}
                <div className="divide-y OverflowCard">
                    {portfolioEvents.map((e) => (
                        <Grid.Row key={e.id}>
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
                </div>
            </Card.Body>
        </Card>
    )
}

export default EventFeed
