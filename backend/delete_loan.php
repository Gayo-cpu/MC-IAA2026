<?php

header("Content-Type: application/json");

$conn = null;
require __DIR__ . "/../config/db.php";

if (!isset($conn) || !$conn instanceof mysqli) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection not established."
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

// Get loan ID
$loan_id = trim($_POST["loan_id"] ?? "");

if (empty($loan_id)) {


    echo json_encode([
        "success" => false,
        "message" => "Loan ID is required."
    ]);

    exit;
}

// Delete record

$stmt = $conn->prepare(
    "DELETE FROM loans WHERE id=?"
);


$loan_id = (int)$loan_id; // Ensure it's an integer
$stmt->bind_param(
    "i",
    $loan_id
);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Loan deleted successfully."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Loan not found."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
