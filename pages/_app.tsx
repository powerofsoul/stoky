// import "../styles/style.scss";
import type { AppProps } from "next/app";
import "tabler-react/dist/Tabler.css";
import { AppWrapper } from "../src/context/AppContext";
import { UserProvider } from "@auth0/nextjs-auth0";
import { NextPageContext } from "next";
import { getUserFromRequest } from "../middleware/withUser";
import { User } from "../models/User";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppWrapper>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </AppWrapper>
    );
}

export default MyApp;
