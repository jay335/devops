// Load environment variables
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test DB connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database!');
        connection.release();
    }
});

// Sample API route
app.get('/', (req, res) => {
    res.send('Node.js backend is running!');
});

// Create User
app.post('/users', (req, res) => {
    if (!process.env.DB_HOST || process.env.DB_HOST === 'your-db-endpoint') {
        return res.json({ message: 'DB not connected yet' });
    }
    const { name, email, age} = req.body;
    const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    pool.query(sql, [name, email, age], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertId
        });
    });
});

// READ users
app.get('/users', (req, res) => {
   if (!process.env.DB_HOST || process.env.DB_HOST === 'your-db-endpoint') {
        return res.json([]);
    }
    const sql = 'SELECT * FROM users';
    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
