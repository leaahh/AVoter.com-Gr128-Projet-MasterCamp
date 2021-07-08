var mysql = require('mysql')

module.exports.con = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'avoter'
})


