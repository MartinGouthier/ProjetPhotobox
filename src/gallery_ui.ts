import {Photo} from "./types";
import {displayPicture} from "./ui";


export const display_galerie = function (galerie : Photo[])  {
    // Retrait des infos sur la photo actuelle
    document.querySelector("#la_photo")!.innerHTML = "";
    document.querySelector("#la_categorie")!.innerHTML = "";
    document.querySelector("#les_commentaires")!.innerHTML = "";

    let galeriehtml = document.querySelector("#galerie");
    // Ajout des photos sans infos sup stockées dans la galerie
    galerie.forEach(p => {
        galeriehtml!.innerHTML += displayPicture(p)
    });
}