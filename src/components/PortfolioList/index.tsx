import { useEffect, useState } from 'react'
import { Card, Loader, Grid } from 'tabler-react'
import { PortfolioTicker } from '.prisma/client'
import { get } from '../../Api'
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
                            <Grid.Col sm={1}>
                                <img
                                    alt="logo"
                                    style={{ height: '40px', width: '40px' }}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1200px-Tesla_T_symbol.svg.png"
                                />
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
