<?php

require_once "../config/db.php";

$users =
mysqli_fetch_row(
mysqli_query($conn,"SELECT COUNT(*) FROM users")
)[0];

$news =
mysqli_fetch_row(
mysqli_query($conn,"SELECT COUNT(*) FROM news")
)[0];

$questions =
mysqli_fetch_row(
mysqli_query($conn,"SELECT COUNT(*) FROM imam_questions")
)[0];

$contacts =
mysqli_fetch_row(
mysqli_query($conn,"SELECT COUNT(*) FROM contacts")
)[0];

echo json_encode([
    "users"=>$users,
    "news"=>$news,
    "questions"=>$questions,
    "contacts"=>$contacts
]);
?>