<?php

require_once "../config/db.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){

    $full_name = mysqli_real_escape_string($conn,$_POST['full_name']);
    $reg_number = mysqli_real_escape_string($conn,$_POST['reg_number']);
    $course_name = mysqli_real_escape_string($conn,$_POST['course_name']);
    $study_year = mysqli_real_escape_string($conn,$_POST['study_year']);
    $contact_number = mysqli_real_escape_string($conn,$_POST['contact_number']);
   $email = mysqli_real_escape_string($conn,$_POST['email']);
   $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $gender = mysqli_real_escape_string($conn,$_POST['gender']);
   
   $sql = "INSERT INTO users(
    fullname,
    phonenumber,
    email,
    password,
    gender,
    registration_no,
    academic_year
)
VALUES(
    '$full_name',
    '$contact_number',
    '$email',
    '$password',
    '$gender',
    '$reg_number',
    '$study_year'
)";

    if(mysqli_query($conn,$sql)){
        echo "Registration Successful";
    }else{
        echo mysqli_error($conn);
    }
}
?>