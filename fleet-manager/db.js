const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',  // or your MySQL host
  user: 'root',       // your MySQL username
  password: 'password', // your password
  database: 'fleet_manager_db', // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
