# Recap étapes

## Initialisation du projet
- créer un fichier app.js
- npm init → créer le package.json avec les infos projet + dépendances


## Ajout des premières dépendances (lib)
### Outils de dev
- nodemon  → (npm i --save-dev nodemon)
### WebServer Express
- express
- express-async-errors
### Gestion des variables d'environnements
- dotenv
### DB (Sql Server)
- sequelize
- tedious
(en une commande :  npm i express express-async-errors dotenv sequelize tedious)
 ajouter --save ???


## Créer le fichier gitignore
- ignorer node_modules + fichiers env
- si extension gitignore installée -> Ctrl + Maj + P (F1) -> add gitignore -> Node


## Ajouter dans les scripts (package.json) :
- "dev" : "nodemon app.js"


## Créer l'architecture de base projet
nomProjet
├── controllers/
├── dto/
├── middlewares/
├── models/
├── routes/
├── services/
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json


## Mise en place des controllers et des routers
ExpressAPIMusic  
├── controllers/  
|    ├── album.controller.js  
|    ├── artist.controller.js  
|    ├── genre.controller.js  
|    ├── track.controller.js  
├── dto/  
├── middlewares/  
├── models/  
├── routes/  
|    ├── album.router.js  
|    ├── artist.router.js  
|    ├── genre.router.js  
|    ├── index.js  
|    ├── track.router.js  
├── services/  
├── .env  
├── .gitignore  
├── app.js  
├── package-lock.json  
├── package.json


## Ajout du router dans l'app.js

## Création de la DB sur SSMS + Attribution des droits à notre User (voir login -> Carole)

## Ajouter dans le .env les infos DB

## Setup DB
- Création du index.js avec instance de sequelize et objet db + liaison modèle + relations
- Creation de tous les modèles
- Nouvelle arborescence

- Connection db dans app.js   +   synchro dans  models/index.js 
    https://sequelize.org/docs/v6/core-concepts/assocs/


## Création des services et genre controller


## Ajout de l'utils SuccessResponse et SuccessArrayResponse
- Permet d'envoyer comme response, le resultat, le count (si tableau) et le status


    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
    https://dev.to/this-is-angular/nullish-coalescing-support-in-angular-template-48h6


## Ajout d'une pagination
- Dans un controller (pour comprendre comment ça fonctionne)
- Mise en place d'un middleware pour la pagination 


## Mise en place User
- Création model et lien Many to Many
- Création service + DTO 
- Création UserController (GetAll, GetById, Update, Delete) et AuthController (Register, Login)
- Création routes
- Hashage Password et Verif Password au login (npm i argon2)


## Rework des Tracks 
### Insertion
- Rajouter le genre
- Rajouter les albums qui lui sont liés
- Rajouter les artistes qui lui sont liés (en featuring ou pas)
### Récupération
- Rajouter le genre sur les tracks récupérées
- Rajouter les albums sur lesquels sont la track
- Rajouter les artistes qui ont participés à la track


## Ajout des validations de données (by Mister Gavin)

- Ajout de la librairie yup
- Mise en place des modèles yup
- Mise en place d'un middleware pour valider les données du body
- Mise en place du middleware sur les routes appropriées
- Modification des modèles sequelize pour ajouter de la validation côté db également


## Mise en place du JWT
- Installer jsonwebtoken dans l'app
- Créer les deux méthodes encode/decode (utils)
- Ajouter dans les variables d'environnement (secret, issuer, audience)
- Création du token dans login et register (controller)
- Mise en place du middleware qui va décoder le token (middleware + routes)

## Ajout du like des tracks par un user
