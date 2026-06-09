import { loadPicture, loadResource } from "./photoloader";
import { displayPicture, displayCategory, displayComments } from "./ui";
import { display_galerie } from "./gallery_ui";
import { load, next, prev, first, last, getGalerieActuelle } from "./gallery";
import { Photo } from "./types";
import { BASE_URL } from "./config";

async function getPicture(id: number): Promise<void> {
    try {
        const reponse = await loadPicture(id);
        
        document.querySelector("#la_photo")!.innerHTML = displayPicture(reponse.photo);

        const cat = await loadResource(reponse.links.categorie.href);
        displayCategory(cat);

        const com = await loadResource(reponse.links.comments.href);
        displayComments(com.comments);

    } catch (erreur) {
        console.error(`Erreur : ${erreur}`);
    }
}

function ouvrirLightbox(index: number): void {
    const galerie = getGalerieActuelle();
    const photo = galerie[index];
    if (!photo) return;

    const lightbox = document.getElementById("lightbox")!;
    const img = document.getElementById("lightbox-img") as HTMLImageElement;

    img.src = `${BASE_URL}${photo.url.href}`;
    img.alt = photo.titre;
    lightbox.dataset.index = String(index);
    lightbox.classList.add("active");
}

const hashText = window.location.hash.startsWith('#')
    ? window.location.hash.substring(1)
    : window.location.hash;
 
const nbr = parseInt(hashText);

document.getElementById("galerieBouton")!.addEventListener("click", () => {
    load().then((photos: Photo[]) => {
        display_galerie(photos);
    }).catch(console.error);
});

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

document.getElementById("galerie")!.addEventListener("click", (event: Event) => {
    const cible = event.target as HTMLElement;
    const article = cible.closest("article");

    if (article && article.dataset.photoid) {
        const galerie = getGalerieActuelle();
        const photoId = parseInt(article.dataset.photoid);
        const index = galerie.findIndex(p => p.id === photoId);
        ouvrirLightbox(index);
    }
});

document.getElementById("lightbox-close")!.addEventListener("click", () => {
    document.getElementById("lightbox")!.classList.remove("active");
});

document.getElementById("lightbox-next")!.addEventListener("click", () => {
    const lightbox = document.getElementById("lightbox")!;
    const index = parseInt(lightbox.dataset.index ?? "0");
    ouvrirLightbox(index + 1);
});

document.getElementById("lightbox-prev")!.addEventListener("click", () => {
    const lightbox = document.getElementById("lightbox")!;
    const index = parseInt(lightbox.dataset.index ?? "0");
    ouvrirLightbox(index - 1);
});

getPicture(isNaN(nbr) ? 6 : nbr);