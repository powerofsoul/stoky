import { Avatar, Card, Grid, Table } from 'tabler-react'
import React from 'react'
import { PortfolioTicker } from '.prisma/client'
import { calculateStockChange, toPrecision } from '../../Utils'
import { YahooStockPrice } from '../../../models/YahooStock'
import ValueBadge from '../ValueBadge'
import PortfolioProgressBar from '../PortfolioProgressBar'
import { symbolLink } from '../../Links'

interface Props {
    portfolioTickers: PortfolioTicker[]
    tickerQuotes: YahooStockPrice[]
    title?: string
}

const PortfolioList = (props: Props) => {
    const { portfolioTickers, tickerQuotes, title } = props
    return (
        <Card>
            <Card.Body>
                <PortfolioProgressBar portfolioTickers={portfolioTickers || []} />
                <Card.Title>{title || 'My Holdings'}</Card.Title>
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
                                const currentValuePercentage = calculateStockChange(
                                    t.amount,
                                    t.averagePrice,
                                    currentPrice.regularMarketPrice
                                )

                                return (
                                    <Table.Row key={t.symbol}>
                                        <Table.Col>
                                            <a href={symbolLink(t.symbol)}>{t.symbol}</a>
                                        </Table.Col>
                                        <Table.Col>{t.amount} </Table.Col>
                                        <Table.Col>
                                            {currentPrice.currencySymbol}
                                            {toPrecision(t.averagePrice, 2)}{' '}
                                        </Table.Col>
                                        <Table.Col>
                                            {currentPrice.currencySymbol}
                                            {toPrecision(currentPrice.regularMarketPrice, 2)}
                                        </Table.Col>
                                        <Table.Col>
                                            <ValueBadge
                                                value={currentPrice.regularMarketChangePercent * 100}
                                                suffix="%"
                                                precision={2}
                                            />
                                        </Table.Col>
                                        <Table.Col>
                                            <ValueBadge
                                                precision={2}
                                                baseValue={t.averagePrice * t.amount}
                                                value={currentPrice.regularMarketPrice * t.amount}
                                                prefix={currentPrice.currencySymbol}
                                                suffix={` (${toPrecision(currentValuePercentage, 2)}%) `}
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
