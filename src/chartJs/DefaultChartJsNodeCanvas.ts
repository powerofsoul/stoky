/* eslint-disable no-param-reassign */

import { ChartJSNodeCanvas } from 'chartjs-node-canvas'

const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 1200,
    height: 617,
    chartCallback: (ChartJS: any) => {
        ChartJS.defaults.font.family = 'Nunito-Light'
        ChartJS.Chart.register({
            id: 'backgroundColor',
            beforeDraw: (chart: any) => {
                const { ctx } = chart
                ctx.fillStyle = '#F0F0F0'
                ctx.fillRect(0, 0, 1200, 617)
            },
        })
    },
})
chartJSNodeCanvas.registerFont('assets/fonts/Nunito-Light.ttf', { family: 'Nunito-Bold' })

export default chartJSNodeCanvas
