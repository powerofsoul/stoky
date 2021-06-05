import { Card, Grid, Loader, Avatar } from 'tabler-react'
import { useAppContext } from '../../context/AppContext'
import { toPrecision } from '../../Utils'

const PortfolioList = () => {
    const { isLoading, portfolioTickers } = useAppContext()

    if (isLoading) {
        return <Loader />
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>My Holdings</Card.Title>
                {portfolioTickers?.length === 0 && <div>No Holdings</div>}
                {portfolioTickers?.map((t) => (
                    <Card key={t.id} className="p-2">
                        <Grid.Row>
                            <Grid.Col xs={1} sm={2}>
                                <Avatar size="md" imageURL={`https://images.stoky.io/${t.symbol}.png`} />
                            </Grid.Col>
                            <Grid.Col>
                                <Grid.Row>
                                    ${t.symbol} x {t.amount}
                                </Grid.Row>
                                <Grid.Row>
                                    Value: {toPrecision(t.amount * t.averagePrice, 2)} USD at{' '}
                                    {toPrecision(t.averagePrice, 2)}
                                </Grid.Row>
                            </Grid.Col>
                        </Grid.Row>
                    </Card>
                ))}
            </Card.Body>
        </Card>
    )
}

export default PortfolioList
