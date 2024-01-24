// const mysql = require('mysql2')
// Promise version - query's can return promise instead of using callbacks
const mysql = require('mysql2/promise')


// Create a connection  to our mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysql_first_day_db'
  })
  

  module.exports = connection;