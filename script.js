let selectedRole = '';

function selectRole(role) {
    selectedRole = role;
    const loginForm = document.getElementById('loginForm');
    loginForm.style.display = 'block';
    
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        btn.style.opacity = '0.5';
        btn.style.transform = 'scale(0.95)';
    });
    
    if (role === 'admin') {
        document.querySelector('.admin-btn').style.opacity = '1';
        document.querySelector('.admin-btn').style.transform = 'scale(1)';
    } else {
        document.querySelector('.technician-btn').style.opacity = '1';
        document.querySelector('.technician-btn').style.transform = 'scale(1)';
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }
    
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('userName', username);
    
    window.location.href = 'app.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
        window.location.href = 'app.html';
    }
});
