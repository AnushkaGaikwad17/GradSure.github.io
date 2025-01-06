// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

// // Set up MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'exam_portal'
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to database');
// });

// // Serve the static files (e.g., HTML, CSS, JS)
// app.use(express.static('public'));

// // Route to get student data
// app.get('/exam-registration', (req, res) => {
//     const email = req.query.email;  // Get the email from the query string

//     const query = `SELECT * FROM students WHERE email = ?`;
//     db.query(query, [email], (err, results) => {
//         if (err) throw err;

//         res.json(results);  // Send student data as JSON
//     });
// });

// // Route to handle form submission and generate hall ticket
// app.post('/register-exam', (req, res) => {
//     const selectedCourses = req.body.courses;
//     const studentEmail = req.body.email;

//     // You can add logic here to update the database if needed
//     // For now, just generate a simple hall ticket response

//     const hallTicket = {
//         student: studentEmail,
//         courses: selectedCourses,
//         message: 'Hall ticket generated successfully!'
//     };

//     res.json(hallTicket);
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });





document.addEventListener('DOMContentLoaded', () => {
    fetch('/exam-registration')
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                document.querySelector('#student-name').textContent = data.student.name;
                document.querySelector('#roll-number').textContent = data.student.roll_number;
                document.querySelector('#branch').textContent = data.student.branch;
                
                const failedCoursesSelect = document.querySelector('#failed-courses');
               // Clear any existing content
            failedCoursesContainer.innerHTML = '';

            data.failedCourses.forEach(course => {
                const div = document.createElement('div');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'failedCourses';
                checkbox.value = course;

                const label = document.createElement('label');
                label.textContent = course;

                div.appendChild(checkbox);
                div.appendChild(label);
                failedCoursesContainer.appendChild(div);
            });
        }
    });

    document.querySelector('#generate-hall-ticket').addEventListener('click', () => {
        fetch('/generate-hall-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                if (data.filePath) {
                    window.open(data.filePath, '_blank'); // Open the generated hall ticket PDF
                }
            }
        });
    });

    document.querySelector('#register-exam').addEventListener('click', () => {
        const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
        const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

        fetch('/register-exam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedCourses, carryForward }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
        });
    });
});
