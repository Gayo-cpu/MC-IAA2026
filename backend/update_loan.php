<?php

header("Content-Type: application/json");

$maybeConn = require_once __DIR__ . "/../config/db.php";
if (!isset($conn) && $maybeConn instanceof mysqli) {
    $conn = $maybeConn;
}

if (!isset($conn) || !($conn instanceof mysqli)) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);
    exit;
}

// Only accept POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);

    exit;
}


// Get data
$loan_id = trim($_POST["loan_id"] ?? "");
$status  = trim($_POST["status"] ?? "");


if (empty($loan_id) || empty($status)) {

    echo json_encode([
        "success" => false,
        "message" => "Loan ID and status are required."
    ]);

    exit;
}


// Allowed statuses
$allowed_status = ["Pending", "Approved", "Rejected", "pending", "approved", "rejected"];


if (!in_array($status, $allowed_status)) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid loan status."
    ]);

    exit;
}


// Update database
$stmt = $conn->prepare(
    "UPDATE loans SET status=? WHERE id=?"
);


$loan_id = (int)$loan_id;
$stmt->bind_param("si", $status, $loan_id);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Loan status processed successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
exit();
