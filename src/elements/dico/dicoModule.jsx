import { useEffect, useState } from "react"
import { WordsList } from "./words_list"
import { useLoadingContext } from "../../contexts/dico/loadingContext";
import { base_getMot_by } from "../../services/api";
import { useSearchContext } from "../../contexts/dico/searchContext";
import "../../style/dico/dicoMudule.css"
import logoImg from "../../assets/dico/dico-repeat.png"

export function DicoModule({description}) {

    const [letterchoice, setLetterchoice] = useState("non");
    const [isLoading, setLoading] = useLoadingContext()
    const [_, isSearching, ...rest] = useSearchContext() 
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const [words, setWords] = useState([]);

    async function load() {
        setLoading(true);
        const m1 = await base_getMot_by(letterchoice)
        setWords(m1);
        setLoading(false)
    }

    const letterchoiceHandler = (arg) => {
        const h = () => {
            setLetterchoice(arg);
            //console.log(arg);
        }
        return h
    }

    //la liste des mots par lettre quand on change la lettre actuelle
    useEffect(()=>{
        if (letterchoice === "non") return;
        load();
    }, [letterchoice])

    const res = (! isLoading && ! isSearching) ?
        <div className="dicoModule">
            
            {(letterchoice === "non") ?
            <>
                <img className="module-logo" src={logoImg} />
                <p>
                    {description}
                </p></>
            : 
            <></>
            }
            {
                (letterchoice === "non") ? 
                    <div className="dicoLetters-1"> {
                        alphabet.split("").map((e,i) => {
                            return <div
                                className="dicoButton"
                                key={i}
                                onClick={letterchoiceHandler(e)}>
                                    {e.toUpperCase()}
                                </div>
                        })}
                    </div>
                        :
                    <div className="dicoLetters-2">
                        <div 
                            className="dicoComeback"
                            onClick={() => setLetterchoice("non")}>
                            {"<"}
                        </div>
                        <WordsList mots={words} letter={letterchoice}/>
                    </div>

                }
        </div>
        :
        <></>

    return res;
}