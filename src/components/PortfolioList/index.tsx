import { Avatar, Card, Grid, Table } from 'tabler-react'
import { PortfolioTicker } from '.prisma/client'
import { toPrecision } from '../../Utils'
import { YahooStockPrice } from '../../../models/YahooStock'
import ValueBadge from '../ValueBadge'

interface Props {
    portfolioTickers: PortfolioTicker[]
    tickerQuotes: YahooStockPrice[]
}

const PortfolioList = (props: Props) => {
    const { portfolioTickers, tickerQuotes } = props
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>My Holdings</Card.Title>
                {portfolioTickers?.length === 0 && <div>No Holdings</div>}
                <div className="table-responsive">
                    <Table className="table-vcenter">
                        <Table.Header>
                            <Table.ColHeader>Ticker</Table.ColHeader>
                            <Table.ColHeader>Amount</Table.ColHeader>
                            <Table.ColHeader>Average Price</Table.ColHeader>
                            <Table.ColHeader>Current Price</Table.ColHeader>
                            <Table.ColHeader>Change</Table.ColHeader>
                            <Table.ColHeader>Current Value</Table.ColHeader>
                        </Table.Header>
                        <Table.Body>
                            {portfolioTickers?.map((t) => {
                                const currentPrice = tickerQuotes.find((s) => t.symbol === s.symbol)
                                if (currentPrice === undefined) {
                                    return <></>
                                }

                                return (
                                    <Table.Row>
                                        <Table.Col>
                                            <Avatar size="md" imageURL={`https://images.stoky.io/${t.symbol}.png`} /> $
                                            {t.symbol}{' '}
                                        </Table.Col>
                                        <Table.Col>${t.amount} </Table.Col>
                                        <Table.Col>${toPrecision(t.averagePrice, 2)} </Table.Col>
                                        <Table.Col>${toPrecision(currentPrice.regularMarketPrice, 2)}</Table.Col>
                                        <Table.Col>
                                            <ValueBadge
                                                value={currentPrice.regularMarketChangePercent}
                                                suffix="%"
                                                precision={4}
                                            />
                                        </Table.Col>
                                        <Table.Col>
                                            <ValueBadge
                                                precision={2}
                                                value={currentPrice.regularMarketPrice * t.amount}
                                                prefix={currentPrice.currencySymbol}
                                            />
                                        </Table.Col>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    )
}

export default PortfolioList
