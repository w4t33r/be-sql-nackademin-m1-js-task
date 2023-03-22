const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'EX_BACKEND'
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