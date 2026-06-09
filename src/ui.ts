import Handlebars from 'handlebars';
import { Photo, ReponseCategorie, Commentaire } from './types';
import {BASE_URL} from "./config";

const sourceTemplate = `
<article data-photoId="{{id}}">
    <h1>Photo : {{id}}</h1>

    <img src="${BASE_URL}{{url.href}}" alt="Photo de {{titre}}">
    
    <h4>{{titre}}</h4>
    <p>{{descr}}</p>
    <p>{{type}}, {{width}} x {{height}}</p>

</article>
`;

const template = Handlebars.compile(sourceTemplate);

export function displayPicture(photo: Photo): string {
    /* Question 1 avant modifs
    const conteneur = document.querySelector('#la_photo');
    conteneur!.innerHTML = template(photo);
     */
    return template(photo);

}

export function displayCategory(categorieData: ReponseCategorie): void {
    const conteneur = document.querySelector('#la_categorie');
    conteneur!.innerHTML = `<h4>Catégorie : ${categorieData.categorie.nom}</h4>`;
}

export function displayComments(commentaires: Commentaire[]): void {
    const conteneur = document.querySelector('#les_commentaires')!;
    
    let html = '<h3>Commentaires :</h3><ul>'; 
    
    for (const c of commentaires) {
        html += `<li>${c.pseudo} : ${c.content}</li>`;
    }
    
    html += '</ul>'; 
    
    conteneur.innerHTML = html;
}