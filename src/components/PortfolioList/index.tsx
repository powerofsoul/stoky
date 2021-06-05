import { Avatar, Card, Grid, Table } from 'tabler-react'
import { PortfolioTicker } from '.prisma/client'
import { toPrecision } from '../../Utils'

interface Props {
    portfolioTickers: PortfolioTicker[]
}

const PortfolioList = (props: Props) => {
    const { portfolioTickers } = props

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>My Holdings</Card.Title>
                {portfolioTickers?.length === 0 && <div>No Holdings</div>}
                <Table>
                    <Table.Header>
                        <Table.ColHeader />
                        <Table.ColHeader>Ticker</Table.ColHeader>
                        <Table.ColHeader>Amount</Table.ColHeader>
                        <Table.ColHeader>Average Price</Table.ColHeader>
                        <Table.ColHeader>Change</Table.ColHeader>
                        <Table.ColHeader>Current Value</Table.ColHeader>
                    </Table.Header>
                    <Table.Body>
                        {portfolioTickers?.map((t) => (
                            <Table.Row>
                                <Table.Col>
                                    <Avatar size="md" imageURL={`https://images.stoky.io/${t.symbol}.png`} />
                                </Table.Col>
                                <Table.Col>${t.symbol} </Table.Col>
                                <Table.Col>${t.amount} </Table.Col>
                                <Table.Col>${toPrecision(t.averagePrice, 2)} </Table.Col>
                                <Table.Col> --- </Table.Col>
                                <Table.Col>${t.profit} </Table.Col>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card.Body>
        </Card>
    )
}

export default PortfolioList
