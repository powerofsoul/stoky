import { NextApiRequest, NextApiResponse } from 'next'
import withUser from '../../middleware/withUser'
import { getSymbolQuotePrice } from '../../services/PortfolioService'
import SqlDAO from '../../services/SqlDAO'

export default withUser(async (req: NextApiRequest, res: NextApiResponse<any>) => {
    switch (req.method) {
        case 'POST':
            await POST(req, res)
            break
        case 'GET':
            await getWatchlistApi(req, res)
            break
        case 'DELETE':
            await DELETE(req, res)
            break
        default:
            res.status(404).send({})
            break
    }
})

export async function getWatchlistApi(req: NextApiRequest, res: NextApiResponse<any>) {
    const symbols = await SqlDAO.watchList.findMany({
        where: {
            userId: req?.user?.id,
        },
    })

    const symbolsWithPrice = await Promise.all(
        symbols.map(async (watchList) => {
            const { symbol } = watchList
            const price = await getSymbolQuotePrice(symbol)

            return {
                symbol,
                price,
            }
        })
    )

    res.status(200).json(symbolsWithPrice)
    return symbolsWithPrice
}

async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.user?.id === undefined) {
        res.status(403).send({})
        return
    }

    const { symbol } = req.body

    await SqlDAO.watchList.create({
        data: {
            symbol,
            userId: req.user?.id,
        },
    })

    res.status(200).json({
        succeed: true,
    })
}

async function DELETE(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.user?.id === undefined) {
        res.status(403).send({})
        return
    }

    const { symbol } = req.query as { [key: string]: string }
    await SqlDAO.watchList.delete({
        where: {
            userId_symbol: {
                symbol,
                userId: req.user.id,
            },
        },
    })

    res.status(200).json({
        succeed: true,
    })
}
