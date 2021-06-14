import { handleCallback, getSession } from '@auth0/nextjs-auth0'
import { CallbackOptions } from '@auth0/nextjs-auth0/dist/auth0-session'
import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'
import SqlDAO from '../../services/SqlDAO'

export default async (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => {
    const { userId, symbol, index, size, since } = req.query as {
        [key: string]: string
    }

    const currentIndex = Number.parseInt(index, 10) ?? 0
    const currentSize = !Number.isNaN(+size) ? Number.parseInt(size, 10) : undefined
    const parsedUserId = userId ? Number.parseInt(userId, 10) : undefined
    const parsedSince = moment(since).isValid() ? moment(since).toDate() : undefined

    const feed = await SqlDAO.portfolioEvent.findMany({
        where: {
            userId: parsedUserId,
            symbol,
            createdOn: {
                gt: parsedSince,
            },
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
