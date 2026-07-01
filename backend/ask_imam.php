<?php
require "../config/db.php";
if (isset($_POST["submit"])) {

    $name     = trim($_POST["name"]);
    $question = trim($_POST["question"]);

    if (empty($name) || empty($question)) {
        die("All fields are required.");
    }

    $stmt = $conn->prepare("INSERT INTO imam_questions (name, question) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $question);

    if ($stmt->execute()) {
        echo "Your question has been submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
