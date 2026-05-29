import Handlebars from 'handlebars';
import { Photo } from './types';

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

    // On injecte l'objet photo dans le template 
    conteneur!.innerHTML = template(photo);

}