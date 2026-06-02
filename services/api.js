import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function accent(lettre) {
    if (typeof lettre !== "string") return [];

    switch (lettre) {
        case "e" : return ["é", "è", "ê"];
        case "a" : return ["à"];
        default : return [];
    }
}

export async function base_getMot_by(lettre) {
    if (typeof lettre !== "string") return;
    const min = lettre.toLowerCase();
    let res = []
    let callvalue;
    //console.log(min , maj);

    //en miniscule et en majuscule avec ilike
    callvalue = await supabase
    .from('mot').select('*')
    .ilike("name", min+"%");

    if (callvalue.error) console.log(callvalue.error);
    if (callvalue.data) res = [...res, ...callvalue.data];
    console.log(callvalue.data);

    //tous ceux avec des accents
    const acce = accent(min);
    console.log("accent", acce);
    if (acce.length !== 0) 
        for (let i=0; i<acce.length; i++) {

            //min et maj avec ilike
            callvalue = await supabase
            .from('mot').select('*')
            .ilike("name", acce[i]+"%");

            if (callvalue.error) console.log(callvalue.error);
            if (callvalue.data) res = [...res, ...callvalue.data];
        }

    return res;
}

//ajoute un mot dans la table 'usermot'
export async function base_addWord(word) {
    const {_, error} = await supabase
    .from('usermot')
    .insert(
        {
            name : word.name,
            sens : word.sens,
            exemple : word.exemple

        }
    );
    if (error) console.log(error);
}

//recupère tous les mots de la table 'mot'
export async function base_getMot_all() {
    const {data , error } = await supabase
    .from('mot').select('*');
    //console.log(data);
    if (error) {
        console.log(error); 
        return [];
    }
    return data
}

export async function base_getMot_admin_all() {
    const {data , error } = await supabase
    .from('usermot').select('*');
    if (error) {
        console.log(error);
        return []
    }
    console.log(data);
    return data
}

export async function base_admin_validate(word) {
    const {_ , error } = await supabase
    .from('mot')
    .insert(
        {
            name : word.name,
            sens : word.sens,
            exemple : word.exemple

        }
    );
    if (error) 
        {console.log(error);
        alert("Impossible d'ajouter le mot");
        return;
        }
}

export async function base_admin_delete_selection(word) {
    const {_ , error } = await supabase
    .from('usermot')
    .delete()
    .eq('name', word.name)
    if (error) console.log(error);
}

export async function base_admin_delete() {
    const {_ , error } = await supabase
    .from('usermot')
    .delete()
    .neq('name', 0)
    if (error) console.log(error);
}