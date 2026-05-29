import { loadPicture } from "./photoloader";
import { displayPicture } from "./ui"; 

async function getPicture(id: number): Promise<void> {
    try {
        const reponse = await loadPicture(id);
        displayPicture(reponse);
    } catch (erreur) {
        console.error(`Aucune photo trouvée pour ${id}`);
    }
}

const hashText = window.location.hash.startsWith('#')
    ? window.location.hash.substring(1)
    : window.location.hash;
 
const nbr = parseInt(hashText);

getPicture(isNaN(nbr) ? 6 : nbr);