import { NextPageContext } from 'next'
import Page from '../src/components/Page'
import AddToPortfolio from '../src/components/AddToPortfolio'
import ensureUseIsLogged from '../src/pageMiddleware/ensureUseIsLogged'
import PortfolioList from '../src/components/PortfolioList'

export async function getServerSideProps(context: NextPageContext) {
    ensureUseIsLogged(context)

    return {
        props: {},
    }
}

const Component = () => (
    <Page>
        <AddToPortfolio />
        <PortfolioList />
    </Page>
)

export default Component
