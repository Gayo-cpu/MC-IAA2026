<?php

session_start();

require_once "../config/db.php";

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users
        WHERE username='$username'
        OR email='$username'
        LIMIT 1";

$result = mysqli_query($conn,$sql);

if(mysqli_num_rows($result)>0){

    $user = mysqli_fetch_assoc($result);

    if(password_verify($password,$user['password'])){

        $_SESSION['userid'] = $user['id'];
        $_SESSION['role'] = $user['role'];

        header("Location: ../views/admin_news.html");
        exit();

    }else{
        echo "Wrong Password";
    }

}else{
    echo "User Not Found";
}
?>