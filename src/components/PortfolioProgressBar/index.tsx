import { PortfolioTicker } from '@prisma/client'
import { randomColor } from '../../Utils'

interface Props {
    portfolioTickers: PortfolioTicker[]
    portfolioTickersColors?: string[]
}

const PortfolioProgressBar = ({ portfolioTickers, portfolioTickersColors }: Props) => {
    const totalAmount = portfolioTickers.reduce((p, c) => p + c.amount, 0)
    const percentMap = portfolioTickers.map((pt) => (pt.amount / totalAmount) * 100).sort((a, b) => b - a)

    return (
        <div className="progress progress-sm">
            {percentMap.map((p, i) => (
                <div
                    className="progress-bar bg-#2fb171"
                    style={{
                        width: `${p}%`,
                        backgroundColor: portfolioTickersColors?.[i] || randomColor(),
                    }}
                />
            ))}
        </div>
    )
}

export default PortfolioProgressBar
