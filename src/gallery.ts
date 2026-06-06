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

        // Recherche de chaque photo avec son identifiant
         photosTableau.forEach((photo : {photo : Photo}) => {
             loadPicture(photo.photo.id).then((reponse : ReponsePhoto)=> {
                 // Ajout dans la liste complète
                 tab.push(reponse.photo);
                 // Est ce que le tableau sera entièrement rempli avant d'être envoyé?
             })
             //TODO: y a un problème a fix
         })
        return tab;

    })

}