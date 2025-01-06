


const express = require('express');
const bodyParser = require('body-parser');// Importing the body-parser middleware to parse incoming request bodies in a middleware before handling them.
const mysql = require('mysql');
const session = require('express-session');//Importing the express-session middleware to manage user sessions, storing data about logged-in users.
const cors = require('cors');//// Importing the CORS middleware to enable Cross-Origin Resource Sharing, allowing the server to handle requests from different origins.
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit'); // PDF generation
const fs = require('fs'); // File system module
const path = require('path'); // Path module

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login-options.html'));
});

// Session configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Database connection
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

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Verify Email student
app.post('/verify-email', (req, res) => {
    const { email } = req.body;
    db.query('SELECT * FROM users1 WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length > 0) {
            res.json({ message: 'Email found!' });
        } else {
            res.json({ message: 'Email not registered!' });
        }
    });
});
// // Verify Email admin
// app.post('/verify-email', (req, res) => {
//     const { email } = req.body;
//     db.query('SELECT * FROM admin_gradsure WHERE email = ?', [email], (err, results) => {
//         if (err) return res.status(500).json({ message: 'Server error' });
//         if (results.length > 0) {
//             res.json({ message: 'Email found!' });
//         } else {
//             res.json({ message: 'Email not registered!' });
//         }
//     });
// });
// Verify Password student
app.post('/verify-password', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users1 WHERE email = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length > 0) {
            req.session.email = username; // Save email in session
            res.json({ message: 'Password correct!' });
        } else {
            res.json({ message: 'Invalid Password!' });
        }
    });
});
// // Verify Password admin
// app.post('/verify-password', (req, res) => {
//     const { username, password } = req.body;
//     db.query('SELECT * FROM admin_gradsure WHERE email = ? AND password = ?', [username, password], (err, results) => {
//         if (err) return res.status(500).json({ message: 'Server error' });
//         if (results.length > 0) {
//             req.session.email = username; // Save email in session
//             res.json({ message: 'Password correct!' });
//         } else {
//             res.json({ message: 'Invalid Password!' });
//         }
//     });
// });

// Send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Send OTP email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password'
        }
    });
    
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.json({ otp });
    });
});
///admin
// Verify Email admin
app.post('/verify-email-admin', (req, res) => {
    const { email } = req.body;
    db.query('SELECT * FROM admin_gradsure WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length > 0) {
            res.json({ message: 'Email found!' });
        } else {
            res.json({ message: 'Email not registered!' });
        }
    });
});




// Verify Password admin
app.post('/verify-password-admin', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM admin_gradsure WHERE email = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length > 0) {
            req.session.email = username; // Save email in session
            res.json({ message: 'Password correct!' });
        } else {
            res.json({ message: 'Invalid Password!' });
        }
    });
});




// Exam Registration
app.get('/exam-registration', (req, res) => {
    const email = req.session.email; // Get email from session
    if (!email) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    db.query('SELECT * FROM students WHERE email = ?', [email], (err, studentResults) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (studentResults.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const student = studentResults[0];

        db.query('SELECT DISTINCT course FROM students WHERE email = ? AND course_code IS NOT NULL', [email], (err, courseResults) => {
            if (err) return res.status(500).json({ message: 'Server error' });

            const failedCourses = courseResults.map(course => course.course);

            res.json({ student, failedCourses });
        });
    });
});








// // Register Exam Endpoint
// app.post('/register-exam', (req, res) => {
//     const { selectedCourses, carryForward } = req.body;
//     const email = req.session.email; // Get email from session

//     if (!email) {
//         return res.status(401).json({ message: 'Not authenticated' });
//     }

//     if (!selectedCourses || !Array.isArray(selectedCourses)) {
//         return res.status(400).json({ message: 'Invalid request payload' });
//     }

//     const insertQueries = selectedCourses.map(course => {
//         return new Promise((resolve, reject) => {
//             db.query(
//                 'INSERT INTO exam_registrations (email, course, carry_forward) VALUES (?, ?, ?)', 
//                 [email, course, carryForward], 
//                 (err) => {
//                     if (err) return reject(err);
//                     resolve();
//                 }
//             );
//         });
//     });

//     Promise.all(insertQueries)
//         .then(() => res.json({ message: 'Exam registration successful' }))
//         .catch(err => res.status(500).json({ message: 'Server error' }));
// });






// Register Exam Endpoint
app.post('/register-exam', (req, res) => {
    const { selectedCourses, carryForward } = req.body;
    const email = req.session.email; // Get email from session

    if (!email) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!selectedCourses || !Array.isArray(selectedCourses)) {
        return res.status(400).json({ message: 'Invalid request payload' });
    }

    const insertQueries = selectedCourses.map(course => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO exam_registrations (email, course, carry_forward) VALUES (?, ?, ?)', 
                [email, course, carryForward], 
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    });

    Promise.all(insertQueries)
        .then(() => res.json({ message: 'Exam registration successful' }))
        .catch(err => res.status(500).json({ message: 'Server error' }));
});

// Fetch Student Details
app.get('/student-details', (req, res) => {
    const email = req.session.email; // Get email from session
    if (!email) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    // Fetch student details from student_details table
    db.query('SELECT * FROM student_details WHERE email = ?', [email], (err, detailsResults) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (detailsResults.length === 0) {
            return res.status(404).json({ message: 'Student details not found' });
        }

        const studentDetails = detailsResults[0];

        // Send the student details in the response
        res.json(studentDetails);
    });
});











// app.get('/registered-students', (req, res) => {
//     const { rollNumber, branch, course, year, name } = req.query;

//     let sql = `
//         SELECT 
//             s.id,
//             s.name,
//             s.roll_number,
//             s.branch,
//             s.year,
//             GROUP_CONCAT(DISTINCT CASE 
//                 WHEN er.course NOT IN ('250', 'undefined', 'on') THEN er.course
//                 ELSE NULL 
//             END ORDER BY er.course SEPARATOR ', ') AS courses,
//             er.carry_forward,
//             MAX(er.registration_date) AS registration_date
//         FROM 
//             students s
//         LEFT JOIN 
//             exam_registrations er ON er.email = s.email
//         WHERE 1=1
//     `;

//     // Add conditional filters based on provided query parameters
//     if (rollNumber) sql += ` AND s.roll_number LIKE '%${rollNumber}%'`;
//     if (branch) sql += ` AND s.branch LIKE '%${branch}%'`;
//     if (course) sql += ` AND er.course LIKE '%${course}%'`;
//     if (year) sql += ` AND s.year = ${db.escape(year)}`;
//     if (name) sql += ` AND s.name LIKE '%${name}%'`;

//     sql += `
//         GROUP BY 
//             s.id, s.name, s.roll_number, s.branch, s.year, er.carry_forward
//         ORDER BY 
//             registration_date DESC;
//     `;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching registered students:', err);
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });










// app.get('/registered-students', (req, res) => {
//     const { rollNumber, branch, course, year, name } = req.query;

//     let sql = `
//         SELECT 
//             s.id,
//             s.name,
//             s.roll_number,
//             s.branch,
//             s.year,
//             GROUP_CONCAT(DISTINCT CASE 
//                 WHEN er.course NOT IN ('250', 'undefined', 'on') THEN er.course
//                 ELSE NULL 
//             END ORDER BY er.course SEPARATOR ', ') AS courses,
//             er.carry_forward,
//             MAX(er.registration_date) AS registration_date
//         FROM 
//             students s
//         LEFT JOIN 
//             exam_registrations er ON er.email = s.email
//         WHERE 1=1
//     `;

//     // Add conditional filters based on provided query parameters
//     if (rollNumber) sql += ` AND s.roll_number LIKE '%${rollNumber}%'`;
//     if (branch) sql += ` AND s.branch LIKE '%${branch}%'`;
//     if (course) sql += ` AND er.course LIKE '%${course}%'`;
//     if (year) sql += ` AND s.year = ${db.escape(year)}`;
//     if (name) sql += ` AND s.name LIKE '%${name}%'`;

//     sql += `
//         GROUP BY 
//             s.id, s.name, s.roll_number, s.branch, s.year, er.carry_forward
//         ORDER BY 
//             registration_date DESC;
//     `;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching registered students:', err);
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });








// app.get('/registered-students', (req, res) => {
//     const { rollNumber, branch, course, year, name } = req.query;

//     let sql = `
//         SELECT 
//             s.id,
//             s.name,
//             s.roll_number,
//             s.branch,
//             s.year,
//             GROUP_CONCAT(DISTINCT CASE 
//                 WHEN er.course NOT IN ('250', 'undefined', 'on') THEN er.course
//                 ELSE NULL 
//             END ORDER BY er.course SEPARATOR ', ') AS courses,
//             er.carry_forward,
//             MAX(er.registration_date) AS registration_date
//         FROM 
//             students s
//         LEFT JOIN 
//             exam_registrations er ON er.email = s.email
//         WHERE 1=1
//     `;

//     // Add conditional filters based on provided query parameters
//     if (rollNumber) sql += ` AND s.roll_number LIKE '%${rollNumber}%'`;
//     if (branch) sql += ` AND s.branch LIKE '%${branch}%'`;
//     if (course) sql += ` AND er.course LIKE '%${course}%'`;
//     if (year) sql += ` AND s.year = ${db.escape(year)}`;
//     if (name) sql += ` AND s.name LIKE '%${name}%'`;

//     sql += `
//         GROUP BY 
//             s.id, s.name, s.roll_number, s.branch, s.year, er.carry_forward
//         ORDER BY 
//             registration_date DESC;
//     `;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching registered students:', err);
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });




















// app.get('/registered-students', (req, res) => {
//     const { rollNumber, branch, course, year, name } = req.query;

//     let sql = `
//         SELECT 
//             s.id,
//             s.name,
//             s.roll_number,
//             s.branch,
//             s.year,
//             GROUP_CONCAT(DISTINCT CASE 
//                 WHEN er.course NOT IN ('250', 'undefined', 'on') THEN er.course
//                 ELSE NULL 
//             END ORDER BY er.course SEPARATOR ', ') AS courses,
//             er.carry_forward,
//             MAX(er.registration_date) AS registration_date
//         FROM 
//             students s
//         LEFT JOIN 
//             exam_registrations er ON er.email = s.email
//         WHERE 1=1
//     `;

//     // Add conditional filters based on provided query parameters
//     if (rollNumber) sql += ` AND s.roll_number LIKE '%${rollNumber}%'`;
//     if (branch) sql += ` AND s.branch LIKE '%${branch}%'`;
//     if (course) sql += ` AND er.course LIKE '%${course}%'`;
//     if (year) sql += ` AND s.year = ${db.escape(year)}`;
//     if (name) sql += ` AND s.name LIKE '%${name}%'`;

//     sql += `
//         GROUP BY 
//             s.id, s.name, s.roll_number, s.branch, s.year, er.carry_forward
//         ORDER BY 
//             registration_date DESC;
//     `;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching registered students:', err);
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });










// // Retrieve registered students with unique course names, excluding unwanted values
// app.get('/registered-students', (req, res) => {
//     const sql = `
//     SELECT 
    
//     s.name,
//     s.roll_number,
//     s.branch,
//     s.year,
//     GROUP_CONCAT(DISTINCT er.course ORDER BY er.course SEPARATOR ', ') AS courses,
//     er.carry_forward,
//     er.registration_date
// FROM 
//     students s
// LEFT JOIN 
//     exam_registrations er ON er.email = s.email
// GROUP BY 
//      s.name, s.roll_number, s.branch, s.year, er.carry_forward, er.registration_date
// ORDER BY 
//     er.registration_date DESC;
      
//     `;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching registered students:', err);
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });

// app.get('/registered-students', (req, res) => {
//     const { rollNumber, branch, course, year, name } = req.query;

//     const sql = `
//     SELECT 
//         s.name,
//         s.roll_number,
//         s.branch,
//         s.year,
//         GROUP_CONCAT(DISTINCT er.course ORDER BY er.course SEPARATOR ', ') AS courses,
//         er.carry_forward,
//         er.registration_date
//     FROM 
//         students s
//     LEFT JOIN 
//         exam_registrations er ON er.email = s.email
//     GROUP BY 
//         s.name, s.roll_number, s.branch, s.year, er.carry_forward, er.registration_date
//     ORDER BY 
//         er.registration_date DESC;
//     `;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching registered students:', err);
//             return res.status(500).json({ message: 'Server error' });
//         }

//         // Apply filters only if query parameters are provided
//         let filteredResults = results;

//         if (rollNumber) {
//             filteredResults = filteredResults.filter(student =>
//                 student.roll_number === rollNumber
//             );
//         }
//         if (branch) {
//             filteredResults = filteredResults.filter(student =>
//                 student.branch && student.branch.toLowerCase().includes(branch.toLowerCase())
//             );
//         }
//         if (course) {
//             filteredResults = filteredResults.filter(student =>
//                 student.courses && student.courses.toLowerCase().includes(course.toLowerCase())
//             );
//         }
//         if (year) {
//             filteredResults = filteredResults.filter(student =>
//                 student.year === year
//             );
//         }
//         if (name) {
//             filteredResults = filteredResults.filter(student =>
//                 student.name && student.name.toLowerCase().includes(name.toLowerCase())
//             );
//         }

//         res.json(filteredResults);
//     });
// });











app.get('/registered-students', (req, res) => {
    const { rollNumber, branch, course, year, name } = req.query;

    const sql = `
    SELECT 
        s.name,
        s.roll_number,
        s.branch,
        s.year,
        GROUP_CONCAT(DISTINCT er.course ORDER BY er.course SEPARATOR ', ') AS courses,
        er.carry_forward,
        er.registration_date
    FROM 
        students s
    LEFT JOIN 
        exam_registrations er ON er.email = s.email
    GROUP BY 
        s.name, s.roll_number, s.branch, s.year, er.carry_forward, er.registration_date
    ORDER BY 
        er.registration_date DESC;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching registered students:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Apply filters only if query parameters are provided
        let filteredResults = results;

        if (rollNumber) {
            filteredResults = filteredResults.filter(student =>
                student.roll_number && student.roll_number.toLowerCase().includes(rollNumber.toLowerCase())
            );
        }
        if (branch) {
            filteredResults = filteredResults.filter(student =>
                student.branch && student.branch.toLowerCase().includes(branch.toLowerCase())
            );
        }
        if (course) {
            filteredResults = filteredResults.filter(student =>
                student.courses && student.courses.toLowerCase().includes(course.toLowerCase())
            );
        }
        if (year) {
            filteredResults = filteredResults.filter(student =>
                student.year && student.year.toString() === year.toString()
            );
        }
        if (name) {
            filteredResults = filteredResults.filter(student =>
                student.name && student.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        res.json(filteredResults);
    });
});



// Hall Ticket Generation
// app.get('/hall-ticket', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'hall-ticket (1).html'));
// });

// // Generate Hall Ticket
// app.post('/generate-hall-ticket', (req, res) => {
//     const { studentData, failedCourses } = req.body;

//     if (!studentData || !failedCourses) {
//         return res.status(400).json({ message: 'Missing data' });
//     }

//     fs.readFile(path.join(__dirname, 'public', 'hall-ticket (1).html'), 'utf8', (err, htmlTemplate) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error reading HTML template' });
//         }

//         let htmlContent = htmlTemplate
//         .replace('{{name}}', studentData.name)
//         .replace('{{roll_number}}', studentData.roll_number)
//         .replace('{{branch}}', studentData.branch)
//         .replace('{{failed_courses}}', failedCourses.map(course => `<li>${course}</li>`).join(''));
    
//     res.send(htmlContent);
//     });
// });


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query to check the user credentials
    const query = 'SELECT * FROM admin_gradsure WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.json({ success: false });
            return;
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.get('Dashboard_admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'next-page.html'));
});
 




//notices // Route to post a new notice
app.post('/notices', (req, res) => {
    const adminEmail = req.session.email;
    const { title, content } = req.body;

    if (!adminEmail) return res.status(403).json({ message: 'Unauthorized' });

    db.query(
        'INSERT INTO notices (admin_email, notice_text, title) VALUES (?, ?, ?)',
        [adminEmail, content, title],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error posting notice' });
            res.status(200).json({ message: 'Notice posted successfully' });
        }
    );
});

// Route to get all notices
app.get('/notices', (req, res) => {
    db.query('SELECT * FROM notices ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching notices' });
        res.json(results);
    });
});

// Route to edit a notice
app.put('/notices/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.query(
        'UPDATE notices SET title = ?, notice_text = ? WHERE id = ?',
        [title, content, id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error updating notice' });
            res.json({ message: 'Notice updated successfully' });
        }
    );
});

// Route to delete a notice
app.delete('/notices/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM notices WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error deleting notice' });
        res.json({ message: 'Notice deleted successfully' });
    });
});







//helpdesk
// Helper function to query database
// Create helpdesk queries table
const createQueriesTable = `
CREATE TABLE IF NOT EXISTS helpdesk_queries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_email VARCHAR(255),
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response TEXT,
    auto_replied BOOLEAN DEFAULT FALSE
);
`;

db.query(createQueriesTable, (err) => {
    if (err) throw err;
    console.log('Helpdesk queries table created or exists.');
});

// Route to submit a helpdesk query
// Route to submit a helpdesk query
app.post('/helpdesk-queries', (req, res) => {
    const { title, content } = req.body;
    const studentEmail = req.session.email; // Get student email from session

    if (!studentEmail) {
        return res.status(401).json({ message: 'Unauthorized: No email found in session' });
    }

    const query = 'INSERT INTO helpdesk_queries (student_email, title, content) VALUES (?, ?, ?)';
    db.query(query, [studentEmail, title, content], (err, result) => {
        if (err) {
            console.error('Error inserting query:', err);
            return res.status(500).json({ message: 'Error inserting query' });
        }

        // Automatically reply if query matches common questions
        const autoReplies = {
            'How to reset my password?': 'You can reset your password by going to the settings page and clicking on "Forgot Password".',
            'What are the exam dates?': 'The exam dates are posted on the notice board. Please check the schedule there.',
            'forgot password': 'To reset your password, click on "Forgot Password" on the login page and follow the instructions.',
            'login issue': 'If you are facing login issues, please check your credentials and make sure your account is activated. If the problem persists, contact the admin.',
            'reset password': 'To reset your password, go to the settings page after logging in and click on "Change Password".',
            'access denied': 'If you are seeing "Access Denied," make sure you are using the correct account credentials. Contact support if you still cannot access the page.',
            'how to contact support': 'You can contact support by submitting a ticket through the helpdesk system or by emailing support@example.com.'
        };
        const reply = autoReplies[title.toLowerCase()];
        if (reply) {
            // Update the query with an automatic reply
            const updateQuery = 'UPDATE helpdesk_queries SET response = ?, auto_replied = TRUE WHERE id = ?';
            db.query(updateQuery, [reply, result.insertId], (err) => {
                if (err) console.error('Error updating query with auto-reply:', err);
            });
        }
        res.status(201).json({ message: 'Query submitted successfully' });
    });
});

// Route to fetch student queries
app.get('/student-queries', (req, res) => {
    const query = 'SELECT * FROM helpdesk_queries ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching queries:', err);
            return res.status(500).json({ message: 'Error fetching queries' });
        }
        res.json(results);
    });
});
// Route to fetch all helpdesk queries for admin
app.get('/admin-queries', (req, res) => {
    const query = 'SELECT * FROM helpdesk_queries ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching queries:', err);
            return res.status(500).json({ message: 'Error fetching queries' });
        }
        res.json(results);
    });
});

// Route to respond to a query
app.put('/helpdesk-queries/:id', (req, res) => {
    const { response } = req.body;
    const query = 'UPDATE helpdesk_queries SET response = ?, auto_replied = FALSE WHERE id = ?';
    db.query(query, [response, req.params.id], (err) => {
        if (err) {
            console.error('Error updating query response:', err);
            return res.status(500).json({ message: 'Error updating query' });
        }
        res.json({ message: 'Response added successfully' });
    });
});














// Payment route to fetch roll number based on session email
// app.get('/get-student-roll-number', (req, res) => {
//     const email = req.session.email; // Get email from session
//     if (!email) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Fetch roll number from database using the email
//     const query = 'SELECT roll_number FROM students WHERE email = ?';
//     db.query(query, [email], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Database error' });
//         }

//         if (results.length > 0) {
//             res.json({ roll_number: results[0].roll_number });
//         } else {
//             res.status(404).json({ message: 'Student not found' });
//         }
//     });
// });


// Endpoint to validate roll number based on logged-in email
// app.post('/validate-roll-number', (req, res) => {
//     const email = req.session.email; // Get the email from the session
//     const { enteredRollNumber } = req.body; // Get the roll number entered by the student

//     if (!email) {
//         return res.status(401).json({ message: 'Unauthorized: No email in session' });
//     }

//     // Fetch the roll number from the database for the logged-in student's email
//     const query = 'SELECT roll_number FROM students WHERE email = ?';
//     db.query(query, [email], (err, results) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }

//         if (results.length > 0) {
//             const storedRollNumber = results[0].roll_number;

//             // Check if entered roll number matches the stored roll number
//             if (enteredRollNumber === storedRollNumber) {
//                 res.json({ isValid: true }); // Proceed with payment
//             } else {
//                 res.json({ isValid: false, message: 'Invalid roll number. Please try again.' });
//             }
//         } else {
//             res.status(404).json({ message: 'Student not found' });
//         }
//     });
// });

// POST route to add email and password to users1 table
app.post('/users1', (req, res) => {
    const { email, password } = req.body;
    const query = 'INSERT INTO users1 (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert user data' });
      }
      res.status(200).json({ message: 'User added successfully' });
    });
  });

// Payment submission route for student
app.post('/api/payments', (req, res) => {
    const email = req.session.email; // Use email from session
    const { cost } = req.body; // Only need to pass the cost from the frontend

    if (!email || !cost) {
        return res.status(400).json({ message: 'Invalid payment data' });
    }

    // Fetch roll number from 'students' table and get the current date and time
    const query = 'SELECT roll_number FROM students WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const roll_number = results[0].roll_number;
        const payment_date = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date and time in 'YYYY-MM-DD HH:MM:SS' format

        // Insert payment information into the 'payments' table
        const insertQuery = 'INSERT INTO payments (email, roll_number, cost, payment_date) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [email, roll_number, cost, payment_date], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            res.status(201).json({ message: 'Payment information submitted successfully' });
        });
    });
});

// Payment retrieval route for admin to display all payments
app.get('/api/payments', (req, res) => {
    const query = 'SELECT email, roll_number, cost, payment_date FROM payments';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results); // Return the payment records as JSON
    });
});




  



  


// Endpoint to add a new student
// app.post('/admin/add-student', (req, res) => {
//     const studentData = {
//       name: req.body.name,
//       email: req.body.email,
//       course: req.body.course,
//       year: req.body.year,
//       roll_number: req.body.roll_number,
//       course_code: req.body.course_code,
//       branch: req.body.branch,
//       carry_forward: req.body.carry_forward,
//     };
  
//     const studentDetails = {
//       email: req.body.email,
//       house_address: req.body.house_address,
//       graduation_year: req.body.graduation_year,
//       academic_year: req.body.academic_year,
//       date_of_birth: req.body.date_of_birth,
//       contact_number: req.body.contact_number,
//       gender: req.body.gender,
//     };
  
//     const userAccount = {
//       email: req.body.email,
//       password: req.body.password,
//     };
  
//     // Insert into students table
//     db.query('INSERT INTO students SET ?', studentData, (err, result) => {
//       if (err) {
//         console.error('Error inserting into students table:', err);
//         return res.status(500).json({ message: 'Failed to add student to students table.', error: err });
//       }
  
//       // Insert into student_details table
//       db.query('INSERT INTO student_details SET ?', studentDetails, (err, result) => {
//         if (err) {
//           console.error('Error inserting into student_details table:', err);
//           return res.status(500).json({ message: 'Failed to add student to student_details table.', error: err });
//         }
  
//         // Insert into users1 table
//         db.query('INSERT INTO users1 SET ?', userAccount, (err, result) => {
//           if (err) {
//             console.error('Error inserting into users1 table:', err);
//             return res.status(500).json({ message: 'Failed to add student to users1 table.', error: err });
//           }
  
//           res.status(200).json({ message: 'Student added successfully.' });
//         });
//       });
//     });
//   });
  
  




// app.post('/admin/add-student', (req, res) => {
//     const studentData = {
//         name: req.body.name,
//         email: req.body.email,
//         year: req.body.year,
//         roll_number: req.body.roll_number,
//         branch: req.body.branch,
//         carry_forward: req.body.carry_forward,
//     };

//     const studentDetails = {
//         email: req.body.email,
//         house_address: req.body.house_address,
//         graduation_year: req.body.graduation_year,
//         academic_year: req.body.academic_year,
//         date_of_birth: req.body.date_of_birth,
//         contact_number: req.body.contact_number,
//         gender: req.body.gender,
//     };

//     const userAccount = {
//         email: req.body.email,
//         password: req.body.password,
//     };

//     // Insert into users1 table first
//     db.query('INSERT INTO users1 SET ?', userAccount, (err, result) => {
//         if (err) {
//             console.error('Error inserting into users1 table:', err);
//             return res.status(500).json({ message: 'Failed to add user to users1 table.', error: err });
//         }

//         // Insert into student_details table
//         db.query('INSERT INTO student_details SET ?', studentDetails, (err, result) => {
//             if (err) {
//                 console.error('Error inserting into student_details table:', err);
//                 return res.status(500).json({ message: 'Failed to add student details to student_details table.', error: err });
//             }

//             // Insert into students table for each course
//             const courses = req.body.course || [];
//             const courseCodes = req.body.course_code || [];
//             const insertQueries = [];

//             for (let i = 0; i < courses.length; i++) {
//                 const studentCourseData = {
//                     name: studentData.name,
//                     email: studentData.email,
//                     course: courses[i],
//                     year: studentData.year,
//                     roll_number: studentData.roll_number,
//                     course_code: courseCodes[i],
//                     branch: studentData.branch,
//                     carry_forward: studentData.carry_forward,
//                 };

//                 insertQueries.push(new Promise((resolve, reject) => {
//                     db.query('INSERT INTO students SET ?', studentCourseData, (err, result) => {
//                         if (err) {
//                             reject('Error inserting course data into students table');
//                         } else {
//                             resolve(result);
//                         }
//                     });
//                 }));
//             }

//             // Wait for all course inserts to complete
//             Promise.all(insertQueries)
//                 .then(() => res.status(200).json({ message: 'Student added successfully.' }))
//                 .catch((err) => {
//                     console.error(err);
//                     res.status(500).json({ message: 'Error adding student with courses.' });
//                 });
//         });
//     });
// });







// Fetch all students
app.get("/students", (req, res) => {
    const query = `
      SELECT s.name, s.email, s.course, s.year, s.roll_number, s.course_code, s.branch, s.carry_forward, 
             d.house_address, d.graduation_year, d.academic_year, d.date_of_birth, d.contact_number, d.gender
      FROM students s
      LEFT JOIN student_details d ON s.email = d.email;
    `;
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Add a student
  app.post("/students", (req, res) => {
    const { name, email, course, year, roll_number, course_code, branch, carry_forward, house_address, graduation_year, academic_year, date_of_birth, contact_number, gender } = req.body;
  
    const studentQuery = `INSERT INTO students (name, email, course, year, roll_number, course_code, branch, carry_forward) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const detailsQuery = `INSERT INTO student_details (email, house_address, graduation_year, academic_year, date_of_birth, contact_number, gender) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(studentQuery, [name, email, course, year, roll_number, course_code, branch, carry_forward], (err) => {
      if (err) return res.status(500).send("Error adding student!");
      db.query(detailsQuery, [email, house_address, graduation_year, academic_year, date_of_birth, contact_number, gender], (err) => {
        if (err) return res.status(500).send("Error adding student details!");
        res.send("Student added successfully!");
      });
    });
  });
  
  // Update a student
  app.put("/students/:email", (req, res) => {
    const email = req.params.email;
    const { name, course, year, roll_number, course_code, branch, carry_forward, house_address, graduation_year, academic_year, date_of_birth, contact_number, gender } = req.body;
  
    const studentQuery = `UPDATE students SET name=?, course=?, year=?, roll_number=?, course_code=?, branch=?, carry_forward=? WHERE email=?`;
    const detailsQuery = `UPDATE student_details SET house_address=?, graduation_year=?, academic_year=?, date_of_birth=?, contact_number=?, gender=? WHERE email=?`;
  
    db.query(studentQuery, [name, course, year, roll_number, course_code, branch, carry_forward, email], (err) => {
      if (err) return res.status(500).send("Error updating student!");
      db.query(detailsQuery, [house_address, graduation_year, academic_year, date_of_birth, contact_number, gender, email], (err) => {
        if (err) return res.status(500).send("Error updating student details!");
        res.send("Student updated successfully!");
      });
    });
  });
  
  // Delete a student
  app.delete("/students/:email", (req, res) => {
    const email = req.params.email;
  
    const deleteDetailsQuery = `DELETE FROM student_details WHERE email=?`;
    const deleteStudentQuery = `DELETE FROM students WHERE email=?`;
  
    db.query(deleteDetailsQuery, [email], (err) => {
      if (err) return res.status(500).send("Error deleting student details!");
      db.query(deleteStudentQuery, [email], (err) => {
        if (err) return res.status(500).send("Error deleting student!");
        res.send("Student deleted successfully!");
      });
    });
  });

///
app.get('/api/students/:email', (req, res) => {
    const email = req.params.email;
    const query = 'SELECT * FROM students WHERE email = ?';

    db.query(query, [email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching student data');
        } else {
            res.json(result[0]); // Send the first result as JSON
        }
    });
});
app.put('/api/students/:email', (req, res) => {
    const email = req.params.email;
    const { name, roll_number, branch, course, year } = req.body;
    const query = `
        UPDATE students 
        SET name = ?, roll_number = ?, branch = ?, course = ?, year = ?
        WHERE email = ?
    `;

    db.query(query, [name, roll_number, branch, course, year, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating student data');
        } else {
            res.send('Student updated successfully');
        }
    });
});


//payment by razorpay
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: 'rzp_test_yebQCZ4L7mdvsi', // Replace with your test key_id
    key_secret: 'rPNFxuowUKWv4nd3x63NME4z', // Replace with your test key_secret
  });
  
  // Mock order creation endpoint
  app.post('/create-order', async (req, res) => {
    const { amount } = req.body;
  
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }
  
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.status(201).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ message: 'Failed to create order' });
    }
  });
  


//   app.get('/payments', async (req, res) => {
//     try {
//         const payments = await razorpay.payments.all({ count: 100 });
//         res.json(payments.items.map(payment => ({
//             name: payment.notes.name || 'N/A',
//             email: payment.email || 'N/A',
//             amount: payment.amount / 100, // Convert paise to INR
//             method: payment.method || 'N/A'
//         })));
//     } catch (error) {
//         res.status(500).send('Error fetching payment details');
//     }
// });
// Route to fetch all payments






// app.get('/payments', (req, res) => {
//     const sql = `
//       SELECT  s.name, p.email, p.amount, p.payment_method
//       FROM payments_new p
//       JOIN students s ON s.email = p.email
//       ORDER BY p.createdAt DESC
//     `;
  
//     db.query(sql, (err, results) => {
//       if (err) {
//         console.error('Error fetching payments:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }
  
//       res.json(results);
//     });
//   });
  
// // Route to record payment after Razorpay payment success
// app.post('/record-payment', (req, res) => {
//     const {  student_email, amount, payment_method } = req.body;
  
//     // Validate the payment details (optional)
//     if ( !student_emailemail || !amount || !payment_method) {
//       return res.status(400).json({ success: false, message: 'Missing payment details' });
//     }
  
//     // SQL query to insert the payment details into the 'payments' table
//     const query = `
//       INSERT INTO payments_new ( email, amount, payment_method)
//       VALUES (?, ?, ?, ?)
//     `;
  
//     // Use your DB query method here
//     db.query(query, [ stduent_email, amount, payment_method], (err, result) => {
//       if (err) {
//         console.error('Error recording payment:', err);
//         return res.status(500).json({ success: false, message: 'Failed to record payment' });
//       }
  
//       res.json({ success: true, message: 'Payment recorded successfully' });
//     });
//   });
  


//   // API to fetch payment data
// app.get('/admin/payments', (req, res) => {
//     const sql = 'SELECT student_email, amount, payment_date FROM payments_new'; // Adjust table/column names as needed
//     db.query(sql, (err, results) => {
//       if (err) {
//         console.error('Error fetching data:', err);
//         return res.status(500).json({ error: 'Database query failed' });
//       }
//       res.json(results); // Send payment data as JSON
//     });
//   });

// // new razorpay 
// // Endpoint to save payment details after successful payment
// app.post('/save-payment', (req, res) => {
//     const { student_email, amount, payment_date } = req.body;
  
//     if (!student_email  || !amount) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }
  
//     const sql = 'INSERT INTO payments (email, amount, createdAt) VALUES (?, ?, ?, ?)';
//     db.query(sql, [email, amount, payment_date || new Date()], (err, result) => {
//       if (err) {
//         console.error('Error inserting payment:', err);
//         return res.status(500).json({ error: 'Database error' });
//       }
//       res.json({ message: 'Payment saved successfully', id: result.insertId });
//     });
//   });







// Endpoint to fetch payment records
app.get('/payments', (req, res) => {
    const sql = `
      SELECT s.name, p.email, p.amount, p.createdAt ,'Payment Done'  AS payment_status
      FROM payments_new p
      JOIN students s ON s.email = p.email
      ORDER BY p.createdAt DESC
    `;
  
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching payments:', err);
            return res.status(500).json({ message: 'Server error' });
        }
  
        res.json(results);
    });
});
// app.post('/save-payment', (req, res) => {
//     const { orderId, email, name, amount, currency, payment_method } = req.body;
  
//     const sql = `
//       INSERT INTO payments_new (orderId, email, name, amount, currency, payment_method)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
  
//     db.query(sql, [orderId, email, name, amount, currency, payment_method], (err, results) => {
//       if (err) {
//         console.error('Error saving payment:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }
//       res.status(201).json({ message: 'Payment saved successfully' });
//     });
//   });
  



//doing by succcess page 
// API to save payment data
app.post('/save-payment', (req, res) => {
    const { studentName,email, amount, paymentDate,payment_status } = req.body;
    const query = 'INSERT INTO abc_payment (student_name,email, amount, payment_date,payment_status) VALUES (?,?, ?, NOW(),"paid")';
    db.query(query, [studentName,email, amount, paymentDate], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Payment saved successfully!' });
    });
});

// API to fetch payment data
app.get('/fetch-payments', (req, res) => {
    const query = 'SELECT * FROM abc_payment ORDER BY payment_date DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
          }
        res.json(results);
    });
});
// app.get('/fetch-payments', (req, res) => {
//     const query = 'SELECT student_name, email, amount, payment_date FROM abc_payment ORDER BY payment_date DESC';
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error fetching payment data:', err);
//         res.status(500).send('Error fetching payment data');
//       } else {
//         // Format payment_date to include time
//         const formattedResults = results.map(payment => ({
//           ...payment,
//           payment_date: new Date(payment.payment_date).toLocaleString('en-IN', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//             hour12: true
//           })
//         }));
//         res.json(formattedResults);
//       }
//     });
//   });
  

app.get('/get-email', (req, res) => {
    if (req.session && req.session.email) {
        res.json({ email: req.session.email });
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
});


 app.listen(port, () => {
    console.log('Server running on http://localhost:${port}');
 });
