<?php
// fetch_members.php
// Returns all members from users table as JSON

session_start();
header("Content-Type: application/json");
require_once "../config/db.php";

// Protect — must be logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized."]);
    exit;
}

$search = trim($_GET["search"] ?? "");

if (!empty($search)) {
    $like = "%" . $search . "%";
    $stmt = $conn->prepare(
        "SELECT userid, fullname, phonenumber, gender, status, role
         FROM users
         WHERE fullname     LIKE ?
            OR phonenumber  LIKE ?
            OR role         LIKE ?
         ORDER BY fullname ASC"
    );
    $stmt->bind_param("sss", $like, $like, $like);
} else {
    $stmt = $conn->prepare(
        "SELECT userid, fullname, phonenumber, gender, status, role
         FROM users
         ORDER BY fullname ASC"
    );
}

$stmt->execute();
$result = $stmt->get_result();

$members = [];
while ($row = $result->fetch_assoc()) {
    $members[] = [
        "id"     => $row["userid"],
        "name"   => $row["fullname"],
        "phone"  => $row["phonenumber"] ?? "—",
        "gender" => ucfirst($row["gender"] ?? "—"),
        "status" => $row["status"] ?? "active",
        "role"   => $row["role"]   ?? "member"
    ];
}

echo json_encode([
    "success" => true,
    "count"   => count($members),
    "members" => $members
]);

$stmt->close();
$conn->close();
?>
