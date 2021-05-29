import { getSession } from "@auth0/nextjs-auth0";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ensureAuth0Exists } from "../services/UserService";

declare module "next" {
    export interface NextApiRequest {
        user: import("../models/User").User | undefined
    }
}

export const getUserFromRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const auth0User = getSession(req, res)?.user;

    if (auth0User) {
        const user = await ensureAuth0Exists(auth0User);
        return user;
    }

    return undefined;
}

const withUser = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {        
        const user = await getUserFromRequest(req, res);

        req.user = user;
        return handler(req, res);
    };    
};    

export default withUser;
