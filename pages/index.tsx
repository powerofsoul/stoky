import Head from "next/head";
import { get } from "../src/Api";
import Page from "../src/components/Page";
import { useAppContext } from "../src/context/AppContext";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
    return (
        <Page>
            Content
        </Page>
    );
}
