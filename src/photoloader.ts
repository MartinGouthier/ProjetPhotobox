import "./types";
import {Photo, ReponsePhoto} from "./types";
import {API_URL} from "./config";


export const loadPicture = async function (idPicture: number): Promise<Photo | null> {

    const requete = await fetch(API_URL+`photos/${idPicture}`);
    if (requete.ok) {
        return requete.json()
            .then((reponse: ReponsePhoto) => {
                return reponse.photo;
            });
    } else
        return null;
}



