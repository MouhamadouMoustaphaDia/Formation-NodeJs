//npm install -g nodemon
//npm install -g babel-register
//npm install -g express



require('babel-register'); //importationdu modul babel-registeril sert à lire ES6
const express = require('express'); //Création d'une instancee de express
const app = express(); //
app.use((req, res, next) => { //requete http, response http, fonction suivante
    console.log('request url:', req.url);
    next(); //permet de passer à la suite de la requête

})