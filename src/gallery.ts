import {Photo, ReponsePhoto} from "./types";
import {PhotoCollection} from "./types";
import {loadPicture, loadResource} from "./photoloader";
import {API_URL, BASE_URL} from "./config";


export const load = function (): Promise<Photo[]> {

    // Recupere la liste des photos
    return loadResource(`${API_URL}photos`).then((photos: PhotoCollection) => {

        // Tableau final
        let tab : Photo[] = [];
        // Tableau photos incomplètes
        let photosTableau =  photos.photos

        // Transformation du tableau d'objets en un tableau de promesses
        const promesses = photosTableau.map((p: {photo: Photo}) => {
            return loadPicture(p.photo.id).then((reponse: ReponsePhoto) => reponse.photo);
        });
        
        // Attente de la résolution de toutes les requêtes asynchrones
        return Promise.all(promesses);
    });

}