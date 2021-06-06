import { PortfolioEvent, PortfolioEventEnum, User } from '@prisma/client'
import { getCachedValue, setCacheValue } from '../middleware/withCache'
import { YahooStockPrice } from '../models/YahooStock'
import { CACHE_DURATION } from '../src/Consts'
import SqlDAO from './SqlDAO'

const yahooFinance = require('yahoo-finance')

const calculateAverage = (oldAmount: number, oldAverage: number, addingAmount: number, addingPrice: number) =>
    (oldAmount * oldAverage + addingAmount * addingPrice) / (oldAmount + addingAmount)

export async function addPortfolioEvent(event: PortfolioEvent) {
    let portfolioTicker = await SqlDAO.portfolioTicker.findFirst({
        where: {
            symbol: event.symbol,
            userId: event.userId,
        },
    })

    if (!portfolioTicker) {
        portfolioTicker = await SqlDAO.portfolioTicker.create({
            data: {
                symbol: event.symbol,
                amount: 0,
                averagePrice: 0,
                profit: 0,
                userId: event.userId,
            },
        })
    }

    portfolioTicker = {
        ...portfolioTicker,
        amount: portfolioTicker.amount + event.amount,
        profit: 0, // TO-DO it's fkin 2 am
        averagePrice: calculateAverage(portfolioTicker.amount, portfolioTicker.averagePrice, event.amount, event.price),
    }

    await SqlDAO.portfolioTicker.update({
        where: {
            id: portfolioTicker.id,
        },
        data: portfolioTicker,
    })

    await SqlDAO.portfolioEvent.create({
        data: {
            ...event,
            action: PortfolioEventEnum.BUY, // TO-DO get this from user
            id: undefined,
        },
    })
}

export async function getSymbolQuotePrice(symbol: string): Promise<YahooStockPrice> {
    const key = `getSymbolQuotePrice_${symbol}`
    const cacheProps = {
        cacheDuration: CACHE_DURATION,
        caseSensitive: true,
    }

    const cachedValue = await getCachedValue(key, cacheProps)

    if (cachedValue) {
        return JSON.parse(cachedValue.data)
    }

    const response = await yahooFinance.quote({
        symbol,
        modules: ['price'],
    })

    const price = response?.price
    await setCacheValue(key, 200, price, cacheProps)

    return response?.price as YahooStockPrice
}

export async function mentionStock(symbol: string, message: string, user: User) {
    const currentPrice = await getSymbolQuotePrice(symbol)

    return SqlDAO.portfolioEvent.create({
        data: {
            action: PortfolioEventEnum.MENTION,
            symbol,
            message,
            amount: 0,
            price: currentPrice.regularMarketPrice,
            userId: user.id,
        },
    })
}
