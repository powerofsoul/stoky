import { NextPageContext } from 'next'
import Page from '../src/components/Page'
import AddToPortfolio from '../src/components/AddToPortfolio'
import ensureUseIsLogged, { redirectToLogin } from '../src/pageMiddleware/ensureUseIsLogged'
import PortfolioList from '../src/components/PortfolioList'
import { getUserFromRequest } from '../middleware/withUser'
import { getUserPortfolioTickers } from '../services/UserService'
import { PortfolioTicker } from '.prisma/client'
import { getSymbolQuotePrice } from '../services/PortfolioService'
import { YahooStockPrice } from '../models/YahooStock'

interface Props {
    portfolioTickers: PortfolioTicker[]
    tickerQuotes: YahooStockPrice[]
}

export async function getServerSideProps(context: NextPageContext) {
    const { req, res } = context

    const user = await getUserFromRequest(req, res)
    if (user) {
        const portfolioTickers = await getUserPortfolioTickers(user)
        const tickerPricesPromises = portfolioTickers
            .map((pt: PortfolioTicker) => pt.symbol)
            .map((s: string) => getSymbolQuotePrice(s))
        const tickerQuotes = await Promise.all(tickerPricesPromises)

        return {
            props: {
                portfolioTickers,
                tickerQuotes,
            },
        }
    }
    redirectToLogin(res)
}

const Component = ({ portfolioTickers, tickerQuotes }: Props) => (
    <Page>
        <AddToPortfolio />
        <PortfolioList portfolioTickers={portfolioTickers} tickerQuotes={tickerQuotes} />
    </Page>
)

export default Component
