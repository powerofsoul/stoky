import { NextApiRequest, NextApiResponse } from 'next'
import withErrorHandling from '../../../middleware/withErrorHandeling'
import SqlDAO from '../../../services/SqlDAO'
import { createUser } from '../../../services/UserService'
import SignUpValidator from '../../../validators/SignUpValidator'

export default withErrorHandling(async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (!(await SignUpValidator.isValid(req.body))) {
        res.status(400).json({
            success: false,
            message: 'Invalid body',
        })
        return
    }

    const body = await SignUpValidator.validate(req.body)
    try {
        await createUser(body.email, body.password)
        res.status(200).json({
            success: true,
            message: 'User created',
        })
    } catch (err) {
        res.status(200).json({
            success: false,
            message: err,
        })
    }
})
