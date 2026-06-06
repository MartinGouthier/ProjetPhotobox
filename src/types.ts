export interface Photo {
    id: number;
    titre: string;
    file: string;
    descr: string;
    format: string;
    type: string;
    size: number;
    width: number;
    height: number;
    url: UrlPhoto;
}

export interface ReponsePhoto {
    type: string;
    photo: Photo;
    links: Links;
}

export interface UrlPhoto {
    href: string;
}

export interface Links {
    categorie: UrlPhoto;
    comments: UrlPhoto;
}

export interface ReponseCategorie {
    type: string;
    categorie: {
        id: number;
        nom: string;
    };
}

export interface Commentaire {
    id: number;
    titre: string;
    pseudo: string;
    content: string;
    date: string;
}

export interface ReponseCommentaires {
    type: string;
    comments: Commentaire[];
}

export interface PhotoCollection {
    type: string
    size: number
    photos: {
        photo: Photo
    }[];
}