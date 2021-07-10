export const SYMBOL_MAX_LENGTH = 7
export const CACHE_DURATION = 600000 // ms -> 10 mins
export const DEFAULT_FEED_SIZE = 10
export const GIPHY_API_KEY = 'NYRbjS3QaGEntJVQWWAVuDHUPTCvZvDh'
export const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS
    ? Number.parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
    : 2
export const JWT_SECRET = process.env.JWT_SECRET || 'local-secret'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const DOMAIN = IS_DEVELOPMENT ? 'http://localhost:3000' : 'https://stoky.io'

export default {
    siteName: 'Stocky',
    url: DOMAIN,
    QUERY_MAX_LENGTH: SYMBOL_MAX_LENGTH,
    CACHE_DURATION,
    DEFAULT_FEED_SIZE,
    GIPHY_API_KEY,
    BCRYPT_SALT_ROUNDS,
    JWT_SECRET,
}
