import "../../style/dico/dicowordlist.css"
import "../../style/dico/word.css"

export function Word({mot}) {
    if (! mot) return <></>;

    
    return <div className="dicoMot">
        <div className="name">
                {mot.name}
        </div>
            <div className="sens">
                {mot.sens}
            </div>
            {
                (mot.exemple) ? 
                    <div className="exemple">
                        {mot.exemple}
                    </div>
                :
                    <></>
            }
        </div>
}