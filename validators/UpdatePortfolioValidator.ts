import { object, string, array, number } from 'yup'

const validator = object({
    tickers: array(
        object({
            symbol: string().nullable().required('Required').min(1, 'Invalid Symbol').max(10, 'Invalid Symbol'),
            price: number().nullable().min(0, 'Invalid Price').required('Required'),
            amount: number().nullable().required('Required'),
        })
    ).min(1),
    message: string().optional().max(500, 'Too long'),
})

export default validator
