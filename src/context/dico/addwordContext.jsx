import { useState, useEffect, useContext, createContext } from "react";

let AddwordContext = createContext();

export const useaddwordContext = () => useContext(AddwordContext);

export const AddwordProvider = ({children}) => {

    const [addword, setaddword] = useState(false);

    useEffect(()=>{
        let s = localStorage.getItem("addwordbool");
        if (s) {
            setaddword(JSON.parse(s));
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem("addwordbool", JSON.stringify(addword))
    }, [addword]);

    //definition des vraiables globales

    const onClickaddword = ()=>{
        setaddword(! addword);
    }
    //tableau de varibales globales
    const value = [
        addword,
        onClickaddword,
        setaddword
    ]

    return (
        <AddwordContext.Provider value={value}>
            {children}
        </AddwordContext.Provider>
    )

}