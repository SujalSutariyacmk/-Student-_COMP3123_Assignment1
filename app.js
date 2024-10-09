const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comp3123_assigment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// Signup form handling
document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    alert(data.message || 'Signup successful');
});

// Login form handling
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.jwt_token) {
        localStorage.setItem('token', data.jwt_token);
        alert('Login successful');
    } else {
        alert(data.message);
    }
});

// Get employees
document.getElementById('get-employees').addEventListener('click', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login first');
        return;
    }

    const response = await fetch('http://localhost:3000/api/v1/emp/employees', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';
    data.forEach(emp => {
        const li = document.createElement('li');
        li.textContent = `${emp.first_name} ${emp.last_name} - ${emp.position}`;
        employeeList.appendChild(li);
    });
});

// Create employee form handling
document.getElementById('employee-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login first');
        return;
    }

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const salary = document.getElementById('salary').value;
    const date_of_joining = document.getElementById('date_of_joining').value;
    const department = document.getElementById('department').value;

    const response = await fetch('http://localhost:3000/api/v1/emp/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ first_name, last_name, email, position, salary, date_of_joining, department })
    });

    const data = await response.json();
    alert(data.message || 'Employee created');
});






















module.exports = app;