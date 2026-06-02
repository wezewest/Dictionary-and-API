import { useSearchContext } from "../../contexts/dico/searchContext";
import "../../style/dico/search.css"

export function Search_Bar() {

    let [search, isSearching, onSearch] = useSearchContext();
    let handler = (e) => {
        //console.log(e.target.value);
        onSearch(e.target.value);
    }

    let handler_croix = () => {
        onSearch("");
    }

    return <div className="dicoSearch">
        <input 
            onChange={handler} 
            placeholder="Rechercher un mot...">
        </input>
        <div className="croix"
            onClick={handler_croix}>
            X
        </div>
    </div>
    
}