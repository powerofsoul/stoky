import { IS_DEVELOPMENT, JWT_SECRET } from '../src/Consts'
import SqlDAO from './SqlDAO'
import { getUser } from './UserService'

const jwt = require('jsonwebtoken')

export const JWT_LOGIN_COOKIE_NAME = 'token'

const JWTActionsArr = ['SESSION', 'SIGNUP', 'FORGOTPASSWORD'] as const
export type JWTActions = typeof JWTActionsArr[number]

export const generateUserLoginToken = (userId: number) => {
    return generateJWTForObject('SESSION', { userId })
}

export const generateJWTForObject = (action: JWTActions, arg: any) => {
    const token = jwt.sign({ ...arg, action }, JWT_SECRET, {
        expiresIn: IS_DEVELOPMENT ? '1d' : '7d',
    })

    return token
}

export const decodeJWTToken = async (token: string) => {
    const decrypt = await jwt.verify(token, JWT_SECRET)

    return decrypt
}

export const getUserFromLoginToken = async (token: string) => {
    const decrypt = await jwt.verify(token, JWT_SECRET)

    if(!decrypt.userId) {
        return undefined;
    }

    const user = await getUser({
        id: decrypt.userId,
    })

    if (user && !user.activated) {
        return undefined
    }

    return user
}
