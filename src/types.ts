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