import { CallbackOptions } from "@auth0/nextjs-auth0/dist/auth0-session";
import { NextApiRequest, NextApiResponse } from "next";
import withErrorHandling from "../../../middleware/withErrorHandeling";
import withUser from "../../../middleware/withUser";

export default withErrorHandling(withUser(async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    options?: CallbackOptions | undefined
) => {
    res.status(200).json(req.user);
}));