import { NextApiRequest, NextApiResponse } from 'next'
import withErrorHandling from '../../../middleware/withErrorHandeling'
import withUser from '../../../middleware/withUser'
import { updateUser } from '../../../services/UserService'
import UserValidator from '../../../validators/UserValidator'

function getUser(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.user) {
        res.status(200).json(req.user)
    } else {
        res.status(401).json({
            message: 'Please authenticate.',
        })
    }
}

async function saveUser(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const user = await UserValidator.validate(req.body, {
            stripUnknown: true,
        })
        const savedUser = await updateUser({
            ...req.user,
            ...user,
            id: req.user?.id,
        })

        res.status(200).json(savedUser)
    } catch (error) {
        res.status(400).json(error)
    }
}

export default withErrorHandling(
    withUser(async (req: NextApiRequest, res: NextApiResponse<any>) => {
        switch (req.method) {
            case 'POST':
                await saveUser(req, res)
                break
            default:
                await getUser(req, res)
                break
        }
    })
)
