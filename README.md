# Photobox

**BUT Informatique — IL1**  
Husser Yanis & Gouthier Martin

## Description

Application web de galerie photos utilisant l'API Photobox de l'IUT Nancy Charlemagne.  
Développée en TypeScript avec ESBuild.

## Fonctionnalités

- Affichage d'une photo avec sa catégorie et ses commentaires
- Affichage d'une galerie de vignettes
- Pagination (première, précédente, suivante, dernière page)
- Clic sur une vignette pour ouvrir la photo en lightbox
- Navigation dans la lightbox (précédent / suivant / fermer)
- Chargement d'une photo via le hash de l'URL (`index.html#id`)

## Lancer le projet

```bash
npm install
npm run build
```

Puis ouvrir `index.html` dans un navigateur.