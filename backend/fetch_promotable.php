<?php
// fetch_promotable.php
// Returns all users who are members or students (can be promoted to leaders)

session_start();
header("Content-Type: application/json");
require_once "../config/db.php";

// Only super admin can access this
if (!isset($_SESSION['user_id']) || $_SESSION['role_description'] !== 'super admin') {
    echo json_encode(["success" => false, "message" => "Unauthorized."]);
    exit;
}

$search = trim($_GET['search'] ?? '');

if (!empty($search)) {
    $like = "%" . $search . "%";
    $stmt = $conn->prepare(
        "SELECT userid, fullname, email, phonenumber, role, role_description, registration_no
         FROM users
         WHERE (role IN ('member', 'student') OR role_description IS NULL OR role_description = '')
           AND (fullname LIKE ? OR email LIKE ? OR registration_no LIKE ?)
         ORDER BY fullname ASC"
    );
    $stmt->bind_param("sss", $like, $like, $like);
} else {
    $stmt = $conn->prepare(
        "SELECT userid, fullname, email, phonenumber, role, role_description, registration_no
         FROM users
         WHERE role IN ('member', 'student') OR role_description IS NULL OR role_description = ''
         ORDER BY fullname ASC"
    );
}

$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = [
        "id"          => $row['userid'],
        "name"        => $row['fullname'],
        "email"       => $row['email'],
        "phone"       => $row['phonenumber'] ?? '—',
        "role"        => $row['role'],
        "role_desc"   => $row['role_description'] ?? 'None',
        "reg_no"      => $row['registration_no']
    ];
}

echo json_encode(["success" => true, "count" => count($users), "users" => $users]);

$stmt->close();
$conn->close();
?>
