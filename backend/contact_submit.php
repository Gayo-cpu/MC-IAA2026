<?php
header('Content-Type: application/json');
include '../config/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
    $email     = mysqli_real_escape_string($conn, $_POST['email_address']);
    $subject   = mysqli_real_escape_string($conn, $_POST['msg_subject']);
    $message   = mysqli_real_escape_string($conn, $_POST['user_message']);

    // Validate required fields
    if (empty($full_name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Tafadhali jaza sehemu zote.']);
        exit();
    }

    $sql = "INSERT INTO contact_messages
            (full_name, email_address, msg_subject, user_message)
            VALUES
            ('$full_name', '$email', '$subject', '$message')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => true, 'message' => 'Ujumbe wako umetumwa kikamilifu!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Hitilafu: ' . mysqli_error($conn)]);
    }
}

mysqli_close($conn);
?>
