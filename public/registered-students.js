// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/registered-students')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); // Log data to verify its content

//             const tableBody = document.querySelector('#students-table tbody');
//             tableBody.innerHTML = ''; // Clear existing rows

//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${student.id || 'N/A'}</td>
//                     <td>${student.name || 'N/A'}</td>
//                     <td>${student.roll_number || 'N/A'}</td>
//                     <td>${student.branch || 'N/A'}</td>
//                     <td>${student.year || 'N/A'}</td>
//                     <td>${student.course || 'N/A'}</td>
//                     <td>${student.carry_forward === 'yes' ? 'Yes' : 'No'}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching registered students:', error);
//         });
// });




// document.addEventListener("DOMContentLoaded", () => {
//     fetch('/registered-students')
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ""; // Clear previous entries, if any

//             data.forEach(student => {
//                 const row = document.createElement('tr');

//                 row.innerHTML = `
//                     <td>${student.id}</td>
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;

//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching registered students data:', error);
//         });
// });


































// document.getElementById('search-button').addEventListener('click', () => {
//     const rollNumber = document.getElementById('roll-number').value;
//     const branch = document.getElementById('branch').value;
//     const course = document.getElementById('course').value;
//     const year = document.getElementById('year').value;
//     const name = document.getElementById('name').value;

//     // Construct query parameters
//     const queryParams = new URLSearchParams({
//         rollNumber,
//         branch,
//         course,
//         year,
//         name
//     });

//     fetch(`/registered-students?${queryParams.toString()}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ''; // Clear existing rows

//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${student.id}</td>
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });









































// document.getElementById('search-button').addEventListener('click', () => {
//     const rollNumber = document.getElementById('roll-number').value;
//     const branch = document.getElementById('branch').value;
//     const course = document.getElementById('course').value;
//     const year = document.getElementById('year').value;
//     const name = document.getElementById('name').value;

//     // Construct query parameters for filtering
//     const queryParams = new URLSearchParams({
//         rollNumber,
//         branch,
//         course,
//         year,
//         name
//     });

//     fetch(`/registered-students?${queryParams.toString()}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ''; // Clear previous results

//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${student.id}</td>
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });



// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch and display all students on page load
//     fetch('/registered-students')
//         .then(response => response.json())
//         .then(data => {
//             populateTable(data);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });

// document.getElementById('search-button').addEventListener('click', () => {
//     const rollNumber = document.getElementById('roll-number').value;
//     const branch = document.getElementById('branch').value;
//     const course = document.getElementById('course').value;
//     const year = document.getElementById('year').value;
//     const name = document.getElementById('name').value;

//     // Construct query parameters for filtering
//     const queryParams = new URLSearchParams({
//         rollNumber,
//         branch,
//         course,
//         year,
//         name
//     });

//     fetch(`/registered-students?${queryParams.toString()}`)
//         .then(response => response.json())
//         .then(data => {
//             populateTable(data);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });

// function populateTable(data) {
//     const tableBody = document.getElementById('students-table').querySelector('tbody');
//     tableBody.innerHTML = ''; // Clear previous results

//     data.forEach(student => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${student.id}</td>
//             <td>${student.name}</td>
//             <td>${student.roll_number}</td>
//             <td>${student.branch}</td>
//             <td>${student.year}</td>
//             <td>${student.courses}</td>
//             <td>${student.carry_forward}</td>
//             <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//         `;
//         tableBody.appendChild(row);
//     });
// }






// document.getElementById('search-button').addEventListener('click', () => {
//     const rollNumber = document.getElementById('roll-number').value;
//     const branch = document.getElementById('branch').value;
//     const course = document.getElementById('course').value;
//     const year = document.getElementById('year').value;
//     const name = document.getElementById('name').value;

//     // Construct query parameters for filtering
//     const queryParams = new URLSearchParams({
//         rollNumber,
//         branch,
//         course,
//         year,
//         name
//     });

//     fetch(`/registered-students?${queryParams.toString()}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ''; // Clear previous results

//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${student.id}</td>
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });















// document.getElementById('search-button').addEventListener('click', () => {
//     const rollNumber = document.getElementById('roll-number').value;
//     const branch = document.getElementById('branch').value;
//     const course = document.getElementById('course').value;
//     const year = document.getElementById('year').value;
//     const name = document.getElementById('name').value;

//     // Construct query parameters for filtering
//     const queryParams = new URLSearchParams({
//         rollNumber,
//         branch,
//         course,
//         year,
//         name
//     });

//     fetch(`/registered-students?${queryParams.toString()}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ''; // Clear previous results

//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${student.id}</td>
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });
















// document.getElementById('search-button').addEventListener('click', () => {
//     const rollNumber = document.getElementById('roll-number').value;
//     const branch = document.getElementById('branch').value;
//     const course = document.getElementById('course').value;
//     const year = document.getElementById('year').value;
//     const name = document.getElementById('name').value;

//     // Construct query parameters for filtering
//     const queryParams = new URLSearchParams({
//         rollNumber,
//         branch,
//         course,
//         year,
//         name
//     });

//     fetch(`/registered-students?${queryParams.toString()}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ''; // Clear previous results
// //   <td>${student.id}</td>
//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
                 
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });


// document.getElementById('search-button').addEventListener('click', () => {
//     // Get filter values
//     const rollNumber = document.getElementById('roll-number').value.trim();
//     const branch = document.getElementById('branch').value.trim();
//     const course = document.getElementById('course').value.trim();
//     const year = document.getElementById('year').value.trim();
//     const name = document.getElementById('name').value.trim();

//     // Construct query parameters for non-empty fields
//     const queryParams = new URLSearchParams();
//     if (rollNumber) queryParams.append('rollNumber', rollNumber);
//     if (branch) queryParams.append('branch', branch);
//     if (course) queryParams.append('course', course);
//     if (year) queryParams.append('year', year);
//     if (name) queryParams.append('name', name);

//     fetch(`/registered-students?${queryParams.toString()}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ''; // Clear previous results

//             if (data.length === 0) {
//                 // Handle no results found
//                 tableBody.innerHTML = '<tr><td colspan="7">No students found</td></tr>';
//                 return;
//             }

//             // Populate table with filtered results
//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });



// // Fetch and display all registered students on page load
// document.addEventListener('DOMContentLoaded', fetchAndDisplayStudents);

// // Add search functionality to the button
// document.getElementById('search-button').addEventListener('click', () => {
//     const rollNumber = document.getElementById('roll-number').value;
//     const branch = document.getElementById('branch').value;
//     const course = document.getElementById('course').value;
//     const year = document.getElementById('year').value;
//     const name = document.getElementById('name').value;

//     // Construct query parameters for filtering
//     const queryParams = new URLSearchParams({
//         rollNumber,
//         branch,
//         course,
//         year,
//         name
//     });

//     fetchAndDisplayStudents(queryParams.toString());
// });

// // Fetch and display students
// function fetchAndDisplayStudents(queryString = '') {
//     fetch(`/registered-students?${queryString}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ''; // Clear previous results

//             if (data.length === 0) {
//                 tableBody.innerHTML = '<tr><td colspan="7">No students found</td></tr>';
//                 return;
//             }

//             data.forEach(student => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }




// Fetch and display all registered students on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayStudents);

// Add search functionality to the button
document.getElementById('search-button').addEventListener('click', () => {
    const rollNumber = document.getElementById('roll-number').value.trim();
    const branch = document.getElementById('branch').value.trim();
    const course = document.getElementById('course').value.trim();
    const year = document.getElementById('year').value.trim();
    const name = document.getElementById('name').value.trim();

    // Construct query parameters for filtering
    const queryParams = new URLSearchParams({
        rollNumber,
        branch,
        course,
        year,
        name
    });

    fetchAndDisplayStudents(queryParams.toString());
});

// Fetch and display students
function fetchAndDisplayStudents(queryString = '') {
    fetch(`/registered-students?${queryString}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('students-table').querySelector('tbody');
            tableBody.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="7">No students found</td></tr>';
                return;
            }

            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.roll_number}</td>
                    <td>${student.branch}</td>
                    <td>${student.year}</td>
                    <td>${student.courses}</td>
                    <td>${student.carry_forward}</td>
                    <td>${new Date(student.registration_date).toLocaleDateString()}</td>
                   
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}








// document.addEventListener("DOMContentLoaded", () => {
//     fetch('/registered-students')
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById('students-table').querySelector('tbody');
//             tableBody.innerHTML = ""; // Clear previous entries, if any

//             data.forEach(student => {
//                 const row = document.createElement('tr');

//                 row.innerHTML = `
//                     <td>${student.id}</td>
//                     <td>${student.name}</td>
//                     <td>${student.roll_number}</td>
//                     <td>${student.branch}</td>
//                     <td>${student.year}</td>
//                     <td>${student.courses}</td>
//                     <td>${student.carry_forward}</td>
//                     <td>${new Date(student.registration_date).toLocaleDateString()}</td>
//                 `;

//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching registered students data:', error);
//         });
// });
