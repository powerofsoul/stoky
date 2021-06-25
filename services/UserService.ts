import { PortfolioEventEnum, User } from '@prisma/client'
import { result, uniq, merge } from 'lodash'
import moment from 'moment'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { getHistoryForSymbol } from '../pages/api/stock/historical'
import SqlDAO from '../services/SqlDAO'
import { getSymbolQuotePrice } from './PortfolioService'
import { BCRYPT_SALT_ROUNDS, IS_DEVELOPMENT } from '../src/Consts'
import { generateUserLoginToken, JWT_LOGIN_COOKIE_NAME } from './JWTService'
import { ReturnOfPromise } from '../src/TypingUtils'

export const getUser = async (props: Partial<User>, excludePassword = true) => {
    const user = await SqlDAO.user.findFirst({
        where: {
            ...props,
        },
    })

    if (user && excludePassword) {
        // @ts-ignore
        delete user?.password
    }

    return user
}

export const createUser = async (email: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
        bcrypt.genSalt(BCRYPT_SALT_ROUNDS, (err, salt) => {
            if (err) {
                reject('Something went wrong')
                return
            }

            bcrypt.hash(password, salt, async (hashError, hash) => {
                if (hashError) {
                    reject('Something went wrong')
                    return
                }

                try {
                    const user = await SqlDAO.user.create({
                        data: {
                            email,
                            password: hash,
                            username: email.split('@')[0],
                        },
                    })
                    resolve(user)
                } catch (exception) {
                    if (exception.meta?.target === 'email_unique') {
                        reject('Email already exists')
                    } else {
                        reject('Something went wrong')
                    }
                }
            })
        })
    })
}

export const loginUser = async (email: string, password: string, res: NextApiResponse) => {
    const user = await SqlDAO.user.findUnique({
        where: {
            email,
        },
    })

    if (user) {
        if (!user.activated) {
            throw 'You need to activate your account. Please check your email for the activation link'
        }

        const passwordIsValid = await bcrypt.compare(password, user.password)

        if (!passwordIsValid) {
            throw 'Invalid password'
        } else {
            const token = generateUserLoginToken(user.id)
            res.setHeader(
                'Set-Cookie',
                cookie.serialize(JWT_LOGIN_COOKIE_NAME, token, {
                    httpOnly: true,
                    expires: IS_DEVELOPMENT ? moment().add(5, 'd').toDate() : moment().add(1, 'd').toDate(),
                    secure: !IS_DEVELOPMENT,
                    path: '/',
                })
            )
        }
    } else {
        throw 'Invalid password'
    }
}

export const logoutUser = (res: NextApiResponse) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize(JWT_LOGIN_COOKIE_NAME, '', {
            httpOnly: true,
            expires: moment().subtract(1, 'd').toDate(),
            secure: !IS_DEVELOPMENT,
            path: '/',
        })
    )
}

export const updateUser = async (user: Partial<User>) =>
    SqlDAO.user.update({
        where: {
            id: user.id,
        },
        data: user,
    })

export const getUserPortfolioTickers = (user: User) => {
    return SqlDAO.portfolioTicker.findMany({
        where: {
            userId: user?.id,
        },
    })
}

// TO-DO refactor
export const getUserTimeline = async (user: User) => {
    const events = await SqlDAO.portfolioEvent.findMany({
        where: {
            userId: user.id,
            AND: {
                action: {
                    in: [PortfolioEventEnum.BUY, PortfolioEventEnum.SELL],
                },
            },
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

    const now = new Date()

    const maxArrayLength = Math.max(...tickerHistory.map((t) => t.length))
    let timeArray = tickerHistory.find((t) => t.length === maxArrayLength).map((t: any) => t.date as string)
    timeArray.push(now)

    // TODO Find a way to leave saturday and sunday.
    // Main problem is that stocks have a value on weekends and stocks don't.
    // This results in invalid weekend values if portfolio contains crypto
    timeArray = timeArray.filter((d: Date) => d.getDay() !== 6 && d.getDay() !== 0)

    const flattenArray = [].concat.apply([], tickerHistory) as any[]
    const todayPrices = await Promise.all(tickers.map((t) => getSymbolQuotePrice(t)))
    todayPrices.forEach((c) => {
        flattenArray.push({
            date: now,
            symbol: c.symbol,
            open: c.regularMarketPrice,
            high: c.regularMarketDayHigh,
            low: c.regularMarketDayLow,
            close: c.regularMarketPrice,
            volume: c.regularMarketVolume,
            adjClose: c.regularMarketPrice,
        })
    })

    const results = {} as {
        [key: string]: {
            date: Date
            open: number
            high: number
            low: number
            close: number
            volume: number
            adjClose: number
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
                }
            }

            const eventsTillDate = events.filter(
                (e) => e.symbol === t && moment(e.createdOn).isSameOrBefore(moment(ta))
            )
            const amount = eventsTillDate.reduce((p, c) => p + c.amount, 0)

            const { open, high, low, close, volume, adjClose } = results[ta]
            const history = flattenArray.find(
                (th: any) => th.symbol === t && moment(th.date).isSame(moment(ta), 'day')
            ) as any

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

    // might happen that yahoo finance is not sending data for few days :(
    // TO-DO find alternative
    return Object.values(results).filter((e) => e.close !== 0)
}

export type UserTimelineType = ReturnOfPromise<typeof getUserTimeline>
