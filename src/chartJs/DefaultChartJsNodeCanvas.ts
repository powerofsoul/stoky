/* eslint-disable no-param-reassign */

import { ChartJSNodeCanvas } from 'chartjs-node-canvas'

const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 1200,
    height: 617,
    chartCallback: (ChartJS: any) => {
        ChartJS.defaults.font.family = 'Nunito-Light'
    },
})
chartJSNodeCanvas.registerFont('assets/fonts/Nunito-Light.ttf', { family: 'Nunito-Bold' })

export default chartJSNodeCanvas
