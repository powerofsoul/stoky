import Page from "../src/components/Page"
import React from "react"
import isLogged from "../src/pageMiddleware/isLogged";

const Portfolio = () => {
    return <Page>
        Portfolio
    </Page>
}

isLogged(Portfolio);

export default Portfolio;