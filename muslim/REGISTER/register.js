document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('full_name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (!fullName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match! Please try again.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('mc_users') || '[]');
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        alert('This email is already registered. Please login or use another email.');
        return;
    }

    users.push({
        fullName,
        email,
        password
    });

    localStorage.setItem('mc_users', JSON.stringify(users));
    alert('Registration successful! You may now log in.');
    window.location.href = '../LOGIN/login.html';
});
