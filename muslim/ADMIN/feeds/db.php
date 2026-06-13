<?php
// db.php
$host = 'localhost';
$dbname = 'MCIAA_Association'; // Replace with your real DB name
$username = 'root';             // Replace with your real DB username
$password = '';                 // Replace with your real DB password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Database Connection Failed: " . $e->getMessage());
}
