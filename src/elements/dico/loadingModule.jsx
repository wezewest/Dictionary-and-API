import { useLoadingContext } from "../../contexts/dico/loadingContext";
import "../../style/dico/dicoloading.css"
import loadingPNG from "../../assets/dico/charge.png"

export function LoadingModule() {

    const [isLoading, ...rest] = useLoadingContext();

    const res = (! isLoading) ?
        <></> :
        <img 
            className="loading"
            src={loadingPNG} />

    return res;
}