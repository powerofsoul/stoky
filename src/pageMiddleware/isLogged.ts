import { getSession } from "@auth0/nextjs-auth0";
import { NextPageContext } from "next";
import { getUserFromRequest } from "../../middleware/withUser";

const isLogged = async (component: any) => {
    component.getInitialProps = async (ctx: NextPageContext) => {
        const {req, res} = ctx;
        const redirectToLogin = () => {
            res?.writeHead(301, {
                "Location": "/"
            });
            res?.end();
        };

        const user = await getUserFromRequest(req, res);
        if(!user) {
            redirectToLogin();
            return;
        }

        // return component.getInitialProps(ctx);
    };
};

export default isLogged;