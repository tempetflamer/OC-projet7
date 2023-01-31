# Projet 7 - Les petits plats

Projet 7 du parcours "Développeur d'application - JavaScript React", qui consiste à créer un site de recettes de cuisine pour l’entreprise “Les petits plats” à l’instar de Marmiton ou 750g.  

## Informations du projets

### Contexte

Les petits plats est une entreprise ayant édité des livres de cuisine pendant plusieurs années.
L'entreprise souhaite désormais se lancer dans un nouveau projet : La réalisation de son propre site de cuisine à l’instar de Marmiton ou 750g.  

### Objectif

Les sites offrant des recettes de cuisine sont nombreux et l’équipe a pensé que l’un des éléments qui peuvent faire la différence sur notre site est la fluidité du moteur de recherche.

### Mission

Ma première mission sera d'inplémenter la fonctionnalité de recherche du site en réalisant le prototype du site l'accompagnant avec la maquette fournie.
Pour la fonctionnalité de recherche, il faudra réaliser plusieurs système de recherches pour comparer les performances et réalisé une fiche "d’investigation de fonctionnalité".
Les 2 fonctionnalités de recherche seront :
- Boucles natives (while, for...) 
- Programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter, map, reduce)

un schéma, ou "algorigramme" sera réalisé pour chaque fonctionnalité de recherche.


## Cahiers des charges

### Scénarios

|**Cas d’utilisation #03 :** Filtrer les recettes dans l’interface utilisateur|
|-----|
|**Objectif :** Accéder rapidement à une recette correspondant à un besoin de l’utilisateur dans les recettes déjà reçues|
|**Description :** <br> L’utilisateur doit pouvoir filtrer les recettes selon deux axes : <br>1- Une barre principale permettant de rechercher des mots ou groupes de lettres dans **le titre, les ingrédients ou la description.** <br>2 – Recherche par mots clés dans les ingrédients, les ustensiles ou les appareils.|
|**Acteur :** Utilisateur|
|**Version document :** 1.3|
|**Date Création :** 12/06/2020|
|**Date de mise à jour :** 30/06/2020|
|**Responsable :** Jean-Baptiste A.|
|**Référence Mockup :** #003|
|**Préconditions :** L’utilisateur se trouve sur la page des recettes|

|**Scénario nominal**|
|-----|
|1. Le cas d’utilisation commence lorsque l’utilisateur entre au moins 3 caractères dans la barre de recherche principale.|
|2. Le système recherche des recettes correspondant à l’entrée utilisateur dans : le titre de la recette, la liste des ingrédients de la recette, la description de la recette.|
|3. L’interface est actualisée avec les résultats de recherche.|
|4. Les champs de recherche avancée sont actualisés avec les informations ingrédients, ustensiles, appareil des différentes recettes restantes|
|5. L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles, appareil|
|6. Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le champ disparaissent. Par exemple, si l’utilisateur entre “coco” dans la liste d’ingrédients, seuls vont rester “noix de coco” et “lait de coco”.|
|7. L’utilisateur choisit un mot clé dans le champ.|
|8. Le mot clé apparaît sous forme de tag sous la recherche principale.|
|9. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée|
|10. L’utilisateur sélectionne une recette|

|**Scénario alternatif A1**|
|-----|
|**A1. Aucune recette correspondante à la recherche** <br>L'enchaînement A1 commence au point 3 du scénario nominal|
|3. L’interface affiche « Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.|

|**Scénario alternatif A2**|
|-----|
|**A2. L’utilisateur commence sa recherche par un tag** <br>L'enchaînement A2 commence au point 1 du scénario nominal et reprend au point 9 du scénario nominal.|
|1. L’utilisateur commence la recherche par un tag|
|2. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée (9 du cas principal)|

|**Scénario alternatif A3**|
|-----|
|**A3. L’utilisateur ajoute d’autres tags pour la recherche avancée** <br>L'enchaînement A3 commence au point 9 du scénario nominal. Cet enchaînement peut se répéter autant que nécessaire|
|10. L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles, appareil.|
|11. Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le champ disparaissent.|
|12. L’utilisateur choisit un mot clé dans le champ.|
|13. Le mot clé apparaît sous forme de tag sous la recherche principale.|
|14. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée.|


### Règles de gestion

1. La recherche doit pouvoir se faire via le champ principal ou via les tags (ingrédients,
ustensiles ou appareil)
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur dans la
barre de recherche
3. La recherche s’actualise pour chaque nouveau caractère entré
4. La recherche principale affiche les premiers résultats le plus rapidement possible
5. Les champs ingrédients, ustensiles et appareil de la recherche avancée proposent
seulement les éléments restant dans les recettes présentes sur la page
6. Les retours de recherche doivent être une intersection des résultats. Si l’on ajoute les
tags “coco” et “chocolat” dans les ingrédients, on doit récupérer les recettes qui ont à la
fois de la coco et du chocolat.
7. Comme pour le reste du site, le code HTML et CSS pour l’interface (avec ou sans
Bootstrap) devra passer avec succès le validateur W3C.
8. Aucune librairie ne sera utilisée pour le JavaScript du moteur de recherche


## Algorithmes

### Architecture des algorithmes

[Schéma Boucles natives](https://drive.google.com/file/d/10OAiRaebJZEJ2aboTiibwdcgUnZARiHv/view?usp=share_link)

[Schéma Programmation fonctionnelle](https://drive.google.com/file/d/1pUD0Gr1wmrXY20XQNHt7wF1kKwrZkhKP/view?usp=share_link)


### Benchmark des algorithmes
Benchmark, mot cherché "Coco", tags sélectionnés "Lait de coco" et "Saladier" sur 500 recettes.
Moyenne des résultats sur 50 tests.
||**Boucle native**|**Méthode de l'objet array**|
|-----|:-----:|:-----:|
|**Moyenne**|**100**|**97.11**|
|**Ecart max**|100|90.7|

Dans quelques cas l'algo des méthodes de l'objet array est légèrement plus rapide


## Ressources du projets :

### Maquette
[Mockup](https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?node-id=0%3A1&t=R2bELYofaBDV0htG-0)

### Héberhement
[Projet 7 - Les petits plats](https://tempetflamer.github.io/OC-projet7/)

### Documents
[Description de la fonctionnalité de recherche à implémenter](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P6+Algorithms/Cas+d%E2%80%99utilisation+%2303+Filtrer+les+recettes+dans+l%E2%80%99interface+utilisateur.pdf)

[Fiche d’investigation de fonctionnalité](https://drive.google.com/file/d/14IJ3UMAzAHrZeDfY3RlD_jPvCWcykm2r/view?usp=share_link)

[Modèle de fiche d’investigation de fonctionnalité](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P6+Algorithms/Fiche+d%E2%80%99investigation+fonctionnalite%CC%81.pdf)

### Données JSON
[Jeu de test des recettes au format JSON](assets/data/data.json)


## Organisation du projet

`assets/`, contient toutes les images utilisées
- `data/`, contient les données en JSON pour l'application
- `images/`, contient le placeholder remplaçant les images utilisées dans l'application
- `logo.png`, logo "Les petits plats"
- `favicon`, icon du logo "Les petits plats"

`css/`, contient le fichier `style.css` où sont définit les styles de l'application

`sass/`, contient les fichiers sass sous le modèle 7-1, ensuite compilé en css
- `Base/`, contients les fondations du site.
- `Componants/`, contient blocs BEM indépendant réutilisable
- `Layout/`, contient les blocs BEM réutilisable
- `Pages/`, contient les blocs de code qui ne s’appliquent qu’à une seule page
- `utils/`, contient les animations, variables et mixins créées
- `main.scss`, fichier rassemblant les différents fichiers sass partiel de l'application

`scripts/`, contient les fichiers JavaScript 
- `factories/`, contient les fichiers JS nécessaire à l'usinage de création des données JSON 
- `utils/`, contient les différents composants JS utilisés dans l'applications 

`index.html`, page d'index du site

`package.json` & `package-lock.json`, fichiers utilisés par npm pour gérer les dépendances

`.gitignore`, fichier qui permet de définir les fichiers à ignorer dans la liste des fichiers modifiés à "push"

`.eslintrc.js`, fichier de ESLint (outil d'analyse de code statique) permettant de le configurer

`README.md`, fichier de présentation et d'explication du projet que vous lisez actuellement

## Outils & technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![ESLint](https://a11ybadges.com/badge?logo=eslint) ![PurgeCSS](https://a11ybadges.com/badge?logo=purgecss)

[Jsbench - comparaison de performance script js](https://jsben.ch/)


## Compétences évaluées

- Développer un algorithme pour résoudre un problème
- Analyser un problème informatique

