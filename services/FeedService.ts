import { User } from '@prisma/client'
import SqlDAO from './SqlDAO'

export const getUserFeed = (user: User) => {
    return SqlDAO.portfolioEvent.findMany({
        where: {
            userId: user.id,
        },
        include: { user: {} },
        orderBy: {
            createdOn: 'desc',
        },
    })
}

export const getSymbolFeed = (symbol: string) => {
    return SqlDAO.portfolioEvent.findMany({
        where: {
            symbol,
        },
        include: { user: {} },
        orderBy: {
            createdOn: 'desc',
        },
    })
}

export const getGlobalFeed = () => {
    return SqlDAO.portfolioEvent.findMany({
        include: { user: {} },
        orderBy: {
            createdOn: 'desc',
        },
    })
}
