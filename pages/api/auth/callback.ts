import { handleCallback, getSession } from '@auth0/nextjs-auth0'
import { CallbackOptions } from '@auth0/nextjs-auth0/dist/auth0-session'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) =>
    handleCallback(req, res, options)
