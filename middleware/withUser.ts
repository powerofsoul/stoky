import { handleCallback, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { User } from "../models/User";
import { ensureUserExists } from "../services/UserService";

declare module "next" {
    export interface NextApiRequest {
        user: import("../models/User").User
    }
}

const withUser = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const auth0User = getSession(req, res);
            const user = await ensureUserExists(Object.assign(new User(), auth0User?.user));    
                    
            req.user = user;

            return handler(req, res);
        } catch (error) {
            console.error("Unable to determine user");
        }
    };
};

export default withUser;
