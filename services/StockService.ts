import { Stock } from "../models/Stock"
import DynamoDAO from "./DynamoDAO";
const yahooFinance = require("yahoo-finance");
import lodash from "lodash";

const getYahooStock = async (symbol: string) => {
    const yahooStock = await yahooFinance.quote({
        symbol: symbol,
        modules: ['price']  
    });

    return Object.assign(new Stock(), {
        symbol,
        price: Number.parseFloat(yahooStock.price.regularMarketPrice),
        updatedAt: new Date()
    })
}

const getAndCacheYahooStock = async (symbol: string) => {
    const yahooStock = await getYahooStock(symbol);
    await DynamoDAO.put(yahooStock);

    return yahooStock;
}

export const getSymbol = async (symbol: string) => {
    const stock = new Stock();
    stock.symbol = symbol;

    try {
        const dbStock = await DynamoDAO.get(stock);
        return dbStock;
    } catch {
        return await getAndCacheYahooStock(symbol);
    }
}

export const getSymbols = async (...symbols: string[]) => {
    const toGet = symbols.map(s => Object.assign(new Stock(), {symbol: s}));

    const result = [];
    for await (const stock of DynamoDAO.batchGet(toGet)) {
        result.push(stock);
    }

    const missingStocksFromDynamo = lodash.difference(symbols, result.map(s => s.symbol));
    for await(const missingStock of missingStocksFromDynamo) {
        const stock = await getAndCacheYahooStock(missingStock);
        result.push(stock)
    }
    return result;
}

