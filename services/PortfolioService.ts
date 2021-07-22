import { PortfolioEvent, PortfolioEventEnum, User } from '@prisma/client'
import { getCachedValue, setCacheValue } from '../middleware/withCache'
import { YahooStockPrice } from '../models/YahooStock'
import { CACHE_DURATION } from '../src/Consts'
import SqlDAO from './SqlDAO'

const yahooFinance = require('yahoo-finance')

const calculateAverage = (oldAmount: number, oldAverage: number, addingAmount: number, addingPrice: number) => {
    return (oldAmount * oldAverage + addingAmount * addingPrice) / (oldAmount + addingAmount)
}

const calculateProfit = (
    amount: number,
    average: number,
    action: 'BUY' | 'SELL',
    actionAmount: number,
    actionPrice: number
) => {
    if (action === 'BUY') {
        return amount < 0 ? Math.abs(amount) * average - actionAmount * actionPrice : 0
    }
    return amount > 0 ? actionAmount * actionPrice - Math.abs(amount) * average : 0
}

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

    if (event.action === 'MENTION') {
        throw 'Invalid action'
    }

    let averagePrice = 0
    let profit = 0
    const amount = event.action === 'BUY' ? event.amount : -event.amount
    if (
        (portfolioTicker.amount < 0 && portfolioTicker.amount + amount > 0) ||
        (portfolioTicker.amount > 0 && portfolioTicker.amount + amount < 0)
    ) {
        averagePrice = calculateAverage(0, 0, event.amount, event.price)
        profit = calculateProfit(
            portfolioTicker.amount,
            portfolioTicker.averagePrice,
            event.action,
            Math.abs(portfolioTicker.amount),
            event.price
        )
    } else {
        averagePrice = calculateAverage(
            Math.abs(portfolioTicker.amount),
            portfolioTicker.averagePrice,
            event.amount,
            event.price
        )
        profit = calculateProfit(
            portfolioTicker.amount,
            portfolioTicker.averagePrice,
            event.action,
            event.amount,
            event.price
        )
    }

    if (portfolioTicker.amount + amount === 0) {
        portfolioTicker = {
            ...portfolioTicker,
            amount: 0,
            profit: portfolioTicker.profit + profit,
            averagePrice: 0,
        }
    } else {
        portfolioTicker = {
            ...portfolioTicker,
            amount: portfolioTicker.amount + amount,
            profit: portfolioTicker.profit + profit,
            averagePrice,
        }
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

export async function mentionStock(user: User, symbol: string, message: string, giphyId?: string) {
    const currentPrice = await getSymbolQuotePrice(symbol)

    return SqlDAO.portfolioEvent.create({
        data: {
            action: PortfolioEventEnum.MENTION,
            symbol,
            message,
            amount: 0,
            price: currentPrice.regularMarketPrice,
            userId: user.id,
            giphyId,
        },
    })
}
