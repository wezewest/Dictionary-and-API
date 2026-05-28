import { useSearchContext } from "../../contexts/dico/searchContext";
import { Words_list_letter } from "./words_list_letter";

export function WordsList({mots, motsAll}) {

    const [search, __, _] = useSearchContext();

    //------la fonction de recherche
    /**
     * 
     * @param {string} a 
     * @returns un score pour comparerer la chaine de
     * recherche axu mots ud dictionnaire
     */
    const userSearchAux = (a) => {
        let score = 0;
        function aux(a) {
            let s = 0;
            if (a===search) s+=10000;
            if (a.includes(search)) s += 5000;
            search.split("").forEach(e => {
            if (a.includes(e)) s+=10;
            });
            return s;
        }
        score += aux(a.toLowerCase());
        score += aux(a.toUpperCase())
        return score;
    }
    const userSearch = () => {
        let c;
        let m = [];
        if (motsAll !== undefined) 
            m = [...motsAll];
        c = m.sort((a,b)=>{
            let aprime = a.name;
            let bprime = b.name;
            return userSearchAux(bprime) - userSearchAux(aprime);
        });
        //console.log("tri de recherche" , c);
        return c;
    }

    return <>
        {
            (motsAll) ?
            <Words_list_letter mots={userSearch()} />
            :
            <Words_list_letter mots={mots} />
        }
    </>
}