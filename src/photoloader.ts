import { Photo, ReponsePhoto } from "./types";
import { API_URL } from "./config";

export function loadPicture(idPicture: number): Promise<Photo> {
    
    return fetch(`${API_URL}photos/${idPicture}`, { credentials: 'include' })
        .then((reponse: Response): Promise<Photo> => {
            
            // Le serveur a répondu mais il signale une erreur HTTP, on force donc l'echec de la promesse
            if (!reponse.ok) {
                return Promise.reject(new Error(`Erreur HTTP : ${reponse.statusText}`));
            }
            
            return reponse.json().then((data: ReponsePhoto) => data.photo);
        })
        .catch((erreur: unknown) => {
            
            if (erreur instanceof Error) {
                console.error("Problème rencontré :", erreur.message);
            }
            
            // On relance l'erreur pour prévenir la fonction appelante
            return Promise.reject(erreur);
        });
}