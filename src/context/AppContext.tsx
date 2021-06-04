import { createContext, useContext, useState } from 'react'

interface AppContext {
    version: string
}

const defaultContextValues: AppContext = {
    version: '0.0.1',
}

const Context = createContext(defaultContextValues)

interface Props {
    children: JSX.Element[] | JSX.Element
}

export function AppWrapper({ children }: Props) {
    const [contextValues, setContextValues] = useState(defaultContextValues)

    return <Context.Provider value={contextValues}>{children}</Context.Provider>
}

export function useAppContext() {
    return useContext(Context)
}
