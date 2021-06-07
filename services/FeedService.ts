import { User } from '@prisma/client'
import { DEFAULT_FEED_SIZE } from '../src/Consts'
import SqlDAO from './SqlDAO'

export const getUserFeed = (user: User, size: number = DEFAULT_FEED_SIZE) => {
    return SqlDAO.portfolioEvent.findMany({
        where: {
            userId: user.id,
        },
        include: { user: {} },
        orderBy: {
            createdOn: 'desc',
        },
        take: size,
    })
}

export const getSymbolFeed = (symbol: string, size: number = DEFAULT_FEED_SIZE) => {
    return SqlDAO.portfolioEvent.findMany({
        where: {
            symbol,
        },
        include: { user: {} },
        orderBy: {
            createdOn: 'desc',
        },
        take: size,
    })
}

export const getGlobalFeed = (size: number = DEFAULT_FEED_SIZE) => {
    return SqlDAO.portfolioEvent.findMany({
        include: { user: {} },
        orderBy: {
            createdOn: 'desc',
        },
        take: size,
    })
}
