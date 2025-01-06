const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'exam_portal'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = db;
