import { BASE_URL } from "./config";
import {Photo} from "./types";


export const display_galerie = function (galerie : Photo[])  {
    document.querySelector("#la_photo")!.innerHTML = "";
    document.querySelector("#la_categorie")!.innerHTML = "";
    document.querySelector("#les_commentaires")!.innerHTML = "";

    let galeriehtml = document.querySelector("#galerie");

    // On utilise reduce pour accumuler le HTML généré dans une seule chaîne
    const htmlComplet = galerie.reduce((acc, p) => {
        return acc + `<article data-photoid="${p.id}">
            <img src="${BASE_URL}${p.url.href}" alt="${p.titre}">
        </article>`;
    }, "");
    galeriehtml!.innerHTML = htmlComplet;
}