import { NextPageContext } from 'next'
import Page from '../src/components/Page'
import AddToPortfolio from '../src/components/AddToPortfolio'
import ensureUseIsLogged, { redirectToLogin } from '../src/pageMiddleware/ensureUseIsLogged'
import PortfolioList from '../src/components/PortfolioList'
import { getUserFromRequest } from '../middleware/withUser'
import { getUserPortfolioTickers } from '../services/UserService'
import { PortfolioTicker } from '.prisma/client'

interface Props {
    portfolioTickers: PortfolioTicker[]
}

export async function getServerSideProps(context: NextPageContext) {
    const { req, res } = context

    const user = await getUserFromRequest(req, res)
    if (user) {
        const portfolioTickers = await getUserPortfolioTickers(user)

        return {
            props: {
                portfolioTickers,
            },
        }
    }
    redirectToLogin(res)
}

const Component = ({ portfolioTickers }: Props) => (
    <Page>
        <AddToPortfolio />
        <PortfolioList portfolioTickers={portfolioTickers} />
    </Page>
)

export default Component
