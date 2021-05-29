import Page from "../src/components/Page"
import React from "react"
import ensureUseIsLogged from "../src/pageMiddleware/ensureUseIsLogged";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
    ensureUseIsLogged(context);

    return {
        props: {}
    };
}

const Portfolio = () => {
    return <Page>
        Portfolio
    </Page>
}

export default Portfolio;