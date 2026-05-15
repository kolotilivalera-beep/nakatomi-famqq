const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = 3000;

const ADMIN_PASSWORD = 'nakatomiadmin';

app.use(cors());

app.use(express.json());

app.use(session({

    secret:'supersecretkey',

    resave:false,

    saveUninitialized:false

}));

app.use(express.static(path.join(__dirname,'../client')));

const db =
new sqlite3.Database('./database.db');

const initSQL =
fs.readFileSync('./init.sql','utf8');

db.exec(initSQL);

app.post('/api/login',(req,res)=>{

    const {password} = req.body;

    if(password === ADMIN_PASSWORD){

        req.session.admin = true;

        return res.json({
            success:true
        });

    }

    res.json({
        success:false
    });

});

app.post('/api/application',(req,res)=>{

    const {
        firstname,
        lastname,
        passport,
        discord,
        age,
        about
    } = req.body;

    const query = `
    
    INSERT INTO applications
    (firstname,lastname,passport,discord,age,about)

    VALUES(?,?,?,?,?,?)

    `;

    db.run(
        query,
        [
            firstname,
            lastname,
            passport,
            discord,
            age,
            about
        ],

        function(err){

            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }

            res.json({
                success:true
            });

        }

    );

});

app.get('/api/applications',(req,res)=>{

    if(!req.session.admin){

        return res.status(403).json({
            error:'Нет доступа'
        });

    }

    db.all(
        'SELECT * FROM applications ORDER BY id DESC',
        [],
        (err,rows)=>{

            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }

            res.json(rows);

        }
    );

});

app.delete('/api/application/:id',(req,res)=>{

    if(!req.session.admin){

        return res.status(403).json({
            error:'Нет доступа'
        });

    }

    db.run(

        'DELETE FROM applications WHERE id=?',

        [req.params.id],

        function(err){

            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }

            res.json({
                success:true
            });

        }

    );

});

app.listen(PORT,()=>{

    console.log(
        `Сервер запущен:
        http://localhost:${PORT}`
    );

});