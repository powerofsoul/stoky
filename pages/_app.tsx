// import "../styles/style.scss";
import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import "../styles/global.scss";
import { AppWrapper } from "../src/context/AppContext";

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
