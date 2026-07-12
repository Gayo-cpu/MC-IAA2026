<?php
// promote_leader.php
// Promotes an existing member/student to a leader role

session_start();
header("Content-Type: application/json");
require_once "../config/db.php";

// Only super admin can access this
if (!isset($_SESSION['user_id']) || $_SESSION['role_description'] !== 'super admin') {
    echo json_encode(["success" => false, "message" => "Unauthorized."]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

$user_id      = trim($_POST['user_id']      ?? '');
$role_desc    = trim($_POST['role_description'] ?? '');

// Allowed role descriptions only
$allowed = ['amir', 'amirat', 'secretary', 'fedha', 'habari', 'dean of student', 'super admin'];

if (empty($user_id) || empty($role_desc)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

if (!in_array($role_desc, $allowed)) {
    echo json_encode(["success" => false, "message" => "Invalid role selected."]);
    exit;
}

// ── Check user exists and is a member or student ──────────
$stmt = $conn->prepare("SELECT userid, fullname, role FROM users WHERE userid = ? LIMIT 1");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user) {
    echo json_encode(["success" => false, "message" => "User not found."]);
    exit;
}

// ── Promote: set role to admin and assign role_description ─
$stmt = $conn->prepare(
    "UPDATE users SET role = 'admin', role_description = ? WHERE userid = ?"
);
$stmt->bind_param("si", $role_desc, $user_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => $user['fullname'] . " has been promoted to " . ucwords($role_desc) . " successfully."
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Promotion failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
