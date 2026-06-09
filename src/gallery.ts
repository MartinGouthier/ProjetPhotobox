import {Photo, ReponsePhoto} from "./types";
import {PhotoCollection} from "./types";
import {loadPicture, loadResource} from "./photoloader";
import {API_URL} from "./config";

let nextUrl: string | undefined;
let prevUrl: string | undefined;
let firstUrl: string | undefined;
let lastUrl: string | undefined;
let galerieActuelle: Photo[] = [];

const loadPage = function (url: string): Promise<Photo[]> {
    return loadResource(url).then((photos: PhotoCollection) => {
        nextUrl = photos.links.next?.href;
        prevUrl = photos.links.prev?.href;
        firstUrl = photos.links.first?.href;
        lastUrl = photos.links.last?.href;

        const promesses = photos.photos.map((p: {photo: Photo}) => {
            return loadPicture(p.photo.id).then((reponse: ReponsePhoto) => reponse.photo);
        });
        
        return Promise.all(promesses).then((resultat) => {
            galerieActuelle = resultat;
            return resultat;
        });
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

export const getGalerieActuelle = (): Photo[] => galerieActuelle;