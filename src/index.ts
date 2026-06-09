import { loadPicture, loadResource } from "./photoloader";
import { displayPicture, displayCategory, displayComments } from "./ui";
import { display_galerie } from "./gallery_ui";
import { load, next, prev, first, last } from "./gallery";
import { Photo } from "./types";

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

// Affichage galerie initiale
document.getElementById("galerieBouton")!.addEventListener("click", () => {
    load().then((photos: Photo[]) => {
        display_galerie(photos);
    }).catch(console.error);
});

// Pagination
document.getElementById("btn-next")!.addEventListener("click", () => {
    next().then((photos: Photo[]) => display_galerie(photos)).catch(console.error);
});

document.getElementById("btn-prev")!.addEventListener("click", () => {
    prev().then((photos: Photo[]) => display_galerie(photos)).catch(console.error);
});

document.getElementById("btn-first")!.addEventListener("click", () => {
    first().then((photos: Photo[]) => display_galerie(photos)).catch(console.error);
});

document.getElementById("btn-last")!.addEventListener("click", () => {
    last().then((photos: Photo[]) => display_galerie(photos)).catch(console.error);
});

// Clic sur une photo de la galerie
document.getElementById("galerie")!.addEventListener("click", (event: Event) => {
    const cible = event.target as HTMLElement;
    const article = cible.closest("article");

    if (article && article.dataset.photoid) {
        const photoId = parseInt(article.dataset.photoid);
        getPicture(photoId);
    }
});

getPicture(isNaN(nbr) ? 6 : nbr);