import { PortfolioEventEnum } from '@prisma/client'
import { object, string, array, number } from 'yup'

const validator = object({
    tickers: array(
        object({
            symbol: string().nullable().required('Required').min(1, 'Invalid Symbol').max(10, 'Invalid Symbol'),
            price: number().nullable().min(0, 'Invalid Price').required('Required'),
            amount: number().min(0, 'Invalid Amount').nullable().required('Required'),
            action: string().required().oneOf<PortfolioEventEnum>(['BUY', 'SELL']),
        })
    ).min(1),
    message: string().optional().max(500, 'Too long'),
})

export default validator
