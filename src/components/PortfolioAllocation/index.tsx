import { Grid, Card } from 'tabler-react'
import { PortfolioTicker } from '@prisma/client'
import { Doughnut } from 'react-chartjs-2'
import { UserTimelineType } from '../../../services/UserService'
import { randomColor } from '../../Utils'

interface Props {
    portfolioTickers?: PortfolioTicker[]
    portfolioTickersColors?: string[]
}

const PortfolioAllocation = ({ portfolioTickers, portfolioTickersColors }: Props) => {
    if (!portfolioTickers || portfolioTickers.length === 0) {
        return <></>
    }

    const colors = portfolioTickersColors || portfolioTickers.map(() => randomColor())
    const data = {
        labels: portfolioTickers.map((p) => p.symbol),
        datasets: [
            {
                label: '# of Votes',
                data: portfolioTickers.map((p) => p.amount * p.averagePrice),
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    }

    return (
        <Grid.Row>
            <Grid.Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Allocation</Card.Title>
                        <Doughnut height={150} width={150} data={data} type="doughnut" />
                    </Card.Body>
                </Card>
            </Grid.Col>
        </Grid.Row>
    )
}

export default PortfolioAllocation
