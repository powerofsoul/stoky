import { getSession } from '@auth0/nextjs-auth0'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { User } from '.prisma/client'
import { ensureAuth0Exists } from '../services/UserService'

declare module 'next' {
    /* eslint-disable */
    export interface NextApiRequest {
        user: User | undefined | null
    }
}

export const getUserFromRequest = async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    const auth0User = getSession(req, res)?.user

    if (auth0User) {
        const user = await ensureAuth0Exists(auth0User)
        return user
    }

    return undefined
}

const withUser = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getUserFromRequest(req, res)
    if (!user) {
        res.send(undefined);
    } else {
        req.user = user
        return handler(req, res)
    }
}

export default withUser
