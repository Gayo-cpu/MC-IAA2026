<?php
include "../config/db.php";

if (isset($_POST['submit'])) {

    $name = $_POST['name'];
    $question = $_POST['question'];

    $sql = "INSERT INTO ask_imam (name, question)
            VALUES ('$name', '$question')";

    $conn->query($sql);

    echo "Question sent successfully";
}
?>