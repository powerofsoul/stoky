import { SYMBOL_MAX_LENGTH } from './Consts'

export function isValidSymbol(symbol: string) {
    if (symbol.length > SYMBOL_MAX_LENGTH) return false
    if (!symbol.match(/[a-zA-Z0-9]/)) return false

    return true
}

export function toPrecision(value: number, precision: number) {
    return value?.toFixed(precision)
}

export function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export function calculateStockChange(amount: number, averagePrice: number, currentPrice: number) {
    const currentValue = amount * currentPrice
    const averageValue = amount * averagePrice

    return ((currentValue - averageValue) / averageValue) * 100
}
