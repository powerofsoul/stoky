import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const withErrorHandling = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        return handler(req, res)
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
        })
    }
}

export default withErrorHandling
