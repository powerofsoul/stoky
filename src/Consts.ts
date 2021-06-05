export const SYMBOL_MAX_LENGTH = 7
export const CACHE_DURATION = 600000 // ms

export default {
    siteName: 'Stocky',
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://stoky.io',
    QUERY_MAX_LENGTH: SYMBOL_MAX_LENGTH,
    CACHE_DURATION,
}
