<?php

require_once "../config/db.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){

    $name = mysqli_real_escape_string($conn,$_POST['name']);
    $email = mysqli_real_escape_string($conn,$_POST['email']);
    $category = mysqli_real_escape_string($conn,$_POST['category']);
    $question = mysqli_real_escape_string($conn,$_POST['question']);

    $sql = "INSERT INTO imam_questions
            (name,email,category,question)
            VALUES
            ('$name','$email','$category','$question')";

    if(mysqli_query($conn,$sql)){
        header("Location: ../views/ask_imam.html?success=1");
    }else{
        echo mysqli_error($conn);
    }
}
?>