document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please enter both your email and password.');
        return;
    }

    const adminEmail = 'admin@mcaa.org';
    const adminPassword = 'Admin@123';

    if (email === adminEmail && password === adminPassword) {
        localStorage.setItem('mc_currentUser', JSON.stringify({
            email: adminEmail,
            role: 'admin',
            name: 'System Admin'
        }));
        window.location.href = '../ADMIN/admin.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('mc_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Invalid email or password. Please register or try again.');
        return;
    }

    localStorage.setItem('mc_currentUser', JSON.stringify({
        email: user.email,
        role: 'member',
        name: user.fullName
    }));

    alert('Login successful. Redirecting to your portal...');
    window.location.href = '../ASK_IMAM/ask_imam.html';
});
