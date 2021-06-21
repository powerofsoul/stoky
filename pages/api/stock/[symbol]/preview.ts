import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment'
import { ChartConfiguration } from 'chart.js'
import { getHistoryForSymbol } from '../historical'
import DefaultChartJsNodeCanvas from '../../../../src/chartJs/DefaultChartJsNodeCanvas'

const { ChartJSNodeCanvas } = require('chartjs-node-canvas')

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { symbol } = req.query
    if (symbol === undefined) {
        res.status(400).send({
            message: 'Invalid request',
        })
        return
    }

    const data = await getHistoryForSymbol(symbol as string)
    const configuration: any = {
        type: 'line',
        data: {
            labels: data.map((d: any) => moment(d.date).format('YYYY/MM/DD')),
            datasets: [
                {
                    label: `Stock ${symbol}`,
                    data: data.map((d: any) => d.open),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            callback: (value: any) => `$${value}`,
                        },
                    },
                ],
            },
        },
    }
    const image = await DefaultChartJsNodeCanvas.renderToBuffer(configuration)

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Accept', 'image/png')
    res.status(200).write(image)
    res.end()
}
