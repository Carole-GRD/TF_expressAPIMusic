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

## Créer lefichier gitignore
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

