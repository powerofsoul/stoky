import { createContext, useContext, useEffect, useState } from "react";
import { get } from "../Api";

interface AppContext {
  version: string;
}

const defaultContextValues: AppContext = {
  version: "0.0.1"
}

const AppContext = createContext(defaultContextValues);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export function AppWrapper({ children }: Props) {
    const [contextValues, setContextValues] = useState(defaultContextValues);

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
