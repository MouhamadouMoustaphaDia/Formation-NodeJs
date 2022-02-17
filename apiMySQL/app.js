require('babel-register');
const config = require('./config');
const { success, error } = require('./function');
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extented: true }));

let MembersRouter = express.Router();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
})

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database node');

        MembersRouter.route('/')
            .get((req, res) => {
                if (req.query.max != undefined && req.query.max > 0) {
                    db.query('SELECT * FROM users LIMIT 0, ?', [req.query.max], (err, result) => {
                        if (err) {
                            res.json(err.messge)
                        } else {
                            res.json(success(result))
                        }

                    })
                } else if (req.query.max != undefined) {
                    res.json(error("wrong max value"));
                } else {
                    db.query('SELECT * FROM users', (err, result) => {
                        if (err) {
                            res.json(err.message);
                        } else {
                            res.json(success(result));
                        }
                    })
                }

            })

        app.use(config.routAPI + 'members', MembersRouter);

        app.listen(config.port, () => {
            console.log(('started'));
        })
    }

})