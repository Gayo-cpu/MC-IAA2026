<?php
include "../config/db.php";

$id = $_POST['id'];
$title = $_POST['title'];
$content = $_POST['content'];

$sql = "UPDATE news 
        SET title='$title', content='$content'
        WHERE id=$id";

$conn->query($sql);

echo "Updated successfully";
?>