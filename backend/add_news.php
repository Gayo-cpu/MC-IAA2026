<?php

session_start();
require_once "../config/db.php";

$title = mysqli_real_escape_string($conn,$_POST['title']);
$content = mysqli_real_escape_string($conn,$_POST['content']);

$image = "";

if(isset($_FILES['image']) && $_FILES['image']['error']==0){

    $filename = time()."_".$_FILES['image']['name'];

    move_uploaded_file(
        $_FILES['image']['tmp_name'],
        "../uploads/".$filename
    );

    $image = $filename;
}

$sql = "INSERT INTO news(title,content,image)
        VALUES('$title','$content','$image')";

if(mysqli_query($conn,$sql)){
    header("Location: ../views/admin_news.php");
}else{
    echo mysqli_error($conn);
}
?>