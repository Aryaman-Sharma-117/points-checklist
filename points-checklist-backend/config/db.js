const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'bjsfo7jt6pm11bh9lqcl-mysql.services.clever-cloud.com',
  user: 'uqm3tctr37xstiew', // Replace with your MySQL username
  password: 'u3Z750WXy5mKah87sniR', // Replace with your MySQL password
  database: 'bjsfo7jt6pm11bh9lqcl',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then((connection) => {
    console.log('Successfully connected to MySQL database');
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = pool;