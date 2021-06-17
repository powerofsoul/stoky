import { User } from '@prisma/client'
import { result, uniq, merge } from 'lodash'
import moment from 'moment'
import { AnyLengthString } from 'aws-sdk/clients/comprehend'
import { auth0UserToUser } from '../models/User'
import { getHistoryForSymbol } from '../pages/api/stock/historical'
import SqlDAO from '../services/SqlDAO'

export const getUser = async (props: Partial<User>) => {
    const user = await SqlDAO.user.findFirst({
        where: {
            ...props,
        },
    })

    return user
}

export const createUser = async (user: User) =>
    SqlDAO.user.create({
        data: {
            ...user,
            id: undefined,
        },
    })

export const updateUser = async (user: Partial<User>) =>
    SqlDAO.user.update({
        where: {
            id: user.id,
        },
        data: user,
    })

export const ensureAuth0Exists = async (auth0User: any) => {
    try {
        const dbUser = await getUser({ auth0Id: auth0User.sub })
        if (dbUser != null) {
            return dbUser
        }
    } catch (e) {
        console.log('[UserService][GetUser] Something went wrong getting the user')
    }

    return createUser(auth0UserToUser(auth0User))
}

export const getUserPortfolioTickers = (user: User) => {
    return SqlDAO.portfolioTicker.findMany({
        where: {
            userId: user?.id,
        },
    })
}

export const getUserTimeline = async (user: User) => {
    const events = await SqlDAO.portfolioEvent.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdOn: 'asc',
        },
    })

    if (events.length === 0) {
        return []
    }

    const tickers = uniq(events.map((e) => e.symbol))
    const startDate = events[0].createdOn

    let tickerHistory = await Promise.all(tickers.map((t) => getHistoryForSymbol(t, startDate.toISOString())))
    tickerHistory = tickerHistory.filter((t) => t !== null)

    if (tickerHistory.length === 0) {
        return []
    }

    const maxArrayLength = Math.max(...tickerHistory.map((t) => t.length))
    const timeArray = tickerHistory.find((t) => t.length === maxArrayLength).map((t: any) => t.date as string)
    const flattenArray = [].concat.apply([], tickerHistory) as any[]

    const results = {} as {
        [key: string]: {
            date: Date
            open: number
            high: number
            low: number
            close: number
            volume: number
            adjClose: number
            symbol: string
        }
    }

    tickers.forEach((t) => {
        timeArray.forEach((ta: string) => {
            if (!results[ta]) {
                results[ta] = {
                    date: moment(ta).toDate(),
                    open: 0,
                    high: 0,
                    low: 0,
                    close: 0,
                    volume: 0,
                    adjClose: 0,
                    symbol: t,
                }
            }

            const eventsTillDate = events.filter(
                (e) => e.symbol === t && moment(e.createdOn).isSameOrBefore(moment(ta))
            )
            const amount = eventsTillDate.reduce((p, c) => p + c.amount, 0)

            const { open, high, low, close, volume, adjClose } = results[ta]
            const history = flattenArray.find((th: any) => th.symbol === t && th.date === ta) as any

            if (history) {
                results[ta] = {
                    ...results[ta],
                    open: open + amount * history.open,
                    high: high + amount * history.high,
                    low: low + amount * history.low,
                    close: close + amount * history.close,
                    volume: volume + amount * history.volume,
                    adjClose: adjClose + amount * history.adjClose,
                }
            }
        })
    })

    return Object.values(results)
}
