import { handleProfile } from "@auth0/nextjs-auth0";
import { CallbackOptions } from "@auth0/nextjs-auth0/dist/auth0-session";
import { NextApiRequest, NextApiResponse } from "next";
import withUser from "../../../middleware/withUser";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    options?: CallbackOptions | undefined
) => {
    res.status(200).json(req.user);
};

export default withUser(handler);