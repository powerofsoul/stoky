import { useEffect, useState } from "react";
import { get } from "../../Api";
import { ChartProps } from "./ChartProps";

interface Props {
    Chart: any;
    chartProps?: ChartProps;
    symbol: string;
}

const CardFetcher = ({ Chart, chartProps, symbol }: Props) => {
    const [data, setData] = useState<any>();
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
    if (!data.length) {
        return <span>No data for {symbol}</span>;
    }

    return (
        <>
            <Chart {...(chartProps || {})} data={data} />
        </>
    );
};

export default CardFetcher;