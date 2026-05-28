import {loadPicture} from "./photoloader";

async function getPicture(id:number):Promise<void>{
    const photo = await loadPicture(id);
    if (photo != null){
        console.log(`Titre : ${photo.titre}, Type de fichier : ${photo.type}, URL : ${photo.url.href}`);
    } else {
        console.log(`Aucune photo trouvée pour ${id}`);
    }
}

const nbr = window.location.hash.startsWith('#')
    ? window.location.hash.substring(1)
    : window.location.hash;

getPicture(parseInt(nbr))