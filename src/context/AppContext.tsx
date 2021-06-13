import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@prisma/client'
import { PortfolioTicker } from '.prisma/client'
import { get } from '../Api'

interface AppContext {
    user?: User
    userIsLoading: boolean
    portfolioTickers: PortfolioTicker[]
    setPortfolioTickers: (value: PortfolioTicker[]) => void
    isLoading: boolean
}

const defaultContextValues: AppContext = {
    isLoading: true,
    userIsLoading: true,
    portfolioTickers: [],
    setPortfolioTickers: () => {},
}

const Context = createContext(defaultContextValues)

interface Props {
    children: JSX.Element[] | JSX.Element
    user?: User
}

export function AppWrapper({ children, user }: Props) {
    const [isLoading, setIsLoading] = useState(true)
    const [portfolioTickers, setPortfolioTickers] = useState<PortfolioTicker[]>([])

    const getTickers = async () => {
        const response = await get<PortfolioTicker[]>('portfolio')
        setPortfolioTickers(response)
        setIsLoading(false)
    }

    useEffect(() => {
        getTickers()
    }, [])

    return (
        <Context.Provider
            value={
                {
                    isLoading,
                    setPortfolioTickers,
                    portfolioTickers,
                    user,
                } as AppContext
            }
        >
            {children}
        </Context.Provider>
    )
}

export function useAppContext() {
    return useContext(Context)
}
