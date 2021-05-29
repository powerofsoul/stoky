import { getSession } from "@auth0/nextjs-auth0";
import { NextPageContext } from "next";
import { getUserFromRequest } from "../../middleware/withUser";

const ensureUseIsLogged  = async (ctx: NextPageContext) => {
        const {req, res} = ctx;
        const redirectToLogin = () => {
            res?.writeHead(302, {
                "Location": "/"
            });
            res?.end();
        };

        const user = await getUserFromRequest(req, res);
        if(!user) {
            redirectToLogin();
        }
};

export default ensureUseIsLogged;