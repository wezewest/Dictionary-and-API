import { useState } from "react";
import "../../style/dico_1/dicowordlist.css"
import { Word } from "./word";

export function Words_list_letter({mots}) {

    const [currentWord, setCurrentWord] = useState(undefined);
    
    const handler = (arg) => {
        const h = () => {
            setCurrentWord(arg);
        };
        return h;
    }

    
    return <>
    <ul className="dicowordlist">
        {
            (mots === undefined || mots == null) ? <>und</> :
            mots.map((e,i)=>{
                return <li
                className="dicoWletter"
                onClick={handler(e)}
                key={i}
                >{e.name}</li>
            })
        }
    </ul>
    <Word mot={currentWord} />
    </>
}