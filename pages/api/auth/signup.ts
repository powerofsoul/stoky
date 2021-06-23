import { NextApiRequest, NextApiResponse } from 'next'
import withErrorHandling from '../../../middleware/withErrorHandeling'
import EmailService from '../../../services/EmailService'
import { generateJWTForObject } from '../../../services/JWTService'
import SqlDAO from '../../../services/SqlDAO'
import { createUser } from '../../../services/UserService'
import { WelcomeTemplate } from '../../../src/email/Templates'
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
        const template = WelcomeTemplate({
            name: 'User',
            activationString: generateJWTForObject('SIGNUP', {
                email: body.email,
            }),
        })

        await EmailService.notify(body.email, 'Welcome!', template)

        res.status(200).json({
            success: true,
            message: 'An activation link has been send to your email.',
        })
    } catch (err) {
        res.status(200).json({
            success: false,
            message: err,
        })
    }
})
