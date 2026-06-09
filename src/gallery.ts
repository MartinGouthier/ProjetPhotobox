import {Photo, ReponsePhoto} from "./types";
import {PhotoCollection} from "./types";
import {loadPicture, loadResource} from "./photoloader";
import {API_URL, BASE_URL} from "./config";

let nextUrl: string | undefined;
let prevUrl: string | undefined;
let firstUrl: string | undefined;
let lastUrl: string | undefined;

const loadPage = function (url: string): Promise<Photo[]> {
    // Recupere la liste des photos
    return loadResource(url).then((photos: PhotoCollection) => {
        
        // sauvegarde des liens de pagination
        nextUrl = photos.links.next?.href;
        prevUrl = photos.links.prev?.href;
        firstUrl = photos.links.first?.href;
        lastUrl = photos.links.last?.href;

        // Tableau photos incomplètes
        let photosTableau = photos.photos;

        // Transformation du tableau d'objets en un tableau de promesses
        const promesses = photosTableau.map((p: {photo: Photo}) => {
            return loadPicture(p.photo.id).then((reponse: ReponsePhoto) => reponse.photo);
        });
        
        // Attente de la résolution de toutes les requêtes asynchrones
        return Promise.all(promesses);
    });
};

export const load = function (): Promise<Photo[]> {
    return loadPage(`${API_URL}photos`);
}

export const next = function (): Promise<Photo[]> {
    if (!nextUrl) return Promise.reject(new Error("pas de page suivante"));
    return loadPage(nextUrl);
}

export const prev = function (): Promise<Photo[]> {
    if (!prevUrl) return Promise.reject(new Error("pas de page précédente"));
    return loadPage(prevUrl);
}

export const first = function (): Promise<Photo[]> {
    if (!firstUrl) return Promise.reject(new Error("déjà sur la première page"));
    return loadPage(firstUrl);
}

export const last = function (): Promise<Photo[]> {
    if (!lastUrl) return Promise.reject(new Error("déjà sur la dernière page"));
    return loadPage(lastUrl);
}