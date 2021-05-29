import { CallbackOptions } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const yahooFinance = require("yahoo-finance");

export default async (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => {
    const date = new Date();
    const historical = await yahooFinance.historical({
        symbol: req.query.symbol,
        from: '2012-01-01',
        to: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`,
        period: 'd'
      });

      res.status(200).json(historical);
}