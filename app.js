//npm install -g nodemon
//npm install -g babel-register
//npm install -g express

//npm install body-parser




require('babel-register'); //importationdu modul babel-registeril sert à lire ES6

const express = require('express'); //Création d'une instancee de express
const app = express(); //

const express = require('express'); //Création d'une instancee de express
const app = express(); //

const bodyParser = require('body-parser'); //permet d'utiliser la méthode POST
app.use(bodyParser.json()); //Permet de parser les données json
app.use(bodyParser.urlencoded({ extended: true }));




app.use((req, res, next) => { //requete http, response http, fonction suivante
    console.log('request url:', req.url);
    next(); //permet de passer à la suite de la requête


})

app.get('/api', function(req, res) {
    res.send('hello word');
})

app.get('/api/books/:id', (req, res))

const members = [{
        id: 1,
        name: 'Mouhamadou',
    }, {
        id: 2,
        name: 'Julie',

    }, {
        id: 2,
        name: 'Jack',
    }]
    /////////////////////////////////////////////////////////////////////
app.get('/api/members', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(success(members.slice(req.query.max))); //on renvoie les membres de 0 à max
    } else if (req.query.max != undefined) {
        res.json(error("wrong max value")); //on renvoie parametre vide

    } else {
        res.json(succes(members));
    }
})

app.listen(8080, () => {
    console.log('started');

})