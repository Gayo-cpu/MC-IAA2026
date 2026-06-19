<?php
include "../config/db.php";

if (isset($_POST['submit'])) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $sql = "INSERT INTO contacts (name, email, message)
            VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql)) {
        echo "Message sent successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>