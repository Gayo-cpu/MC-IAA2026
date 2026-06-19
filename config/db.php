<?php

$hostname = 'localhost';
$username = 'root';
$password = '';
$db = 'mciaa_db';

$conn = mysqli_connect($hostname,$username,$password,$db);

if($conn->connection_error){
    die ("Connection failed: ".$conn->connection_error);
}
?>