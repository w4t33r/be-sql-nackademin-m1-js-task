const mysql = require('mysql2')
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, './.env')
});

console.log(process.env.DB_HOST)
const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})

connection.connect((error) => {
    if(error) {
        return console.log('Connection aborted')
    }
    else {
        return console.log('Database connected')
    }
})

module.exports = connection