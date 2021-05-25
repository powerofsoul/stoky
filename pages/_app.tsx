import "../styles/style.scss";
import type { AppProps } from "next/app";
import { AppWrapper } from "../src/context/AppContext";
import { UserProvider } from "@auth0/nextjs-auth0";

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
