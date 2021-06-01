import { CallbackOptions } from "@auth0/nextjs-auth0";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import withCache from "../../../middleware/withCache";

const yahooFinance = require("yahoo-finance");

export default withCache(async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    options?: CallbackOptions | undefined
) => {
    const historical = await getHistoryForSymbol(req.query.symbol as string);

    res.status(200).json(historical);
});

export async function getHistoryForSymbol(symbol: string) {
    return (await yahooFinance
        .historical({
            symbol,
            from: "2018-01-01",
            to: moment().format("YYYY-MM-DD"),
            period: "d",
        }))
        .sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
        .map((e: any) => ({
            ...e,
            date: e.date.toISOString(),
        }));
}
