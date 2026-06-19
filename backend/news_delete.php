<?php
include "../config/db.php";

$id = $_POST['id'];

$conn->query("DELETE FROM news WHERE id=$id");

echo "Deleted successfully";
?>