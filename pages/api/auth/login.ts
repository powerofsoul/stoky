import { NextApiRequest, NextApiResponse } from 'next'
import withErrorHandling from '../../../middleware/withErrorHandeling'
import { createUser, loginUser } from '../../../services/UserService'
import LoginValidator from '../../../validators/LoginValidator'

export default withErrorHandling(async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (!(await LoginValidator.isValid(req.body))) {
        res.status(400).json({
            success: false,
            message: 'Invalid body',
        })
        return
    }

    const body = await LoginValidator.validate(req.body)

    try {
        await loginUser(body.email, body.password, res)
        res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
        })
    } catch (err) {
        res.status(200).json({
            success: false,
            message: err,
        })
    }
})
