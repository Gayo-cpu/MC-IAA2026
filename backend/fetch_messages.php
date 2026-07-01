<?php
// fetch_messages.php
// Returns all messages as JSON for the message history table

header("Content-Type: application/json");
require "../config/db.php";
// ─── OPTIONAL SEARCH FILTER ────────────────────────────────
// Pass ?search=keyword to filter results
$search = trim($_GET["search"] ?? "");

if (!empty($search)) {
    $search = mysqli_real_escape_string($conn, $search);
    $sql = "SELECT id, recipient, subject, sent_at, status
            FROM messages
            WHERE recipient LIKE '%$search%'
               OR subject   LIKE '%$search%'
               OR content   LIKE '%$search%'
            ORDER BY sent_at DESC";
} else {
    $sql = "SELECT id, recipient, subject, sent_at, status
            FROM messages
            ORDER BY sent_at DESC";
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
$messages = [];

while ($row = mysqli_fetch_assoc($result)) {
    $messages[] = [
        "id"        => $row["id"],
        "recipient" => $row["recipient"],
        "subject"   => $row["subject"],
        "date"      => date("d M Y, H:i", strtotime($row["sent_at"])),
        "status"    => $row["status"]
    ];
}

echo json_encode([
    "success"  => true,
    "count"    => count($messages),
    "messages" => $messages
]);

mysqli_close($conn);
?>
