import { createContext, useContext, useEffect, useState } from 'react'
import { PortfolioTicker } from '.prisma/client'
import { get } from '../Api'

interface AppContext {
    portfolioTickers: PortfolioTicker[]
    setPortfolioTickers: (value: PortfolioTicker[]) => void
    isLoading: boolean
}

const defaultContextValues: AppContext = {
    isLoading: true,
    portfolioTickers: [],
    setPortfolioTickers: () => {},
}

const Context = createContext(defaultContextValues)

interface Props {
    children: JSX.Element[] | JSX.Element
}

export function AppWrapper({ children }: Props) {
    const [contextValues, setContextValues] = useState(defaultContextValues)

    const setPortfolioTickers = (value: PortfolioTicker[]) => {
        setContextValues({
            ...contextValues,
            portfolioTickers: value,
        })
    }

    const getTickers = async () => {
        const portfolioTickers = await get<PortfolioTicker[]>('portfolio')
        setContextValues({
            ...contextValues,
            portfolioTickers,
            isLoading: false,
        })
    }

    useEffect(() => {
        getTickers()
    }, [])

    return (
        <Context.Provider
            value={{
                ...contextValues,
                setPortfolioTickers,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export function useAppContext() {
    return useContext(Context)
}
