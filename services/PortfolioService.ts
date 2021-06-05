import { PortfolioEvent, PortfolioEventEnum } from '@prisma/client'
import SqlDAO from './SqlDAO'

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
