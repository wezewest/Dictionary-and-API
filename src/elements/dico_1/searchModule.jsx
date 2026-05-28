import { useEffect, useState } from "react"
import { useLoadingContext } from "../../contexts/dico/loadingContext"
import { useSearchContext } from "../../contexts/dico/searchContext"
import { base_getMot_all } from "../../services/api"
import { WordsList } from "./words_list"

export function SearchModule() {

    const [_, isSearching, ...rest] = useSearchContext()
    const [isLoading, setLoading] = useLoadingContext()
    const [words, setWords] = useState([]);

    async function load() {
        setLoading(true);
        const m = await base_getMot_all();
        setWords(m);
        setLoading(false);
    }

    useEffect(()=>{
        console.log(isSearching)
        if (isSearching)
            load();
    }, [isSearching]);

    return <>
    { (! isLoading && isSearching) ?

        <WordsList motsAll={words} />
    :
    <></> }
    </>
}