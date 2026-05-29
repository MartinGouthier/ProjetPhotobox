import { loadPicture, loadResource } from "./photoloader";
import { displayPicture, displayCategory, displayComments } from "./ui";

async function getPicture(id: number): Promise<void> {
    try {
        const reponse = await loadPicture(id);
        
        // Affichage photo
        displayPicture(reponse.photo);

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

getPicture(isNaN(nbr) ? 6 : nbr);