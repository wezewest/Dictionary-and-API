import { useState } from "react";
import "../../style/dico/dicowordlist.css"
import { Word } from "./word";

export function Words_list_letter({mots, letter}) {

    const [currentWord, setCurrentWord] = useState(undefined);
    
    const handler = (arg) => {
        const h = () => {
            setCurrentWord(arg);
        };
        return h;
    }

    
    return <>
        { letter ? <div className="dicoTitleLetter"
            >{letter}</div> : <></> }
        <div className="dicoParentWl">
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
        </div>
    </>
}