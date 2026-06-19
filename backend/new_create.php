<?php
include "../config/db.php";

if (isset($_POST['submit'])) {

    $title = $_POST['title'];
    $content = $_POST['content'];

    $imageName = $_FILES['image']['name'];
    $tmp = $_FILES['image']['tmp_name'];

    move_uploaded_file($tmp, "../uploads/" . $imageName);

    $sql = "INSERT INTO news (title, content, image)
            VALUES ('$title', '$content', '$imageName')";

    if ($conn->query($sql)) {
        echo "News created successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>