
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv')


dotenv.config({path:'./.env'});

const app = express();

//database link created]

const db = mysql.createConnection({
    host: process.env.DATABSE_HOST,
    user: process.env.DATABSE_USER,
    password: process.env.DATABSE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Connected to MySQL');
    }
})

app.use('/', require('./routes/page'));
app.use('/auth', require('./routes/auth'));

app.listen(3000,() => {
    console.log("Server started on port 3000");
})

// i wanna kiss sam