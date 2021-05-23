import { createContext, useContext, useEffect, useState } from "react";
import { get } from "../Api";

interface AppContext {
  loading: boolean;
  user?: string;
}

const defaultContextValues: AppContext = {
  loading: true
}

const AppContext = createContext(defaultContextValues);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export function AppWrapper({ children }: Props) {
    const [contextValues, setContextValues] = useState(defaultContextValues);

    useEffect(() => {
      get<{
        user: string
      }>("user").then((r) => {
          setContextValues({
            ...contextValues,
            loading: false,
            user: r.user
          });
      });
    }, [])

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
