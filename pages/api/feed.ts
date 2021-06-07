import { handleCallback, getSession } from '@auth0/nextjs-auth0'
import { CallbackOptions } from '@auth0/nextjs-auth0/dist/auth0-session'
import { NextApiRequest, NextApiResponse } from 'next'
import SqlDAO from '../../services/SqlDAO'

export default async (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => {
    const { userId, symbol, index, size } = req.query as {
        [key: string]: string
    }

    const currentIndex = Number.parseInt(index, 10) ?? 0
    const currentSize = Number.parseInt(size, 10) ?? 10

    const feed = await SqlDAO.portfolioEvent.findMany({
        where: {
            userId,
            symbol,
        },
        orderBy: {
            createdOn: 'desc',
        },
        skip: currentIndex,
        take: currentSize,
        include: {
            user: {},
        },
    })

    res.status(200).json(feed)
}
