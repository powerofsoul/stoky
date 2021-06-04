import { scaleTime } from 'd3-scale'
import { utcDay } from 'd3-time'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { CandlestickSeries } from 'react-stockcharts/lib/series'
import { timeIntervalBarWidth } from 'react-stockcharts/lib/utils'
import {
    CrossHairCursor,
    MouseCoordinateY,
    MouseCoordinateX,
} from 'react-stockcharts/lib/coordinates'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import useDimensions from 'react-use-dimensions'
import { ChartProps } from './ChartProps'

const CandleStickChart = ({ data, xTicks, yTicks, height }: ChartProps) => {
    const [ref, { width }] = useDimensions()

    const xAccessor = (d: any) => d?.date

    return (
        <div ref={ref}>
            <ChartCanvas
                height={height || 400}
                ratio={10}
                width={width}
                margin={{
                    left: 50,
                    right: 50,
                    top: 20,
                    bottom: 30,
                }}
                type="canvas"
                data={data}
                xAccessor={xAccessor}
                xScale={scaleTime()}
                xExtents={[
                    xAccessor(data?.[data.length - 1]),
                    xAccessor(data?.[0]),
                ]}
            >
                <Chart id={1} yExtents={(d: any) => [d.high, d.low]}>
                    <XAxis
                        axisAt="bottom"
                        orient="bottom"
                        ticks={xTicks || 5}
                    />
                    <YAxis axisAt="left" orient="left" ticks={yTicks || 5} />
                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format('.2f')}
                    />
                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat('%Y-%m-%d')}
                    />

                    <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
                    <OHLCTooltip origin={[0, -10]} />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        </div>
    )
}

export default CandleStickChart
