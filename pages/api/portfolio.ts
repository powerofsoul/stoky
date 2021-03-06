import { NextApiRequest, NextApiResponse } from 'next'
import { PortfolioEventEnum } from '.prisma/client'
import withUser from '../../middleware/withUser'
import { addPortfolioEvent } from '../../services/PortfolioService'
import SqlDAO from '../../services/SqlDAO'
import UpdatePortfolioValidator from '../../validators/UpdatePortfolioValidator'

const GET = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { user } = req

    const portfolioTickers = await SqlDAO.portfolioTicker.findMany({
        where: {
            userId: user?.id,
        },
    })

    res.status(200).json(portfolioTickers)
}

const POST = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const updatePortfolioRequest = await UpdatePortfolioValidator.validate(req.body, {
        stripUnknown: true,
    })

    const { user } = req
    if (!user || user == null) {
        res.status(401)
        return
    }

    if (updatePortfolioRequest?.tickers) {
        const promises = updatePortfolioRequest.tickers.map(async (t) => {
            await addPortfolioEvent({
                action: t.action as PortfolioEventEnum,
                amount: t.amount,
                price: t.price,
                symbol: t.symbol,
                createdOn: new Date(),
                message: updatePortfolioRequest.message ?? '',
                userId: user.id,
                id: 0,
                giphyId: null,
            })
        })

        await Promise.all(promises)

        return GET(req, res)
    }
}

export default withUser(async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
    switch (req.method) {
        case 'POST':
            await POST(req, res)
            break
        case 'GET':
            await GET(req, res)
            break
        default:
            res.status(404).send({})
            break
    }
})
