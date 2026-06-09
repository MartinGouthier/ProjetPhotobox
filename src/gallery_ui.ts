import {Photo} from "./types";
import {displayPicture} from "./ui";


export const display_galerie = function (galerie : Photo[])  {
    document.querySelector("#la_photo")!.innerHTML = "";
    document.querySelector("#la_categorie")!.innerHTML = "";
    document.querySelector("#les_commentaires")!.innerHTML = "";

    let galeriehtml = document.querySelector("#galerie");

    // On utilise reduce pour accumuler le HTML généré dans une seule chaîne
    const htmlComplet = galerie.reduce((acc, p) => {
        return acc + displayPicture(p);
    }, ""); 
    galeriehtml!.innerHTML = htmlComplet;
}