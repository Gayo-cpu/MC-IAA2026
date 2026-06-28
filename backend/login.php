<?php
session_start();
include("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users
            WHERE email='$username'
            OR fullname='$username'";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {

        $user = mysqli_fetch_assoc($result);

        // Support both plain text (legacy) and hashed passwords
        $passwordMatch = false;
        if (password_verify($password, $user['password'])) {
            $passwordMatch = true;
        } elseif ($password === $user['password']) {
            // Legacy plain-text fallback (hash it now for security)
            $newHash = password_hash($password, PASSWORD_DEFAULT);
            mysqli_query($conn, "UPDATE users SET password='$newHash' WHERE userid=" . $user['userid']);
            $passwordMatch = true;
        }

        if ($passwordMatch) {

            $_SESSION['userid'] = $user['userid'];
            $_SESSION['fullname'] = $user['fullname'];
            $_SESSION['role'] = $user['role'];

            header("Location: ../walfare/index.html");
            exit();

        } else {
            echo "<script>
                    alert('Nywila si sahihi!');
                    window.location='../views/login.html';
                  </script>";
        }

    } else {
        echo "<script>
                alert('Mtumiaji hajapatikana!');
                window.location='../views/login.html';
              </script>";
    }
}
?>