const mysql = require('mysql2');
require('dotenv').config();

const is_prod = process.env.NODE_ENV === 'production'

// Create a connection  to our mysql database
const connection = mysql.createConnection({
    host: process.env.DB_HOSTURL,
    user: 'root',
    password: is_prod ? process.env.DB_PASSWORD : '',
    database: 'mysql_first_day_db'
  })
  

  module.exports = connection.promise();