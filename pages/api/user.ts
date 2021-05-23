import { NextApiRequest, NextApiResponse } from "next"

interface Response {
    user: string;
}

export default (req: NextApiRequest, res: NextApiResponse<Response>) => {
    res.status(200).json({ user: "Florin" })
}