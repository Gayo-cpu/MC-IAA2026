<?php
// process_loan.php
// Receives the Student Loan Application form and saves it to the database
header("Content-Type: application/json");
require "../config/db.php";
// Accept POST only
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// ─── GET FIELDS ─────────────────────────────────────────────
$full_name   = trim($_POST["full_name"]   ?? "");
$reg_no      = trim($_POST["reg_no"]      ?? "");
$course_name = trim($_POST["course_name"] ?? "");
$year        = trim($_POST["year"]        ?? "");
$phone       = trim($_POST["phone"]       ?? "");
$nida        = trim($_POST["nida"]        ?? "");   // optional

// ─── VALIDATE REQUIRED FIELDS ───────────────────────────────
$errors = [];

if (empty($full_name))   $errors[] = "Full Name is required.";
if (empty($reg_no))      $errors[] = "Registration Number is required.";
if (empty($course_name)) $errors[] = "Course Name is required.";
if (empty($year))        $errors[] = "Year of Study is required.";
if (empty($phone))       $errors[] = "Phone Number is required.";

// Basic phone format check (digits, +, spaces, dashes — min 9 chars)
if (!empty($phone) && !preg_match('/^[+\d\s\-]{9,20}$/', $phone)) {
    $errors[] = "Phone Number format is invalid.";
}

// NIDA: if provided, must be 19–20 alphanumeric characters
if (!empty($nida) && !preg_match('/^[0-9A-Za-z]{19,20}$/', $nida)) {
    $errors[] = "NIDA Number must be 19–20 characters.";
}

if (!empty($errors)) {
    echo json_encode([
        "success" => false,
        "message" => implode(" ", $errors)
    ]);
    exit;
}

// ─── CHECK: no duplicate application for same reg_no ────────
$reg_check = mysqli_real_escape_string($conn, $reg_no);
$dup = mysqli_query($conn, "SELECT id FROM loan WHERE reg_no = '$reg_check' LIMIT 1");

if (mysqli_num_rows($dup) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "An application with Registration Number '$reg_no' already exists."
    ]);
    exit;
}

// ─── SANITIZE ───────────────────────────────────────────────
$full_name   = mysqli_real_escape_string($conn, $full_name);
$reg_no      = mysqli_real_escape_string($conn, $reg_no);
$course_name = mysqli_real_escape_string($conn, $course_name);
$year        = (int) $year;
$phone       = mysqli_real_escape_string($conn, $phone);
$nida        = mysqli_real_escape_string($conn, $nida);

// ─── INSERT ─────────────────────────────────────────────────
$stmt = $conn->prepare("INSERT INTO loan (full_name, reg_no, course_name, year, phone, nida, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssisss", $full_name, $reg_no, $course_name, $year, $phone, $nida, "Pending");

if ($stmt->execute()) {
    $new_id = mysqli_insert_id($conn);

    echo json_encode([
        "success"    => true,
        "message"    => "Your loan application has been submitted successfully! We will review it and contact you shortly.",
        "application_id" => $new_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to submit application: " . $stmt->error
    ]);
}

exit();
?>
