<?php

require_once "../config/db.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){

    $full_name = mysqli_real_escape_string($conn,$_POST['full_name']);
    $reg_number = mysqli_real_escape_string($conn,$_POST['reg_number']);
    $course_name = mysqli_real_escape_string($conn,$_POST['course_name']);
    $study_year = mysqli_real_escape_string($conn,$_POST['study_year']);
    $contact_number = mysqli_real_escape_string($conn,$_POST['contact_number']);

    $sql = "INSERT INTO users(
        full_name,
        reg_number,
        course_name,
        study_year,
        contact_number
    )
    VALUES(
        '$full_name',
        '$reg_number',
        '$course_name',
        '$study_year',
        '$contact_number'
    )";

    if(mysqli_query($conn,$sql)){
        echo "Registration Successful";
    }else{
        echo mysqli_error($conn);
    }
}
?>