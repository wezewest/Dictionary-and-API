import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoadingContext = () => useContext(LoadingContext);

export function LoadingContextProvider({children}) {

    const [isLoading, setIsLoading] = useState(false);

    const value = [
        isLoading,
        setIsLoading
    ]

    return <LoadingContext.Provider value={value}>
        {children}
    </LoadingContext.Provider>
}