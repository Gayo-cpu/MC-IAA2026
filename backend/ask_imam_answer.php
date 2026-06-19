<?php
include "../config/db.php";

$id = $_POST['id'];
$answer = $_POST['answer'];

$sql = "UPDATE ask_imam 
        SET answer='$answer', status='answered'
        WHERE id=$id";

if ($conn->query($sql)) {
    echo "Answered successfully";
} else {
    echo "Error: " . $conn->error;
}
?>