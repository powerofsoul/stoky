import { CallbackOptions } from "@auth0/nextjs-auth0";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

const yahooFinance = require("yahoo-finance");

export default async (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => {
    const historical = await yahooFinance.historical({
        symbol: req.query.symbol,
        from: '2018-01-01',
        to: moment().format("YYYY-MM-DD"),
        period: 'd'
      });

      res.status(200).json(historical);
}