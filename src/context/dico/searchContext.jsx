import { useState, useContext, createContext, useEffect } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({children}) => {

    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(()=>{
        let e = localStorage.getItem("search");
        if (e) setSearch(JSON.parse(e));
        let e1 = localStorage.getItem("isSearching");
        if (e1) setIsSearching(JSON.parse(e1));
    }, [])

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(search));
    }, [search])

    useEffect(()=>{
        localStorage.setItem("isSearching", JSON.stringify(isSearching));
    }, [isSearching])

    const onSearch = (s) => {
        setSearch(s);
        if (s) setIsSearching(true);
        else setIsSearching(false);
    }

    const value = [
        search,
        isSearching,
        onSearch
    ]

    return <SearchContext.Provider value={value}>
        {children}
    </SearchContext.Provider>
}