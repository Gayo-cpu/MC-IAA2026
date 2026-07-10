<?php
header("Content-Type: application/json");
require "../config/db.php";

// Check database connection
if (!isset($conn) || !$conn) {
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit;
}

// Accept POST only
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// ─── GET & VALIDATE FIELDS ─────────────────────────────────
$full_name = trim($_POST["full_name"] ?? "");
$amount      = trim($_POST["amount"]      ?? "");
$duration    = trim($_POST["duration"]    ?? "");
$reg_no      = trim($_POST["reg_no"]      ?? "");
$course      = trim($_POST["course"]      ?? "");
$year_of_study = trim($_POST["year_of_study"] ?? "");
$phone       = trim($_POST["phone"]       ?? "");
$loan_category = trim($_POST["loan_category"] ?? "student_loan");

if (empty($full_name) || empty($amount) || empty($duration)) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

if (!is_numeric($amount) || $amount <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Amount must be a positive number."
    ]);
    exit;
}

// ─── SANITIZE ──────────────────────────────────────────────
$full_name = mysqli_real_escape_string($conn, $full_name);
$amount      = (float) $amount;
$duration    = mysqli_real_escape_string($conn, $duration);
$reg_no      = mysqli_real_escape_string($conn, $reg_no);
$course      = mysqli_real_escape_string($conn, $course);
$year_of_study = mysqli_real_escape_string($conn, $year_of_study);
$phone       = mysqli_real_escape_string($conn, $phone);
$loan_category = mysqli_real_escape_string($conn, $loan_category);
$status = "Pending";

// ─── Generate Loan ID e.g. LN-00042 ───────────────────────
$count_res = mysqli_query($conn, "SELECT COUNT(*) AS total FROM loans");
$count_row = mysqli_fetch_assoc($count_res);
$next_num  = (int)$count_row["total"] + 1;
$loan_id   = "LN-" . str_pad($next_num, 5, "0", STR_PAD_LEFT);

// ─── INSERT ────────────────────────────────────────────────
$stmt = $conn->prepare("INSERT INTO loans (full_name, reg_no, course, year_of_study, phone, loan_category, amount, reason, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit;
}
$stmt->bind_param("ssssssdss", $full_name, $reg_no, $course, $year_of_study, $phone, $loan_category, $amount, $duration, $status);
if ($stmt->execute()) {
    $new_numeric_id = $conn->insert_id;

    echo json_encode([
        "success" => true,
        "message" => "Loan added successfully.",
        "loan_id" => $new_numeric_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to add loan: " . $stmt->error
    ]);
}
exit();
