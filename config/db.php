<?php

$hostname = 'localhost';
$username = 'root';
$password = '';
$db = 'mciaa2';

$conn = mysqli_connect($hostname,$username,$password,$db);

if($conn->connect_error){
    die ("Connection failed: ".$conn->connect_error);
}
?>