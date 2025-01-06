const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/login-options', (req, res) => {
    // Serve HTML content directly from this file
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login Options</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f4;
                }
                .container {
                    text-align: center;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                button {
                    padding: 10px 20px;
                    margin: 10px;
                    font-size: 16px;
                    cursor: pointer;
                    border: none;
                    border-radius: 4px;
                    background-color: #007BFF;
                    color: #fff;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Login As</h2>
                <button onclick="window.location.href='/public/index.html'">Student</button>
                <button onclick="window.location.href='/public/index.html'">Admin</button>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
