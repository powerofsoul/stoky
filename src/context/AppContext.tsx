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
}

export function AppWrapper({ children }: Props) {
    const [user, setUser] = useState<User>()
    const [portfolioTickers, setPortfolioTickers] = useState<PortfolioTicker[]>([])

    const getTickers = async () => {
        const response = await get<PortfolioTicker[]>('portfolio')
        setPortfolioTickers(response)
    }

    const getUser = async () => {
        const response = await get<User>('auth/me')
        setUser(response)
        await getTickers()
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Context.Provider
            value={
                {
                    isLoading: !user,
                    userIsLoading: !user,
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
