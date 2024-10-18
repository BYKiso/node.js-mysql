const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});

const app = express();

//database link created

const db = mysql.createConnection({
    host: process.env.DATABSE_HOST,
    user: process.env.DATABSE_USER,
    password: process.env.DATABSE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Connected to MySQL');
    }
})

app.get("/", (req, res) => {
   // res.send("<h1>Home Page</h1>")
    res.render("index");
})

app.listen(3000,() => {
    console.log("Server started on port 3000");
})
