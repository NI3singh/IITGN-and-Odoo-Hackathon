const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',      // Replace with your MySQL host
    user: 'root',  // Replace with your MySQL username
    password: 'Nitin@2002',  // Replace with your MySQL password
    database: 'TWEETER' // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;