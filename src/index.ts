import { loadPicture } from "./photoloader";

async function getPicture(id: number): Promise<void> {
    try {
        const photo = await loadPicture(id);
        console.log(`Titre : ${photo.titre}, Type de fichier : ${photo.type}, URL : ${photo.url.href}`);
    } catch (erreur) {
        console.log(`Aucune photo trouvée pour ${id}`);
    }
}

// On récupère le numéro de l'image dans l'URL, sinon on charge la numéro 6 par défaut.
const hashText = window.location.hash.startsWith('#')
    ? window.location.hash.substring(1)
    : window.location.hash;
 
const nbr = parseInt(hashText);

getPicture(isNaN(nbr) ? 6 : nbr);