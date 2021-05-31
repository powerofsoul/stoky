import { CallbackOptions } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const yahooQueryUrl = (symbol: string) => `http://query1.finance.yahoo.com/v1/finance/search?q=${symbol}&lang=en-U`;

export default async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    options?: CallbackOptions | undefined
) => {
    const query = req.query.query as string;
    const result = await fetch(yahooQueryUrl(query));
    if(result.ok) {
        const obj = JSON.parse(await result.text());

        res.status(200).json(obj?.quotes);
    }

    res.status(400).end();
};
 