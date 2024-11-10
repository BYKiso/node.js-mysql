const mysql = require("mysql");
const bcrypt = require('bcryptjs');
const jws = require ("jsonwebtoken");

const db = mysql.createConnection({
    host: process.env.DATABSE_HOST,
    user: process.env.DATABSE_USER,
    password: process.env.DATABSE_PASSWORD,
    database: process.env.DATABASE,
});

exports.register = (req, res) => {
    console.log(req.body);

    const { Name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'Email Already Exists'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);

        db.query('INSET INTO users SET ?'), {name: name, email: email, password: hashedPassword}, (err, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'Email Already Exists'});
            }
        }

    });

}

