import {
    attribute,
    hashKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations'

export interface YahooStock {
    exchange: string
    shortname: string
    quoteType: string
    symbol: string
    index: string
    typeDisp: string
    longname: string
}
