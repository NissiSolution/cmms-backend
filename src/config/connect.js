const mysql = require('mysql');

// Create a connection to the database
 const connection = mysql.createConnection({
  host:'82.180.167.34',
  user:'u540105965_nissicmms',             // Replace with your MySQL username
  password:'R5w]e!Aiaa$Y',             // Replace with your MySQL password
  database:'u540105965_nissicmms',
  connectionLimit: 0, // Set appropriate connection limits
  queueLimit: 0,       // Replace with your database name
});

connection.connect((error) => {
  if (error) {
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
      }
      if (error.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.');
      }
      if (error.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.');
      }
  } else {
      console.log('Database connected');
  }
});

module.exports=connection;