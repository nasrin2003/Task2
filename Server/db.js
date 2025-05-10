const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nasrinthanu@2210',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Db Connected!');
});

module.exports = connection;
