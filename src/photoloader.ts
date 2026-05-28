import "./types";
import {reponsePhoto} from "./types";
import {API_URL} from "./config";


export const loadPicture = async function (idPicture: number): Promise<string> {

    const requete = await fetch(API_URL+`photos/${idPicture}`);
    if (requete.ok) {
        return requete.json()
            .then((reponse: reponsePhoto) => {
                return reponse.photo.descr;
            });
    } else
        return "Erreur";
}



