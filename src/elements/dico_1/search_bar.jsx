import { useSearchContext } from "../../contexts/dico/searchContext";

export function Search_Bar() {

    let [search, isSearching, onSearch] = useSearchContext();
    let handler = (e) => {
        //console.log(e.target.value);
        onSearch(e.target.value); //TODO : bug de décallage j'affiche l'ancienne valeur
    }

    return <input onChange={handler} placeholder="Rechercher un mot...">
    </input>
}