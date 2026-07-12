<?php
// fetch_logs.php
session_start();
header("Content-Type: application/json");
require_once "../config/db.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized."]);
    exit;
}

$search = trim($_GET["search"] ?? "");

if (!empty($search)) {
    $like = "%" . $search . "%";
    $stmt = $conn->prepare(
        "SELECT l.log_id, u.fullname, u.role, u.role_description, l.ip_address, l.created_at
         FROM admin_logs l
         JOIN users u ON u.userid = l.admin_id
         WHERE u.fullname LIKE ? OR u.role LIKE ?
         ORDER BY l.created_at DESC"
    );
    $stmt->bind_param("ss", $like, $like);
} else {
    $stmt = $conn->prepare(
        "SELECT l.log_id, u.fullname, u.role, u.role_description, l.ip_address, l.created_at
         FROM admin_logs l
         JOIN users u ON u.userid = l.admin_id
         ORDER BY l.created_at DESC"
    );
}

$stmt->execute();
$result = $stmt->get_result();

$logs = [];
while ($row = $result->fetch_assoc()) {
    $logs[] = [
        "name" => $row["fullname"],
        "role" => ucfirst($row["role_description"] ?? $row["role"]),
        "ip"   => $row["ip_address"] ?? "—",
        "date" => date("d M Y H:i A", strtotime($row["created_at"]))
    ];
}

echo json_encode(["success" => true, "count" => count($logs), "logs" => $logs]);
$stmt->close();
$conn->close();
?>
