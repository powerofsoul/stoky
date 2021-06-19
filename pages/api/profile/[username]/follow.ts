import { handleCallback, getSession } from '@auth0/nextjs-auth0'
import { CallbackOptions } from '@auth0/nextjs-auth0/dist/auth0-session'
import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import withErrorHandling from '../../../../middleware/withErrorHandeling'
import withUser from '../../../../middleware/withUser'
import SqlDAO from '../../../../services/SqlDAO'

export default withErrorHandling(
    withUser(async (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => {
        const { userToFollowId } = req.body
        const currentUser = req.user

        if (!currentUser) {
            res.status(403).send({})
            return
        }

        await SqlDAO.followers.create({
            data: {
                userId: currentUser.id,
                followerId: userToFollowId,
            },
        })

        res.status(200).json({
            success: true,
        })
    })
)
