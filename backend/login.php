<?php
session_start();
include("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    //kucheck email na user name kama ipo 
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? OR fullname = ? LIMIT 1");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {

        $user = $result->fetch_assoc();
        $stmt->close();

        $passwordMatch = false;
            //kuverify password  
        if (password_verify($password, $user['password'])) {
            $passwordMatch = true;
        } elseif ($password === $user['password']) {
            // kama password ikiwa haijakuwa encrypted
            $newHash = password_hash($password, PASSWORD_DEFAULT);
            $stmtUp = $conn->prepare("UPDATE users SET password = ? WHERE userid = ?");
            $stmtUp->bind_param("si", $newHash, $user['userid']);
            $stmtUp->execute();
            $stmtUp->close();
            $passwordMatch = true;
        }

        if ($passwordMatch) {

            // kutengeneza session kwa kuzipa variables
            $_SESSION['user_id']          = $user['userid'];
            $_SESSION['fullname']         = $user['fullname'];
            $_SESSION['role']             = $user['role'];
            $_SESSION['role_description'] = $user['role_description'];

            //kuelekeza user kwa kudepend na role yake
            $role_desc = $user['role_description'] ?? '';

            if ($role_desc === 'habari') {
                header("Location: ../views/amiri-habari.php");
            } elseif ($role_desc === 'fedha') {
                header("Location: ../views/amiri-fedha.php");
            } else {
                header("Location: ../views/dashboard1.php");
            }
            exit();

        } else {
            echo "<script>
                    alert('Nywila si sahihi!');
                    window.location='../views/login.php';
                  </script>";
        }

    } else {
        $stmt->close();
        echo "<script>
                alert('Mtumiaji hajapatikana!');
                window.location='../views/login.php';
              </script>";
    }
}
?>
