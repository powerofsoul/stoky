import { NextPageContext } from 'next'
import Page from '../src/components/Page'
import ensureUseIsLogged from '../src/pageMiddleware/ensureUseIsLogged'

export async function getServerSideProps(context: NextPageContext) {
    ensureUseIsLogged(context)

    return {
        props: {},
    }
}

const Portfolio = () => <Page>Portfolio</Page>

export default Portfolio
