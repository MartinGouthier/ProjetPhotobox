import { Photo, ReponsePhoto } from "./types";
import { BASE_URL, API_URL } from "./config";

export function loadPicture(idPicture: number): Promise<ReponsePhoto> {
    return loadResource(`photos/${idPicture}`);
}
export function loadResource(uri: string): Promise<any> {
    const urlComplete = `${API_URL}${uri}`;
    
    return fetch(urlComplete, { credentials: 'include' })
        .then((reponse: Response) => {
            if (!reponse.ok) {
                return Promise.reject(new Error(`Erreur HTTP : ${reponse.statusText}`));
            }
            return reponse.json();
        }).catch((erreur: unknown) => {

            if (erreur instanceof Error) {
                console.error("Problème rencontré :", erreur.message);
            }

            // On relance l'erreur pour prévenir la fonction appelante
            return Promise.reject(erreur);
        });
}