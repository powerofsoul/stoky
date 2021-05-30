import { CallbackOptions } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getHistoryForSymbol } from "../historical";
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
import moment from "moment";

export default async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    options?: CallbackOptions | undefined
) => {
    const { symbol } = req.query;
    if (symbol == undefined) {
        res.status(400).send({
            message: "Invalid request",
        });
        return;
    }

    const data = await getHistoryForSymbol(symbol as string);
    const chartJSNodeCanvas = new ChartJSNodeCanvas({
        width: 1200,
        height: 630
    });

    const configuration = {
        type: 'line',
        data: {
            labels: data.map((d: any) => moment(d.date).format("YYYY/MM/DD")),
            datasets: [{
                label: `Stock ${symbol}`,
                data: data.map((d: any) => d.open),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: (value: any) => '$' + value
                    }
                }]
            }
        }
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    res.status(200).write(image);
};
