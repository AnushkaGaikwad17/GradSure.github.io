// const step1 = document.querySelector(".step1"),
//     step2 = document.querySelector(".step2"),
//     step3 = document.querySelector(".step3"),
//     emailAddress = document.getElementById("emailAddress"),
//     passwordInput = document.getElementById("password"),
//     verifyEmail = document.getElementById("verifyEmail"),
//     inputs = document.querySelectorAll(".otp-group input"),
//     nextButtons = document.querySelectorAll(".nextButton"),
//     verifyButton = document.querySelector(".verifyButton");

// let OTP = "";
// let userEmail = "";

// // Initial setup
// window.addEventListener("load", () => {
//     emailjs.init("lTBRSOzgh8aK3N8VA");
//     step2.style.display = "none";
//     step3.style.display = "none";
//     nextButtons.forEach(button => button.classList.add("disable"));
//     verifyButton.classList.add("disable");
// });

// // Validate email
// const validateEmail = (email) => {
//     fetch('/verify-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message === 'Email found!') {
//             userEmail = email;
//             nextButtons[0].classList.remove("disable");
//         } else {
//             nextButtons[0].classList.add("disable");
//         }
//     });
// };

// // Proceed to password step
// nextButtons[0].addEventListener("click", () => {
//     step1.style.display = "none";
//     step2.style.display = "block";
// });

// // Validate password and enable button
// const checkPassword = () => {
//     const password = passwordInput.value;
//     if (password.length > 0) {
//         nextButtons[1].classList.remove("disable");
//     } else {
//         nextButtons[1].classList.add("disable");
//     }
// };

// // Generate OTP
// const generateOTP = () => {
//     return Math.floor(1000 + Math.random() * 9000);
// };
// const serviceID="service_cbdm31d";
// const templateID = "template_toa4398";
// // Validate password and send OTP
// nextButtons[1].addEventListener("click", () => {
//     const password = passwordInput.value;
//     fetch('/verify-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: userEmail, password }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message === 'Password correct!') {
//             OTP = generateOTP();
//             nextButtons[1].innerHTML = "&#9889; Sending...";

//             const templateParameter = {
//                 from_name: "gradsure",
//                 OTP: OTP,
//                 message: "Please use this OTP to verify your login.",
//                 reply_to: userEmail,
//             };

//             emailjs.send("service_cbdm31d", "template_toa4398", templateParameter).then(
//                 (res) => {
//                     console.log('Email sent:', res);
//                     nextButtons[1].innerHTML = "Next &rarr;";
//                     verifyEmail.innerText = userEmail;
//                     step2.style.display = "none";
//                     step3.style.display = "block";
//                     nextButtons[1].classList.add("disable"); // Disable button after proceeding
//                 },
//                 (err) => {
//                     console.error('Error sending OTP:', err);
//                 }
//             );
//         } else {
//             passwordInput.classList.add("error-shake");
//             setTimeout(() => {
//                 passwordInput.classList.remove("error-shake");
//             }, 1000);
//         }
//     })
//     .catch(error => console.error('Error verifying password:', error));
// });

// // Enable "Verify" button when OTP inputs are filled correctly
// inputs.forEach((input) => {
//     input.addEventListener("keyup", function (e) {
//         if (this.value.length >= 1) {
//             e.target.value = e.target.value.substr(0, 1);
//         }
//         if (Array.from(inputs).every(input => input.value.length === 1)) {
//             verifyButton.classList.remove("disable");
//         } else {
//             verifyButton.classList.add("disable");
//         }
//     });
// });

// // Verify OTP and proceed
// verifyButton.addEventListener("click", () => {
//     let values = "";
//     inputs.forEach((input) => {
//         values += input.value;
//     });
//     console.log('Entered OTP:', values); // Debugging line
//     if (OTP == values) {
//         window.location.href = 'Dashboard_student.html';
//     } else {
//         verifyButton.classList.add("error-shake");
//         setTimeout(() => {
//             verifyButton.classList.remove("error-shake");
//         }, 1000);
//     }
// });

// // Change email step
// function changeMyEmail() {
//     step1.style.display = "block";
//     step2.style.display = "none";
//     step3.style.display = "none";
// }

// // Add event listener to password input
// passwordInput.addEventListener("input", checkPassword);


















const step1 = document.querySelector(".step1"),
    step2 = document.querySelector(".step2"),
    step3 = document.querySelector(".step3"),
    emailAddress = document.getElementById("emailAddress"),
    passwordInput = document.getElementById("password"),
    verifyEmail = document.getElementById("verifyEmail"),
    inputs = document.querySelectorAll(".otp-group input"),
    nextButtons = document.querySelectorAll(".nextButton"),
    verifyButton = document.querySelector(".verifyButton");

let OTP = "";
let userEmail = "";

// Initial setup
window.addEventListener("load", () => {
    emailjs.init("lTBRSOzgh8aK3N8VA");
    step2.style.display = "none";
    step3.style.display = "none";
    nextButtons.forEach(button => button.classList.add("disable"));
    verifyButton.classList.add("disable");
});

// Validate email
const validateEmail = (email) => {
    fetch('/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Email found!') {
            userEmail = email;
            nextButtons[0].classList.remove("disable");
        } else {
            nextButtons[0].classList.add("disable");
        }
    });
};

// Proceed to password step
nextButtons[0].addEventListener("click", () => {
    step1.style.display = "none";
    step2.style.display = "block";
});

// Validate password and enable button
const checkPassword = () => {
    const password = passwordInput.value;
    if (password.length > 0) {
        nextButtons[1].classList.remove("disable");
    } else {
        nextButtons[1].classList.add("disable");
    }
};

// Generate OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
const serviceID="service_cbdm31d";
const templateID = "template_toa4398";
// Validate password and send OTP
nextButtons[1].addEventListener("click", () => {
    const password = passwordInput.value;
    fetch('/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userEmail, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Password correct!') {
            OTP = generateOTP();
            nextButtons[1].innerHTML = "&#9889; Sending...";

            const templateParameter = {
                from_name: "gradsure",
                OTP: OTP,
                message: "Please use this OTP to verify your login.",
                reply_to: userEmail,
            };

            emailjs.send("service_cbdm31d", "template_toa4398", templateParameter).then(
                (res) => {
                    console.log('Email sent:', res);
                    nextButtons[1].innerHTML = "Next &rarr;";
                    verifyEmail.innerText = userEmail;
                    step2.style.display = "none";
                    step3.style.display = "block";
                    nextButtons[1].classList.add("disable");
                },
                (err) => {
                    console.error('Error sending OTP:', err);
                }
            );
        } else {
            passwordInput.classList.add("error-shake");
            setTimeout(() => {
                passwordInput.classList.remove("error-shake");
            }, 1000);
        }
    })
    .catch(error => console.error('Error verifying password:', error));
});

// Enable "Verify" button when OTP inputs are filled correctly and auto-move to the next input
inputs.forEach((input, index) => {
    input.addEventListener("keyup", function (e) {
        // Restrict each input to a single character
        if (this.value.length > 1) {
            e.target.value = e.target.value.substr(0, 1);
        }
        // Move to the next input if there is a next one
        if (this.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        // If all inputs are filled, enable the Verify button
        if (Array.from(inputs).every(input => input.value.length === 1)) {
            verifyButton.classList.remove("disable");
        } else {
            verifyButton.classList.add("disable");
        }
    });
});

// Verify OTP and proceed
verifyButton.addEventListener("click", () => {
    let values = "";
    inputs.forEach((input) => {
        values += input.value;
    });
    console.log('Entered OTP:', values); // Debugging line
    if (OTP == values) {
        window.location.href = 'Dashboard_student.html';
    } else {
        verifyButton.classList.add("error-shake");
        setTimeout(() => {
            verifyButton.classList.remove("error-shake");
        }, 1000);
    }
});

// Change email step
function changeMyEmail() {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
}

// Add event listener to password input
passwordInput.addEventListener("input", checkPassword);