import Handlebars from 'handlebars';
import { Photo, ReponseCategorie, Commentaire } from './types';

const sourceTemplate = `
<article>
    <h2>{{titre}}</h2>

    <img src="https://webetu.iutnc.univ-lorraine.fr{{url.href}}" alt="Photo de {{titre}}">

    <ul>
        <li>Type : {{type}}</li>
        <li>Format : {{format}}</li>
        <li>Dimensions : {{width}} x {{height}} px</li>
        <li>Poids : {{size}} octets</li>
    </ul>

    <p>{{descr}}</p>
</article>
`;

const template = Handlebars.compile(sourceTemplate);

export function displayPicture(photo: Photo): void {
    const conteneur = document.querySelector('#la_photo');

    conteneur!.innerHTML = template(photo);
}

export function displayCategory(categorieData: ReponseCategorie): void {
    const conteneur = document.querySelector('#la_categorie');
    conteneur!.innerHTML = `Catégorie : ${categorieData.categorie.nom}`;
}

export function displayComments(commentaires: Commentaire[]): void {
    const conteneur = document.querySelector('#les_commentaires')!;
    
    let html = '';
    for (const c of commentaires) {
        html += `<li>${c.pseudo} : ${c.content}</li>`;
    }
    
    conteneur.innerHTML = html;
}