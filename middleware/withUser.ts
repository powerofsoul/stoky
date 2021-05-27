import { handleCallback, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { User } from "../models/User";
import DynamoDAO from "../services/DynamoDAO";
import { ensureAuth0Exists } from "../services/UserService";

declare module "next" {
    export interface NextApiRequest {
        user: import("../models/User").User
    }
}

const withUser = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {        
        const auth0User = getSession(req, res)?.user;

        if(auth0User) {
            const user = await ensureAuth0Exists(auth0User);              
            req.user = user;
        }

        return handler(req, res);
    };
};

export default withUser;
