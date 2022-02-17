//npm install -g nodemon
//npm install -g babel-register
//npm install -g express

//npm install body-parser


require('babel-register'); //importationdu modul babel-registeril sert à lire ES6

const express = require('express'); //Création d'une instancee de express
const app = express(); //

const { success, error } = require('./function')


const bodyParser = require('body-parser'); //permet d'utiliser la méthode POST
app.use(bodyParser.json()); //Permet de parser les données json
app.use(bodyParser.urlencoded({ extended: true }));




app.use((req, res, next) => { //requete http, response http, fonction suivante
    console.log('request url:', req.url);
    next(); //permet de passer à la suite de la requête


})



// app.get('/api', function(req, res) {
//     res.send('hello word');
// })

//app.get('/api/books/:id', (req, res))

const members = [{
    id: 1,
    name: 'Mouhamadou',
}, {
    id: 2,
    name: 'Julie',

}, {
    id: 3,
    name: 'Jack',
}]

let MembersRouter = express.Router();
MembersRouter.route('/')
MembersRouter.route('/:id');
/////////////////////////////////////////////////////////////////////

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
        res.json(success(members));
    }
})

app.get('/api/members/:id', (req, res) => { //création de la route qui recupère l'id
    let index = getIndex(req.params.id); //création de la variable index qui contient la fonction getIndex qui permet de recupérer l'index du membre

    if (index == null) {
        res.json(error(index));
    } else {
        res.json(success(members[index]));
    }


})

/////////////// Ajout d'un membre Post  /////////////////////////
app.post('/api/members', (req, res) => {
    //members.push(id, name);
    if (req.body.name != undefined) {

        members.push({
            id: createId(),
            name: req.body.name
        })
        res.json(success(members));
    } else {
        res.json(error("missing name"));
    }
})

///////////////////////    Edition d'un membre ////////////////////////  
app.post('/api/members/:id', (req, res) => {
    let index = getIndex(req.params.id);

    if (index == null) {
        res.json(error(index));
    } else {
        if (req.body.name != undefined) {
            members[index].name = req.body.name;
            res.json(success(members))
        } else {
            res.json(error("missing name"));
        }
        res.json(success(members[index]));

    }
})


////////////////////// Suppression d'un membre /////////////////////
///////////////////////    Edition d'un membre ////////////////////////  
app.delete('/api/members/:id', (req, res) => {
    let index = getIndex(req.params.id);

    if (index == null) {
        res.json(error(index));
    } else {
        members.splice(index, 1);
    }
    res.json(success(members));
})

//==========================="""""============================
//                            """
//                            """
//                            """
//                            """
//                            """
//                            """
//                            """
//                            """
//                            """
//                            """




















app.listen(8080, () => {
    console.log('started');

})

function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id == id) {
            return i;
        }

    }
    return null;
}

function createId(id) {
    return members[members.length - 1].id + 1; //on return l'id du dernier

}




/*
 Correction du prof

 // npm install -g nodemon 
//npm install - g babel-register





require('babel-register') //importation du modul babel-register il sert a lire ES6
const express = require('express') // exportation du modile express permet de créer un serveur 
const app = express() //création d'une instance de express
const {success, error} = require('./function') // importatrion du module function.js
const bodyParser = require('body-parser') // pour pouvoir utiliser la méthode POST
app.use(bodyParser.json()) //permet de parser les données json
app.use(bodyParser.urlencoded({ extended: true})) //permet de parser les données urlencoded

app.use((req,res,next) => { //requete http, response http, fonction suivante

    console.log('request url:', req.url)
    next() //permet de passer a la suite de la requête 

})

 const members = [
     {
         id: 1,
         name: 'John',
     },
     {
         id: 2, 
         name: 'Julie',
     },
     {
         id: 3,
         name: 'Jack',
     }
 ]
let MembersRouter = express.Router()
 ///////////////////////////RECUPERATION DES MEMBRES ////////////////////////

 app.get('/api/members', (req,res)=> {
     if(req.query.max != undefined && req.query.max > 0){ //si la requête contient un paramètre max
         res.json(success(members.slice(0, req.query.max))) //on renvoie les membres de 0 a max
     } else if (req.query.max != undefined) {// si la requete contient un parametre vide 
         res.json(error("wrong max value")) //on renvoi un parametre vide 
     } else {
         res.json(success(members)) //sinon on retourne tous les membres 
     }
 })


 app.get('/api/members/:id', (req, res) => { //création de la route qui recupere l'id

    let index = getIndex(req.params.id); //création de la variable index qui contiens la  fonction getIndex qui permet de récuperer l'index du membre

    if (typeof (index) == 'string') { //si la variable index est null
        res.json(error(index)) //on retpurne une erreue
    } else {
        res.json(success(members[index])) //sinon on retourne le membre
    }
 })


 //////////////// AJOUT D'UN MEMBRE POST ///////////////////////////////
//créer une fonction createId avant de faire cette requête 

 app.post('/api/members', (req, res) => {
     if (req.body.name != undefined) { // si la requête contient un parametre name 
         members.push({ //permet d'ajouter un membre a la fin du tableau
             id: createId(), // on lui donne un id 
             name: req.body.name // on lui donne un nom 
         })
         res.json(success(members))  //on retourne le tableau des membres  
         } else {
             res.json(error("missing name "))// sinon renvoie une erreur
         }
 })

/////////////////////EDITION D'UN MEMBRE/////////////////////////////////////////

app.put('/api/members/:id', (req, res) => { //c'est la route 
    let index = getIndex(req.params.id)// création d'une variable index qui contient la fonction getIndex qui permet de récuperer l'index du memebre 

    if(typeof(index) == 'string'){
        res.json(error(index))
    }else { 
        let member = members[index] // une variable qui contient le membre modifier 

        if(req.body.name != undefined){
            member.name = req.body.name //on modifie le nom du membre avec l'id passé en parametre dans l'url
            res.json(success(members)) //on retourne le tableau des membres 
        } else {
             res.json(error("missing name")) // sinon renvoie une erreur 
        }
        res.json(success(members[index]))// sinon retourne le membre 
    }
})


//////////SUPPRESSION D'UN MEMBRE DELETE()////////////////////////////////////////

app.delete('/api/members/:id', (req,res) => {

    let index = getIndex(req.params.id) 

    if(typeof (index) == 'string') {
        res.json(error(index))
    } else {
        members.splice(index, 1) //On supprime le membre avec l'id passé en parametre dans l'url
    }
    res.json(success(members)) // on retourne le tableau des membres 
})





app.listen(8080, ()=> {
    console.log('started')
})

function getIndex(id) { //function qui récupere l'index du membre
    for (let i = 0; i < members.length; i++) {
        if (members[i].id == id) {
            return i 
        }
    }
    return "wrong id"
}

function createId() { 
    return members[members.length - 1].id +1 // on retourne l'id du dernier membre +1 
}

*/