import { NextApiRequest, NextApiResponse } from 'next'
import withErrorHandling from '../../../middleware/withErrorHandeling'
import { logoutUser } from '../../../services/UserService'

export default withErrorHandling(async (req: NextApiRequest, res: NextApiResponse<any>) => {
    await logoutUser(res)
    res.status(200).redirect('/')
    res.end()
})
