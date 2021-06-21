import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'
import withCache from '../../../middleware/withCache'
import { SYMBOL_MAX_LENGTH } from '../../../src/Consts'
import { isValidSymbol } from '../../../src/Utils'

const yahooFinance = require('yahoo-finance')

export async function getHistoryForSymbol(symbol: string, startDate?: string, period?: string) {
    if (!isValidSymbol(symbol)) {
        return null
    }

    const searchQuery = {
        symbol,
        from: startDate ? moment(startDate).format('YYYY-MM-DD') : '2018-01-01',
        to: moment().format('YYYY-MM-DD'),
        period: 'd',
    }

    return (await yahooFinance.historical(searchQuery)).sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
}

export default withCache(async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const historical = await getHistoryForSymbol(req.query.symbol as string, req.query.startDate as string)

    res.status(200).json(historical)
})
