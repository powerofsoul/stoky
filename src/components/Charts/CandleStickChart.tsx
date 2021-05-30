import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
import { Chart, ChartCanvas } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import useDimensions from "react-use-dimensions";
import { ChartProps } from "./ChartProps";

const CandleStickChart = ({ data, xTicks, yTicks, height }: ChartProps) => {
    const [ref, { width }] = useDimensions();

    const xAccessor = (d: any) => d?.date;

    return (
        <div ref={ref}>
            <ChartCanvas
                height={height || 400}
                ratio={10}
                width={width}
                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
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
                    <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
                </Chart>
            </ChartCanvas>
        </div>
    );
};

export default CandleStickChart;
