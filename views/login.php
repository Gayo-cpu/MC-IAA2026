<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - MCIAA Portal</title>
    <link rel="stylesheet" href="../css/login.css">
    <!-- FontAwesome for the lock and user icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

    <div class="login-wrapper">
        <!-- Back to Main Portal Link -->
        <a href="../views/index.html" class="back-home-link"><i class="fa-solid fa-arrow-left"></i> Back to Portal</a>

        <div class="login-card">
            <!-- Brand Header -->
            <div class="login-header">
                <div class="brand-logo">
                    <i class="fa-solid fa-user-shield"></i>
                </div>
                <h2>Admin Gateway</h2>
                <p>Sign in to access the news dashboard control panel</p>
            </div>

            <!-- Login Form -->
           <form action="../backend/login.php" method="POST">

                <!-- Username/Email Field -->
                <div class="input-group">
                    <label for="username">Username or Email</label>
                    <div class="input-field-wrapper">
                        <i class="fa-solid fa-user input-icon"></i>
                        <input type="text" id="username" name="username" placeholder="Enter your admin username"
                            required autocomplete="username">
                    </div>
                </div>

                <!-- Password Field -->
                <div class="input-group">
                    <div class="password-label-row">
                        <label for="password">Password</label>
                        <a href="#" class="forgot-password">Forgot?</a>
                    </div>
                    <div class="input-field-wrapper">
                        <i class="fa-solid fa-lock input-icon"></i>
                        <input type="password" id="password" name="password" placeholder="Enter security password"
                            required autocomplete="current-password">
                    </div>
                </div>

                <!-- Remember Me Checkbox -->
                <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox" name="remember">
                        <span>Keep me logged in</span>
                    </label>
                </div>

                <!-- Submit Button (Clean standard shape) -->
                <button type="submit" class="btn-login">
                    Secure Sign In <i class="fa-solid fa-right-to-bracket"></i>
                </button>

            </form>
        </div>
    </div>

</body>

</html>