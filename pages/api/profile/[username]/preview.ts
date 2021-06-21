import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment'
import { ChartConfiguration } from 'chart.js'
import withUser from '../../../../middleware/withUser'
import SqlDAO from '../../../../services/SqlDAO'
import { randomColor } from '../../../../src/Utils'
import DefaultChartJsNodeCanvas from '../../../../src/chartJs/DefaultChartJsNodeCanvas'

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { username } = req.query as { [key: string]: string }

    const user = await SqlDAO.user.findFirst({
        where: {
            username,
        },
    })

    if (!user) {
        res.redirect('/')
        return
    }

    const portfolioEvents = await SqlDAO.portfolioTicker.findMany({
        where: {
            userId: user.id,
        },
    })

    const configuration: ChartConfiguration = {
        type: 'doughnut',
        data: {
            labels: portfolioEvents.map((p) => p.symbol),
            datasets: [
                {
                    label: `test`,
                    data: portfolioEvents.map((p) => p.amount * p.averagePrice),
                    backgroundColor: portfolioEvents.map(() => randomColor()),
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `${user.username} portfolio`,
                },
            },
        },
    }

    const image = await DefaultChartJsNodeCanvas.renderToBuffer(configuration)
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Accept', 'image/png')
    res.status(200).write(image)
    res.end()
}
