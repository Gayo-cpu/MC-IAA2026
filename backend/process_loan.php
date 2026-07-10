<?php
// process_loan.php
// Receives the Student Loan Application form and saves it to the database
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";

if (!isset($conn)) {
    if (isset($link)) {
        $conn = $link;
    } elseif (isset($mysqli)) {
        $conn = $mysqli;
    } elseif (isset($db)) {
        $conn = $db;
    }
}

if (!isset($conn) || !$conn || !($conn instanceof mysqli)) {
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit;
}

assert($conn instanceof mysqli);

// Accept POST only
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// GET FIELDS FROM POST
$full_name     = trim($_POST["full_name"]   ?? "");
$reg_no        = trim($_POST["reg_no"]      ?? "");
$course        = trim($_POST["course"]      ?? "");
$year          = trim($_POST["year"]        ?? "");
$phone         = trim($_POST["phone"]       ?? "");
$loan_category = trim($_POST["loan_category"] ?? "");
$amount        = trim($_POST["amount"]      ?? "");
$reason        = trim($_POST["reason"]      ?? "");


// VALIDATE REQUIRED FIELDS 
$errors = [];

if (empty($full_name))   $errors[] = "Full Name is required.";
if (empty($reg_no))      $errors[] = "Registration Number is required.";
if (empty($course))      $errors[] = "Course Name is required.";
if (empty($year))        $errors[] = "Year of Study is required.";
if (empty($phone))       $errors[] = "Phone Number is required.";

// Basic phone format check (digits, +, spaces, dashes — min 9 chars)
if (!empty($phone) && !preg_match('/^[+\d\s\-]{9,20}$/', $phone)) {
    $errors[] = "Phone Number format is invalid.";
}


if (!empty($errors)) {
    echo json_encode([
        "success" => false,
        "message" => implode(" ", $errors)
    ]);
    exit;
}

//CHECK: no duplicate application for same reg_no 
$reg_check = mysqli_real_escape_string($conn, $reg_no);
$dup = mysqli_query(
    $conn,
    "SELECT id FROM loans WHERE reg_no='$reg_check' LIMIT 1"
);

if (mysqli_num_rows($dup) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "An application with Registration Number '$reg_no' already exists."
    ]);
    exit;
}

// SANITIZE 
$full_name   = mysqli_real_escape_string($conn, $full_name);
$reg_no      = mysqli_real_escape_string($conn, $reg_no);
$course      = mysqli_real_escape_string($conn, $course);
$year        =  (int)$year;
$phone       = mysqli_real_escape_string($conn, $phone);
$loan_category = mysqli_real_escape_string($conn, $loan_category);
if (empty($loan_category)) {
    $loan_category = "Student_Loan"; // Fallback text string if empty
}
$amount      = (float)$amount;
$reason      = mysqli_real_escape_string($conn, $reason);
$status        = "Pending";

// INSERT 
$stmt = $conn->prepare("INSERT INTO loans (full_name, reg_no, course, year_of_study, phone, loan_category, amount, reason, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare statement: " . $conn->error
    ]);
    exit;
}

$status = "Pending";

$stmt->bind_param(
    "sssisdsss",
    $full_name,
    $reg_no,
    $course,
    $year,
    $phone,
    $loan_category,
    $amount,
    $reason,
    $status
);

if ($stmt->execute()) {
    $new_id = mysqli_insert_id($conn);

    echo json_encode([
        "success"    => true,
        "message"    => "Your loan application has been submitted successfully! We will review it and contact you shortly.",
        "application_id" => $new_id,
        "DEBUG_SAVED_AS" => $loan_category
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to submit application: " . $stmt->error
    ]);
}

exit();
