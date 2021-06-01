import { SYMBOL_MAX_LENGTH } from "./Consts";

export default function isValidSymbol(symbol: string) {
    if(symbol.length > SYMBOL_MAX_LENGTH) return false;
    if(!symbol.match(/[a-zA-Z0-9]/)) return false;

    return true;
}