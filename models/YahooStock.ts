import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'

export interface YahooStock {
    exchange: string
    shortname: string
    quoteType: string
    symbol: string
    index: string
    typeDisp: string
    longname: string
}

export interface YahooStockPrice {
    maxAge: number
    postMarketChangePercent: number
    postMarketChange: number
    postMarketTime: Date
    postMarketPrice: number
    regularMarketChangePercent: number
    regularMarketChange: number
    regularMarketTime: Date
    priceHint: number
    regularMarketPrice: number
    regularMarketDayHigh: number
    regularMarketDayLow: number
    regularMarketVolume: number
    regularMarketPreviousClose: number
    regularMarketOpen: number
    exchange: string
    exchangeName: string
    exchangeDataDelayedBy: number
    marketState: string
    quoteType: string
    symbol: string
    underlyingSymbol: null
    shortName: string
    longName: string
    currency: string
    quoteSourceName: string
    currencySymbol: string
    marketCap: number
}
