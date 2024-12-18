// Get the login form
const loginForm = document.getElementById('loginForm');

// Handle form submission
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve the user list from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check login credentials
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Login successful! Welcome, ${user.username}.`);
        // Redirect or perform actions after successful login
        window.location.href = "KinhmatHome.html"; // For example, redirect to the homepage
    } else {
        alert('Incorrect email or password!');
    }
});

// Handle user logout
function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "Login.html";
    }
}

// Get the forgot password form
const forgotPasswordForm = document.getElementById('forgotPasswordForm');

// Handle form submission
forgotPasswordForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve email from input
    const email = document.getElementById('email').value;

    // Retrieve the user list from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user by email
    const user = users.find(user => user.email === email);

    if (user) {
        alert(`Your password is: ${user.password}`);
        // You can integrate an email sending API to send the password to the user's email
    } else {
        alert('Email does not exist in the system!');
    }

    // Reset the form
    forgotPasswordForm.reset();
});
