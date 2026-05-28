import { useState, useEffect, useContext, createContext } from "react";
import { base_admin_delete, base_admin_delete_selection, base_admin_validate } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const use_admin_context = () => useContext(AdminContext);

export const AdminContextProvider = ({children}) => {

    //liste des mots (seulement colonne name)
    const [listSelected, setList] = useState([]);

    useEffect(()=>{
        let e = localStorage.getItem("adminList");
        if (e) setList(JSON.parse(e));
    }, [])

    useEffect(()=>{
        localStorage.setItem("adminList", JSON.stringify(listSelected));
    }, [listSelected])

    let admin_add = (elem)=>{
        setList([...listSelected, elem]);
    }

    console.log(listSelected)

    let admin_remove_selected = (elem)=>{
        setList(listSelected.filter(v => v.name != elem.name))
    }

    let admin_free_selection = ()=>{
        console.log("libere tout")
        setList([]);
    }
    
    let push = async (w) => {
        await base_admin_validate(w)
    }

    let delete_word = async (w) => {
        await base_admin_delete_selection(w)
    }

    let admin_push_selection = async ()=>{
        console.log("git push")
        listSelected.map(w => {
            push(w)
        })
        admin_delete_selection()

    }

    let admin_delete_selection = async ()=>{
        listSelected.map(w=>{
            delete_word(w)
        })
        admin_free_selection();
    }

    let admin_delete_all = async ()=>{
        console.log("on supprime tout")
        await base_admin_delete();
        admin_free_selection()
    }

    const value = [
        listSelected,
        admin_add,
        admin_remove_selected,
        admin_free_selection,
        admin_push_selection,
        admin_delete_all
    ]

    return <AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>

}