import { loadPicture, loadResource } from "./photoloader";
import { displayPicture, displayCategory, displayComments } from "./ui";
import {display_galerie} from "./gallery_ui";
import {load} from "./gallery";
import {Photo} from "./types";
import {BASE_URL} from "./config";

async function getPicture(id: number): Promise<void> {
    try {
        const reponse = await loadPicture(id);
        
        // Affichage photo
        document.querySelector("#la_photo")!.innerHTML = displayPicture(reponse.photo);

        // Récupération et affichage catégorie
        const cat = await loadResource(reponse.links.categorie.href);
        displayCategory(cat);

        // Récupération et affichage commentaires
        const com = await loadResource(reponse.links.comments.href);
        displayComments(com.comments);



    } catch (erreur) {
        console.error(`Erreur : ${erreur}`);
    }
}

const hashText = window.location.hash.startsWith('#')
    ? window.location.hash.substring(1)
    : window.location.hash;
 
const nbr = parseInt(hashText);

//Affichage galerie
document.getElementById("galerieBouton")!.addEventListener("click",() => {
    load().then((photos : Photo[])=> {
        display_galerie(photos);
    })
});
getPicture(isNaN(nbr) ? 6 : nbr);