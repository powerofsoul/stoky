import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { useEffect, useState } from "react";
import { get } from "../../Api";

interface Props {
    symbol?: string;
}

const CandleStickChart = ({ symbol }: Props) => {
    const [data, setData] = useState<any>();

    const xAccessor = (d: any) => d?.date;

    const fetchDate = async (s?: string) => {
        if (s === undefined) return;
        if (symbol) {
            const apiData = await get<[]>("stock/historical", { symbol });

            setData(
                apiData

                    .map((m: any) => ({
                        ...m,
                        date: new Date(m.date),
                    }))
                    .sort(
                        (a: any, b: any) => a.date.getTime() - b.date.getTime()
                    )
            );
        }
    };

    useEffect(() => {
        fetchDate(symbol);
    }, [symbol]);

    if (!data) return <></>;

    return (
        <ChartCanvas
            height={400}
            ratio={1}
            width={800}
            margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
            type="canvas"
            seriesName="MSFT"
            data={data}
            xAccessor={xAccessor}
            xScale={scaleTime()}
            xExtents={[xAccessor(data[data.length - 1]), xAccessor(data[0])]}
        >
            <Chart id={1} yExtents={(d: any) => [d.high, d.low]}>
                <XAxis axisAt="bottom" orient="bottom" ticks={6} />
                <YAxis axisAt="left" orient="left" ticks={5} />
                <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
            </Chart>
        </ChartCanvas>
    );
};

export default CandleStickChart;
