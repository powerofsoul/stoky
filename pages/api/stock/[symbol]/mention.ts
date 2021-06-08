import { CallbackOptions } from '@auth0/nextjs-auth0/dist/auth0-session'
import { NextApiRequest, NextApiResponse } from 'next'
import withUser from '../../../../middleware/withUser'
import { mentionStock } from '../../../../services/PortfolioService'
import MentionTickerValidator from '../../../../validators/MentionTickerValidator'

export default withUser(
    async (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => {
        const symbol = req.query.symbol as string
        const body = await MentionTickerValidator.validate(req.body)

        if (body && req.user) {
            await mentionStock(req.user, symbol, body.message, body.giphyId)
            res.status(200).json({
                success: true,
            })
        } else {
            res.status(400)
        }
    }
)
