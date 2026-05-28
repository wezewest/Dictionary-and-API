import { useaddwordContext } from "../../contexts/dico/addwordContext";
import { useSearchContext } from "../../contexts/dico/searchContext";
import { Menu_addword } from "./menu_add_word";
import { Search_Bar } from "./search_bar";
import logo from "../../assets/dico/dico-repeat.png"
import "../../style/dico_1/menuBar.css"

export function Menu() {


    const [addWord, onClickaddword] = useaddwordContext();
    const [_, __, onSearch] = useSearchContext()

    return <header className="dicoMenuBar">

        <img 
            src={logo}> 
            {/**le logo */}

        </img>

        <div 
            onClick={onClickaddword}>
            Ajouter un mot
        </div>

        <Menu_addword />

        <Search_Bar />
    </header>
}