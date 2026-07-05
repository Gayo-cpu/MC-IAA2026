<?php
header("Content-Type: application/json");
require "../config/db.php";

// Accept POST only
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// ─── GET & VALIDATE FIELDS ─────────────────────────────────
$member_name = trim($_POST["member_name"] ?? "");
$amount      = trim($_POST["amount"]      ?? "");
$duration    = trim($_POST["duration"]    ?? "");

if (empty($member_name) || empty($amount) || empty($duration)) {
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
$member_name = mysqli_real_escape_string($conn, $member_name);
$amount      = (float) $amount;
$duration    = mysqli_real_escape_string($conn, $duration);

// ─── Generate Loan ID e.g. LN-00042 ───────────────────────
$count_res = mysqli_query($conn, "SELECT COUNT(*) AS total FROM loans");
$count_row = mysqli_fetch_assoc($count_res);
$next_num  = (int)$count_row["total"] + 1;
$loan_id   = "LN-" . str_pad($next_num, 5, "0", STR_PAD_LEFT);

// ─── INSERT ────────────────────────────────────────────────
$stmt =$conn->prepare("INSERT INTO loans (loan_id, member_name, amount, duration, status)
        VALUES (?, ?, ?, ?, ?)");

$stmt->bind_param("ssdss", $loan_id, $member_name, $amount, $duration, "Pending");

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Loan added successfully.",
        "loan_id" => $loan_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to add loan: " . $stmt->error
    ]);
}
exit();
?>
