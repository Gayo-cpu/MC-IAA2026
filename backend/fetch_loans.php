<?php
// fetch_loans.php
header("Content-Type: application/json");
require "../config/db.php";

if (!isset($conn)) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

// SEARCH FILTER
$search = trim($_GET["search"] ?? "");

if (!empty($search)) {
    $search = mysqli_real_escape_string($conn, $search);

    // FIXED: Swapped 'loan_id' for 'id' and 'year' for 'year_of_study'
    $sql = "
    SELECT 
        id,
        full_name,
        reg_no,
        course,
        year_of_study,
        phone,
        loan_category,
        amount,
        reason,
        status,
        created_at AS date
    FROM loans
    WHERE 
        full_name LIKE '%$search%'
        OR reg_no LIKE '%$search%'
        OR id LIKE '%$search%'
        OR status LIKE '%$search%'
    ORDER BY created_at DESC
    ";
} else {
    // FIXED: Swapped 'loan_id' for 'id' and 'year' for 'year_of_study'
    $sql = "
    SELECT 
        id,
        full_name,
        reg_no,
        course,
        year_of_study,
        phone,
        loan_category,
        amount,
        reason,
        status,
        created_at AS date
    FROM loans
    ORDER BY created_at DESC
    ";
}

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);
    exit;
}

$loans = [];

while ($row = mysqli_fetch_assoc($result)) {
    $loans[] = [
        "loan_id"       => $row["id"],
        "full_name"     => $row["full_name"],
        "reg_no"        => $row["reg_no"],
        "course"        => $row["course"],
        "year"          => $row["year_of_study"],
        "phone"         => $row["phone"],
        "loan_category" => $row["loan_category"],
        "amount" => (float)$row["amount"],
        "reason"        => $row["reason"],
        "status"        => !empty($row["status"]) ? $row["status"] : "Pending",
        "date"          => date("d M Y", strtotime($row["date"]))
    ];
}

echo json_encode([
    "success" => true,
    "count"   => count($loans),
    "loans"   => $loans
]);

mysqli_close($conn);
