// Imports

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const ejs = require('ejs');


// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'passwordManager'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql connected');
});

const app = express();


//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Global Vars
app.use (function(req,res,next){
    res.locals.errors = null;
    next();
});

//validation middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam +='[' + namespace.shift() + ']';
        }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
    }
}));

//flash messages
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE passwordManager';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created...');
    });
});

///////////  ROUTES /////////

//set static

app.use(express.static(path.join(__dirname, 'public')));

// index
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Password Manager',
    });
});


// dashboard

app.get('/dashboard', function (req, res) {
    let sql = 'SELECT * FROM passwords';
    let query = db.query(sql, (err, result) => {
        res.render('dashboard', {
            title: 'Password Manager',
            result: result,
            success: true,
        });
    });
    req.flash('success', 'Your password was deleted');
});

app.get('/password/add'), function(req, res) {
    res.render('add password', {
        title: 'Add Password'
    });
}

// //add password


// app.post('/passwords/add', function (req, res) {

//     req.checkBody('site', 'Site name is required').notEmpty();
//     req.checkBody('username', 'Username is required').notEmpty();
//     req.checkBody('password', 'Password is required').notEmpty();

//     let site = req.body.site;
//     let username = req.body.username;
//     let password = req.body.password;

//     var errors = req.validationErrors();
//     let result = '';
//     if (errors) {
//         res.render('dashboard', {
//             errors: errors,
//             title: 'Password Manager',
//             result: result,
//             success: true,
//         });
//     } else {
//         var newPassword = {
//             site: site,
//             username: username,
//             password: password,
//         }
//         let sql = 'INSERT INTO passwords SET ?';
//         let query = db.query(sql, newPassword, (err, result) => {
//             if (err) throw err;
//             console.log(result);
//             res.send('Password added...');
//         });
//     }
// });

//edit password

app.get('/update/:id', function(req, res){
    console.log(req.params.id);
    
    // let id = req.params.id;
    // let sql = `UPDATE passwords SET ? WHERE id = '${ id }'`;
    // let query = db.query(sql, (err, result) => {
    //     if (err) throw err;
    //     req.flash('success', 'Your password was deleted');
    //     res.redirect(200, '/dashboard');
    // });
});


//delete password

app.delete('/delete/:id', function(req, res){
    let id = req.params.id;
    let sql = `DELETE FROM passwords WHERE id = '${ id }'` ;
    // console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        req.flash('success', 'Your password was deleted');
        res.redirect(200,'/dashboard');
    });
});


//create table

app.get('/createtablepasswords', (req, res) => {
    let sql = 'CREATE TABLE passwords(id int AUTO_INCREMENT, site VARCHAR(255), username VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))'

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Passwords table created');
    });
});

// insert data 1

app.get('/addpost1', (req, res) => {
    let password = { site: 'Amazon.com', username: 'waqar', password: 'abcd1234' };
    let sql = 'INSERT INTO passwords SET ?';
    let query = db.query(sql, password, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Password1 added...');
    });
});

// insert data 2

app.get('/addpost2', (req, res) => {
    let password = { site: 'gmail.com', username: 'waqar@gmail.com', password: 'abcd1234' };
    let sql = 'INSERT INTO passwords SET ?';
    let query = db.query(sql, password, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Password2 added...');
    });
});

// insert data 3

app.get('/addpost3', (req, res) => {
    let password = { site: 'facebook.com', username: 'waqar@gmail.com', password: 'abcd1234' };
    let sql = 'INSERT INTO passwords SET ?';
    let query = db.query(sql, password, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Password3 added...');
    });
});

// insert data 4

app.get('/addpost4', (req, res) => {
    let password = { site: 'yahoo.com', username: 'waqar@yahoo.com', password: '87654321' };
    let sql = 'INSERT INTO passwords SET ?';
    let query = db.query(sql, password, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Password4 added...');
    });
});

app.listen('3000'), () => {
    console.log('server started on port 8080');
}