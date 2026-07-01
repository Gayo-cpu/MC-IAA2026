<?php
// fetch_loans.php
// Returns all loan records as JSON for the loans table

header("Content-Type: application/json");

// ─── DB CONFIG ──────────────────────────────────────────────
$host   = "localhost";
$dbname = "mciaa";   // ← your database name
$user   = "root";          // ← your DB username
$pass   = "";              // ← your DB password
// ────────────────────────────────────────────────────────────

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . mysqli_connect_error()
    ]);
    exit;
}

// ─── OPTIONAL SEARCH FILTER ────────────────────────────────
// Pass ?search=keyword to filter by member name, loan id, or status
$search = trim($_GET["search"] ?? "");

if (!empty($search)) {
    $search = mysqli_real_escape_string($conn, $search);
    $sql = "SELECT loan_id, member_name, amount, duration, status, created_at
            FROM loans
            WHERE member_name LIKE '%$search%'
               OR loan_id     LIKE '%$search%'
               OR status      LIKE '%$search%'
            ORDER BY created_at DESC";
} else {
    $sql = "SELECT loan_id, member_name, amount, duration, status, created_at
            FROM loans
            ORDER BY created_at DESC";
}

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Query failed: " . mysqli_error($conn)
    ]);
    exit;
}

// ─── BUILD ROWS ARRAY ──────────────────────────────────────
$loans = [];

while ($row = mysqli_fetch_assoc($result)) {
    $loans[] = [
        "loan_id"     => $row["loan_id"],
        "member_name" => $row["member_name"],
        "amount"      => number_format((float)$row["amount"], 0, '.', ','),
        "duration"    => $row["duration"],
        "status"      => $row["status"],
        "date"        => date("d M Y", strtotime($row["created_at"]))
    ];
}

echo json_encode([
    "success" => true,
    "count"   => count($loans),
    "loans"   => $loans
]);

mysqli_close($conn);
?>
