import { useEffect, useState, useRef } from "react";
import { base_addWord } from "../../services/api";
import { useaddwordContext } from "../../contexts/dico/addwordContext";


export function Menu_addword() {

    let [addword, onClickaddword] = useaddwordContext();

    let ref = useRef(null);
    let firstClick = useRef(true)
    useEffect(()=>{
        /**
         * 
         * @param {Event} e 
         * @returns 
         */
        const click_en_dehors = (e) => {
            if (! ref.current) return;
            if (ref.current.contains(e.target)) return;
            if (! addword) return;
            onClickaddword(); //console.log("Click en dehors !!");
        }
        //pour enlever le 1er click qui fz remonter tout le menu
        const timer = setTimeout(()=>{ 
            document.addEventListener("click", click_en_dehors);
        }, 0);
        
        return ()=>{
            clearTimeout(timer);
            document.removeEventListener("click", click_en_dehors);
        }

    }, [addword])

    let c = addword ? " selected" : "";
    c = "add-word "+c;
    
    //console.log(c, addword);

    const [name, setName] = useState("");
    const [sens, setSens] = useState("");
    const [ex, setEx] = useState("");
    
    let isValid = (elem) =>{
        //TODO : faire la validité d'un mot pour qu'il rejoigne la base
        // de données pour simplifier le travail de l'admin
    }

    let handlerClick = (e)=>{
            e.preventDefault();
            //on va poster le mot dans la base donnee
            
            async function add() {
                let mot = {name : name, sens : sens, exemple : ex};
                base_addWord(mot);
            }

            if (name && sens) add();
            else 
                {onClickaddword(); return;}

            //on remet les 3 valeurs vides si ca c'est bien passé
            setEx(""), setName(""), setSens("");
            
            onClickaddword();
        }
    
    let handlerChangeName = (e) => {
        //console.log(e.target.value);
        setName(e.target.value)
    }
    let handlerChangeEx = (e) => {
        setEx(e.target.value)
    }
    let handlerChangeSens = (e)=>{
        setSens(e.target.value)
    }

    return <form className={c} ref={ref}>
        
        <p>Veuillez attendre que l'admin valide le mot 
            pour le voir apparaitre dans la liste
        </p>
        <input 
            onChange={handlerChangeName}
            value={name}
            type="text"
            placeholder="* Un mot...."></input>
        <input 
            placeholder="* Son sens...."
            value={sens}
            type="text"
            onChange={handlerChangeSens}></input>
        
        <input 
            placeholder="Un exemple d'utilisation..."
            value={ex}
            type="text"
            onChange={handlerChangeEx}></input>

        <button onClick={handlerClick}>
            Pret à enrichir le dico !
        </button>
    </form>
}