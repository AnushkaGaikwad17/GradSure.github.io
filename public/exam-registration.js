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



// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch student data and populate the form
//     fetch('/exam-registration')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;
                
//                 // Populate failed courses with checkboxes
//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = course;
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching student data:', error);
//             alert('Error fetching student data. Please try again later.');
//         });
//     document.querySelector('#register-exam').addEventListener('click', () => {
//         const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
//         const carryForwardElement = document.querySelector('input[name="carry-forward"]:checked');
        
//         if (!carryForwardElement) {
//             alert('Please select an option for carry forward.');
//             return;
//         }
//         const carryForward = carryForwardElement.value;
//         fetch('/register-exam', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ selectedCourses, carryForward }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 alert('Exam registration successful!');
//                 // Optionally, you can redirect or update the UI here
//                  // Redirect to hall ticket page or update UI as needed
//             window.location.href = '/hall-ticket';
//             }
//         })
//         .catch(error => {
//             console.error('Error registering exam:', error);
//             alert('Error registering exam. Please try again later.');
//         });
//     });
// });












// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch student data and populate the form
//     fetch('/exam-registration')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;
                
//                 // Populate failed courses with checkboxes
//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = course;
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching student data:', error);
//             alert('Error fetching student data. Please try again later.');
//         });
//     document.querySelector('#register-exam').addEventListener('click', () => {
//         const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
//         const carryForwardElement = document.querySelector('input[name="carry-forward"]:checked');
        
//         if (!carryForwardElement) {
//             alert('Please select an option for carry forward.');
//             return;
//         }
//         const carryForward = carryForwardElement.value;
//         fetch('/register-exam', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ selectedCourses, carryForward }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 alert('Exam registration successful!');
//                 // Optionally, you can redirect or update the UI here
//                  // Redirect to hall ticket page or update UI as needed
//             window.location.href = '/hall-ticket';
//             }
//         })
//         .catch(error => {
//             console.error('Error registering exam:', error);
//             alert('Error registering exam. Please try again later.');
//         });
//     });
// });
















// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/exam-registration')
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;
                
//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

//                 // Populate failed courses with checkboxes
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = course;
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });
//             }
//         });

//     document.querySelector('#register-exam').addEventListener('click', () => {
//         const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
//         const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

//         fetch('/register-exam', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ selectedCourses, carryForward }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             }
//             else{
//                 alert('Exam registered successfully.');
//             }
//         });
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/exam-registration')
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;
                
//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

//                 // Populate failed courses with checkboxes
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = 250; // Each course adds Rs 250
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });

//                 // Add total cost display
//                 const totalCostLabel = document.createElement('p');
//                 totalCostLabel.innerHTML = 'Total Cost: Rs <span id="total-cost">0</span>';
//                 failedCoursesDiv.appendChild(totalCostLabel);

//                 // Add event listeners for cost calculation
//                 const courseCheckboxes = document.querySelectorAll('input[name="failed-courses"]');
                
//                 function calculateTotalCost() {
//                     let totalCost = 0;

//                     // Sum the cost of selected courses
//                     courseCheckboxes.forEach(checkbox => {
//                         if (checkbox.checked) {
//                             totalCost += parseInt(checkbox.value);
//                         }
//                     });

//                     // Update the total cost display
//                     document.querySelector('#total-cost').textContent = totalCost;
//                 }

//                 // Attach the calculateTotalCost function to checkbox changes
//                 courseCheckboxes.forEach(checkbox => {
//                     checkbox.addEventListener('change', calculateTotalCost);
//                 });
//             }
//         });

//     document.querySelector('#register-exam').addEventListener('click', () => {
//         const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
//         const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

//         fetch('/register-exam', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ selectedCourses, carryForward }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 alert('Exam registered successfully.');
//             }
//         });
//     });

// });

















































// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/exam-registration')
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;
                
//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

//                 // Populate failed courses with checkboxes
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = 250; // Each course adds Rs 250
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });

//                 // Add total cost display
//                 const totalCostLabel = document.createElement('p');
//                 totalCostLabel.innerHTML = 'Total Cost: Rs <span id="total-cost">0</span>';
//                 failedCoursesDiv.appendChild(totalCostLabel);

//                 // Add event listeners for cost calculation
//                 const courseCheckboxes = document.querySelectorAll('input[name="failed-courses"]');
                
//                 function calculateTotalCost() {
//                     let totalCost = 0;

//                     // Sum the cost of selected courses
//                     courseCheckboxes.forEach(checkbox => {
//                         if (checkbox.checked) {
//                             totalCost += parseInt(checkbox.value);
//                         }
//                     });

//                     // Update the total cost display
//                     document.querySelector('#total-cost').textContent = totalCost;
//                 }

//                 // Attach the calculateTotalCost function to checkbox changes
//                 courseCheckboxes.forEach(checkbox => {
//                     checkbox.addEventListener('change', calculateTotalCost);
//                 });

//                 // Register Exam Button
//                 document.querySelector('#register-exam').addEventListener('click', () => {
//                     const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
//                     const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

//                     fetch('/register-exam', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ selectedCourses, carryForward }),
//                     })
//                     .then(response => response.json())
//                     .then(data => {
//                         if (data.message) {
//                             alert(data.message);
//                         } else {
//                             alert('are you sure to go for final registration');
//                             // alert('Exam registered successfully.');
//                         }
//                     });
//                 });

//                 // Proceed to Payment Button
//                 document.querySelector('#next-page').addEventListener('click', () => {
//                     const totalCost = document.querySelector('#total-cost').textContent;
//                     window.location.href = `payment.html?cost=${totalCost}`;
//                 });
//             }
//         });
// });






























// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/exam-registration')
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;
                
//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

//                 // Populate failed courses with checkboxes
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     // checkbox.value = course.name; // Pass the course name here
//                 //  document.getElementById("failed-courses").appendChild(checkbox);
//                     checkbox.value = 250; // Each course adds Rs 250
//                     // checkbox.setAttribute('data-cost', 250); 
//                     // checkbox.setAttribute('failed-courses', 250); // Storing cost separately as data attribute
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });

//                 // Add total cost display
//                 const totalCostLabel = document.createElement('p');
//                 totalCostLabel.innerHTML = 'Total Cost: Rs <span id="total-cost">0</span>';
//                 failedCoursesDiv.appendChild(totalCostLabel);

//                 // Add event listeners for cost calculation
//                 const courseCheckboxes = document.querySelectorAll('input[name="failed-courses"]');
                
//                 function calculateTotalCost() {
//                     let totalCost = 0;

//                     // Sum the cost of selected courses
//                     courseCheckboxes.forEach(checkbox => {
//                         if (checkbox.checked) {
//                             // totalCost += parseInt(checkbox.value);
//                             totalCost += parseInt(checkbox.getAttribute('data-cost'));
//                         }
//                     });

//                     // Update the total cost display
//                     document.querySelector('#total-cost').textContent = totalCost;
//                 }

//                 // Attach the calculateTotalCost function to checkbox changes
//                 courseCheckboxes.forEach(checkbox => {
//                     checkbox.addEventListener('change', calculateTotalCost);
//                 });

//                 // Register Exam Button with Confirmation Alert
//                 // document.querySelector('#register-exam').addEventListener('click', () => {
//                 //     const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
//                 //     const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

//                 //     // Show a confirmation popup before proceeding
//                 //     const confirmation = confirm("Are you sure you want to register for these courses?");
                    
//                 //     if (confirmation) {
//                 //         // If the user confirms, proceed with registration
//                 //         fetch('/register-exam', {
//                 //             method: 'POST',
//                 //             headers: {
//                 //                 'Content-Type': 'application/json',
//                 //             },
//                 //             body: JSON.stringify({ selectedCourses, carryForward }),
//                 //         })
//                 //         .then(response => response.json())
//                 //         .then(data => {
//                 //             if (data.message) {
//                 //                 alert(data.message); // Server message
//                 //             } else {
//                 //                 alert('Exam registered successfully.'); // Success message
//                 //             }
//                 //         })
//                 //         .catch(error => {
//                 //             alert('An error occurred during registration.');
//                 //         });
//                 //     }
//                 // });






//                 document.querySelector('#register-exam').addEventListener('click', () => {
//                     // Get the selected course names from the checkboxes
//                     const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input[type="checkbox"]:checked')).map(input => input.value);
//                     const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;
                
//                     // Calculate total cost based on selected courses (₹250 each)
//                     const totalCost = selectedCourses.length * 250;
                
//                     // Show a confirmation popup with total cost
//                     const confirmationMessage = `You have selected ${selectedCourses.length} course(s) for a total cost of ₹${totalCost}. Are you sure you want to register for these courses?`;
//                     const confirmation = confirm(confirmationMessage);
                    
//                     if (confirmation) {
//                         // If the user confirms, proceed with registration
//                         fetch('/register-exam', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({ selectedCourses, carryForward }), // Send the selected courses and carry forward option
//                         })
//                         .then(response => response.json())
//                         .then(data => {
//                             if (data.message) {
//                                 alert(data.message); // Alert server message if exists
//                             } else {
//                                 alert('Exam registered successfully.'); // Success message
//                             }
//                         })
//                         .catch(error => {
//                             alert('An error occurred during registration: ' + error.message); // Show error message
//                         });
//                     }
//                 });
                











//                 // Proceed to Payment Button with Confirmation Alert
//                 document.querySelector('#next-page').addEventListener('click', () => {
//                     const totalCost = document.querySelector('#total-cost').textContent;
                    
//                     // Show a confirmation popup before proceeding to payment
//                     const paymentConfirmation = confirm(`The total cost is Rs ${totalCost}. Are you sure you want to proceed to payment?`);

//                     if (paymentConfirmation) {
//                         // Redirect to payment page if the user confirms
//                         window.location.href = `payment.html?cost=${totalCost}`;
//                     }
//                 });
//             }
//         });
// });
























// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/exam-registration')
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;
                
//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

//                 // Populate failed courses with checkboxes
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = 250; // Each course adds Rs 250
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });

//                 // Add total cost display
//                 const totalCostLabel = document.createElement('p');
//                 totalCostLabel.innerHTML = 'Total Cost: Rs <span id="total-cost">0</span>';
//                 failedCoursesDiv.appendChild(totalCostLabel);

//                 // Add event listeners for cost calculation
//                 const courseCheckboxes = document.querySelectorAll('input[name="failed-courses"]');
                
//                 function calculateTotalCost() {
//                     let totalCost = 0;

//                     // Sum the cost of selected courses
//                     courseCheckboxes.forEach(checkbox => {
//                         if (checkbox.checked) {
//                             totalCost += parseInt(checkbox.value);
//                         }
//                     });

//                     // Update the total cost display
//                     document.querySelector('#total-cost').textContent = totalCost;
//                 }

//                 // Attach the calculateTotalCost function to checkbox changes
//                 courseCheckboxes.forEach(checkbox => {
//                     checkbox.addEventListener('change', calculateTotalCost);
//                 });

//                 // Register Exam Button with Confirmation Alert
//                 document.querySelector('#register-exam').addEventListener('click', () => {
//                     const selectedCourses = Array.from(document.querySelectorAll('#failed-courses input:checked')).map(input => input.value);
//                     const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

//                     // Show a confirmation popup before proceeding
//                     const confirmation = confirm("Are you sure you want to register for these courses?");
                    
//                     if (confirmation) {
//                         // If the user confirms, proceed with registration
//                         fetch('/register-exam', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({ selectedCourses, carryForward }),
//                         })
//                         .then(response => response.json())
//                         .then(data => {
//                             if (data.message) {
//                                 alert(data.message); // Server message
//                             } else {
//                                 alert('Exam registered successfully.'); // Success message
//                             }
//                         })
//                         .catch(error => {
//                             alert('An error occurred during registration.');
//                         });
//                     }
//                 });

//                 // Proceed to Payment Button with Confirmation Alert
//                 document.querySelector('#next-page').addEventListener('click', () => {
//                     const totalCost = document.querySelector('#total-cost').textContent;
                    
//                     // Show a confirmation popup before proceeding to payment
//                     const paymentConfirmation = confirm(`The total cost is Rs ${totalCost}. Are you sure you want to proceed to payment?`);

//                     if (paymentConfirmation) {
//                         // Redirect to payment page if the user confirms
//                         window.location.href = `payment.html?cost=${totalCost}`;
//                     }
//                 });
//             }
//         });
// });





















// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/exam-registration')
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;

//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

//                 // Populate failed courses with checkboxes
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = course; // Store course name in the value
//                     checkbox.setAttribute('data-cost', 250); // Store cost in a data attribute
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });

//                 // Add total cost display
//                 const totalCostLabel = document.createElement('p');
//                 totalCostLabel.innerHTML = 'Total Cost: Rs <span id="total-cost">0</span>';
//                 failedCoursesDiv.appendChild(totalCostLabel);

//                 // Add event listeners for cost calculation
//                 const courseCheckboxes = document.querySelectorAll('input[name="failed-courses"]');

//                 function calculateTotalCost() {
//                     let totalCost = 0;
//                     const selectedCourses = [];

//                     // Sum the cost of selected courses
//                     courseCheckboxes.forEach(checkbox => {
//                         if (checkbox.checked) {
//                             totalCost += parseInt(checkbox.getAttribute('data-cost'));
//                             selectedCourses.push(checkbox.value); // Store the course name
//                         }
//                     });

//                     // Update the total cost display
//                     document.querySelector('#total-cost').textContent = totalCost;
//                     return selectedCourses; // Return the selected course names
//                 }

//                 // Attach the calculateTotalCost function to checkbox changes
//                 courseCheckboxes.forEach(checkbox => {
//                     checkbox.addEventListener('change', calculateTotalCost);
//                 });

//                 // Register Exam Button with Confirmation Alert
//                 document.querySelector('#register-exam').addEventListener('click', () => {
//                     const selectedCourses = calculateTotalCost(); // Get selected course names
//                     const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

//                     // Show a confirmation popup before proceeding
//                     const confirmation = confirm("Are you sure you want to register for these courses?");
                    
//                     if (confirmation) {
//                         // If the user confirms, proceed with registration
//                         fetch('/register-exam', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({ selectedCourses, carryForward }),
//                         })
//                         .then(response => response.json())
//                         .then(data => {
//                             if (data.message) {
//                                 alert(data.message); // Server message
//                             } else {
//                                 alert('Exam registered successfully.'); // Success message
//                             }
//                         })
//                         .catch(error => {
//                             alert('An error occurred during registration.');
//                         });
//                     }
//                 });

//                 // Proceed to Payment Button with Confirmation Alert
//                 document.querySelector('#next-page').addEventListener('click', () => {
//                     const totalCost = document.querySelector('#total-cost').textContent;
                    
//                     // Show a confirmation popup before proceeding to payment
//                     const paymentConfirmation = confirm(`The total cost is Rs ${totalCost}. Are you sure you want to proceed to payment?`);

//                     if (paymentConfirmation) {
//                         // Redirect to payment page if the user confirms
//                         window.location.href = `payment.html?cost=${totalCost}`;
//                     }
//                 });
//             }
//         });
// });
















































// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/exam-registration')
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 alert(data.message);
//             } else {
//                 document.querySelector('#student-name').textContent = data.student.name;
//                 document.querySelector('#roll-number').textContent = data.student.roll_number;
//                 document.querySelector('#branch').textContent = data.student.branch;

//                 const failedCoursesDiv = document.querySelector('#failed-courses');
//                 failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

//                 // Populate failed courses with checkboxes
//                 data.failedCourses.forEach(course => {
//                     const label = document.createElement('label');
//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.name = 'failed-courses';
//                     checkbox.value = course; // Store course name in the value
//                     checkbox.setAttribute('data-cost', 250); // Store cost in a data attribute
//                     label.appendChild(checkbox);
//                     label.appendChild(document.createTextNode(` ${course}`));
//                     failedCoursesDiv.appendChild(label);
//                     failedCoursesDiv.appendChild(document.createElement('br'));
//                 });

//                 // Add total cost display
//                 const totalCostLabel = document.createElement('p');
//                 totalCostLabel.innerHTML = 'Total Cost: Rs <span id="total-cost">0</span>';
//                 failedCoursesDiv.appendChild(totalCostLabel);

//                 // Add event listeners for cost calculation
//                 const courseCheckboxes = document.querySelectorAll('input[name="failed-courses"]');

//                 function calculateTotalCost() {
//                     let totalCost = 0;
//                     const selectedCourses = [];

//                     // Sum the cost of selected courses
//                     courseCheckboxes.forEach(checkbox => {
//                         if (checkbox.checked) {
//                             totalCost += parseInt(checkbox.getAttribute('data-cost'));
//                             selectedCourses.push(checkbox.value); // Store the course name
//                         }
//                     });

//                     // Update the total cost display
//                     document.querySelector('#total-cost').textContent = totalCost;
//                     return selectedCourses; // Return the selected course names
//                 }

//                 // Attach the calculateTotalCost function to checkbox changes
//                 courseCheckboxes.forEach(checkbox => {
//                     checkbox.addEventListener('change', calculateTotalCost);
//                 });

//                 // Register Exam Button with Confirmation Alert
//                 document.querySelector('#register-exam').addEventListener('click', () => {
//                     const selectedCourses = calculateTotalCost(); // Get selected course names
//                     const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

//                     // Show a confirmation popup before proceeding
//                     const confirmation = confirm("Are you sure you want to register for these courses?");
                    
//                     if (confirmation) {
//                         // If the user confirms, proceed with registration
//                         fetch('/register-exam', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({ selectedCourses, carryForward }),
//                         })
//                         .then(response => response.json())
//                         .then(data => {
//                             if (data.message) {
//                                 alert(data.message); // Server message
//                             } else {
//                                 alert('Exam registered successfully.'); // Success message
//                             }
//                         })
//                         .catch(error => {
//                             alert('An error occurred during registration.');
//                         });
//                     }
//                 });

//                 // Proceed to Payment Button with Confirmation Alert
//                 document.querySelector('#next-page').addEventListener('click', () => {
//                     const totalCost = document.querySelector('#total-cost').textContent;
                    
//                     // Show a confirmation popup before proceeding to payment
//                     const paymentConfirmation = confirm(`The total cost is Rs ${totalCost}. Are you sure you want to proceed to payment?`);

//                     if (paymentConfirmation) {
//                         // Redirect to payment page if the user confirms
//                         window.location.href = `payment.html?cost=${totalCost}`;
//                     }
//                 });
//             }
//         });
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

                const failedCoursesDiv = document.querySelector('#failed-courses');
                failedCoursesDiv.innerHTML = ''; // Clear existing checkboxes

                // Populate failed courses with checkboxes
                data.failedCourses.forEach(course => {
                    const label = document.createElement('label');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'failed-courses';
                    checkbox.value = course; // Store course name in the value
                    checkbox.setAttribute('data-cost', 250); // Store cost in a data attribute
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(` ${course}`));
                    failedCoursesDiv.appendChild(label);
                    failedCoursesDiv.appendChild(document.createElement('br'));
                });

                // Add total cost display
                const totalCostLabel = document.createElement('p');
                totalCostLabel.innerHTML = 'Total Cost: Rs <span id="total-cost">0</span>';
                failedCoursesDiv.appendChild(totalCostLabel);

                // Add event listeners for cost calculation
                const courseCheckboxes = document.querySelectorAll('input[name="failed-courses"]');

                function calculateTotalCost() {
                    let totalCost = 0;
                    const selectedCourses = [];

                    // Sum the cost of selected courses
                    courseCheckboxes.forEach(checkbox => {
                        if (checkbox.checked) {
                            totalCost += parseInt(checkbox.getAttribute('data-cost'));
                            selectedCourses.push(checkbox.value); // Store the course name
                        }
                    });

                    // Update the total cost display
                    document.querySelector('#total-cost').textContent = totalCost;
                    return selectedCourses; // Return the selected course names
                }

                // Attach the calculateTotalCost function to checkbox changes
                courseCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', calculateTotalCost);
                });

                // Register Exam Button with Confirmation Alert
                document.querySelector('#register-exam').addEventListener('click', () => {
                    const selectedCourses = calculateTotalCost(); // Get selected course names
                    const carryForward = document.querySelector('input[name="carry-forward"]:checked').value;

                    // Show a confirmation popup before proceeding
                    const confirmation = confirm("Are you sure you want to register for these courses?");
                    
                    if (confirmation) {
                        // If the user confirms, proceed with registration
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
                                alert(data.message); // Server message
                            } else {
                                alert('Exam registered successfully.'); // Success message
                            }
                        })
                        .catch(error => {
                            alert('An error occurred during registration.');
                        });
                    }
                });

                // Proceed to Payment Button with Confirmation Alert
                document.querySelector('#next-page').addEventListener('click', () => {
                    const totalCost = document.querySelector('#total-cost').textContent;
                    const studentName = document.querySelector('#student-name').textContent; 
                    // Show a confirmation popup before proceeding to payment
                    const paymentConfirmation = confirm(`The total cost is Rs ${totalCost} and you have registered for ${totalCost/250} course(s). Are you sure you want to proceed to payment?`);

                    if (paymentConfirmation) {
                        // Save total cost and student name to localStorage
        localStorage.setItem('totalAmount', totalCost);
        localStorage.setItem('studentName', studentName);
        
        // Redirect to success.html
        // window.location.href = 'success.html';
                        window.location.href = `payment.html?cost=${totalCost}`;
                    }
                });
            }
        });
});
