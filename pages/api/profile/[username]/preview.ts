import { CallbackOptions } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment'
import withUser from '../../../../middleware/withUser'
import SqlDAO from '../../../../services/SqlDAO'
import { randomColor } from '../../../../src/Utils'

const { ChartJSNodeCanvas } = require('chartjs-node-canvas')

export default async (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => {
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

    const chartJSNodeCanvas = new ChartJSNodeCanvas({
        width: 1200,
        height: 617,
    })

    const portfolioEvents = await SqlDAO.portfolioTicker.findMany({
        where: {
            userId: user.id,
        },
    })

    const configuration = {
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

    const image = await chartJSNodeCanvas.renderToBuffer(configuration)
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Accept', 'image/png')
    res.status(200).write(image)
    res.end()
}
