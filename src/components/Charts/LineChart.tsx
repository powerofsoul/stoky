import useDimensions from 'react-use-dimensions'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { AreaSeries } from 'react-stockcharts/lib/series'
import { scaleTime } from 'd3-scale'
import { ChartProps } from './ChartProps'

const LineChart = ({ data, height, hideAxis, xTicks, yTicks, width: w }: ChartProps) => {
    const [ref, { width }] = useDimensions()
    const xAccessor = (d: any) => d?.date

    return (
        <div ref={ref}>
            <ChartCanvas
                width={w || width || 800}
                height={height || 400}
                margin={{
                    left: 50,
                    right: 50,
                    top: 10,
                    bottom: 30,
                }}
                data={data}
                type="svg"
                ratio={10}
                seriesName=""
                xAccessor={(d: any) => d?.date}
                xScale={scaleTime()}
                xExtents={[xAccessor(data?.[data?.length - 1]), xAccessor(data?.[0])]}
            >
                <Chart id={0} yExtents={(d: any) => d.close}>
                    {!hideAxis && <XAxis axisAt="bottom" orient="bottom" ticks={xTicks || 6} />}
                    {!hideAxis && <YAxis axisAt="left" orient="left" ticks={yTicks || 6} />}
                    <AreaSeries yAccessor={(d: any) => d.close} />
                </Chart>
            </ChartCanvas>
        </div>
    )
}

export default LineChart
