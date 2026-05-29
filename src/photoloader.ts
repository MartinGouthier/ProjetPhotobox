import { Photo, ReponsePhoto } from "./types";
import { BASE_URL, API_URL } from "./config";

export function loadPicture(idPicture: number): Promise<ReponsePhoto> {
    
    return fetch(`${API_URL}photos/${idPicture}`, { credentials: 'include' })
        .then((reponse: Response): Promise<ReponsePhoto> => {
            
            // Le serveur a répondu mais il signale une erreur HTTP, on force donc l'echec de la promesse
            if (!reponse.ok) {
                return Promise.reject(new Error(`Erreur HTTP : ${reponse.statusText}`));
            }
            
            return reponse.json();
        })
        .catch((erreur: unknown) => {
            
            if (erreur instanceof Error) {
                console.error("Problème rencontré :", erreur.message);
            }
            
            // On relance l'erreur pour prévenir la fonction appelante
            return Promise.reject(erreur);
        });
}
export function loadResource(uri: string): Promise<any> {
    const urlComplete = `${BASE_URL}${uri}`;
    
    return fetch(urlComplete, { credentials: 'include' })
        .then((reponse: Response) => {
            if (!reponse.ok) {
                return Promise.reject(new Error(`Erreur HTTP : ${reponse.statusText}`));
            }
            return reponse.json();
        });
}