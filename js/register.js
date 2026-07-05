document.getElementById('registerForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = document.querySelector('.btn-register');
            btn.disabled = true;
            btn.innerHTML = 'Submitting... <i class="fa-solid fa-spinner fa-spin"></i>';

            const formData = new FormData(this);

            fetch('../backend/register.php', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    alert('✅ ' + data.message);
                    // Redirect to login after success
                    window.location.href = '../views/login.php';
                } else {
                    alert('❌ ' + data.message);
                    btn.disabled = false;
                    btn.innerHTML = 'Submit Registration <i class="fa-solid fa-paper-plane"></i>';
                }
            })
            .catch(() => {
                alert('Network error. Please try again.');
                btn.disabled = false;
                btn.innerHTML = 'Submit Registration <i class="fa-solid fa-paper-plane"></i>';
            });
        });