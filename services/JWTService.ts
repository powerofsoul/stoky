import { JWT_SECRET } from '../src/Consts'
import SqlDAO from './SqlDAO'
import { getUser } from './UserService'

const jwt = require('jsonwebtoken')

export const JWT_LOGIN_COOKIE_NAME = 'token'

export const generateUserLoginToken = (userId: number) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
    })

    return token
}

export const getUserFromLoginToken = async (token: string) => {
    const decrypt = await jwt.verify(token, JWT_SECRET)
    const user = await getUser({
        id: decrypt.id,
    })

    return user
}
