import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { User } from '.prisma/client'
import { JWT_SECRET } from '../src/Consts'
import { getUserFromLoginToken, JWT_LOGIN_COOKIE_NAME } from '../services/JWTService'

const jwt = require('jsonwebtoken')

declare module 'next' {
    /* eslint-disable */
    export interface NextApiRequest {
        user: User | undefined | null
    }
}

export const getUserFromRequest = async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    const token = req.cookies[JWT_LOGIN_COOKIE_NAME]
    if (token) {
        return getUserFromLoginToken(token);
    }

    return undefined;
}

const withUser = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getUserFromRequest(req, res)
    if (!user) {
        res.send(undefined)
    } else {
        req.user = user
        return handler(req, res)
    }
}

export default withUser
