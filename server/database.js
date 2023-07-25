import mysql from 'mysql2';

 const database  = mysql.createConnection({
  host: 'localhost', // Change this if your MySQL server is running on a different host
  user: 'root', // Replace with your MySQL username
  password: 'admin', // Replace with your MySQL password
  database: 'bucketlist', // Replace with your database name
});

export default database;