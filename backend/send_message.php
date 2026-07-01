<?php
// Handles saving a new message from the form
header("Content-Type: application/json");
require_once "../config/db.php";

// Only accept POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}
$sender_id = $_SESSION["user_id"] ?? null;
$recipient_role = trim($_POST["recipient"] ?? "");
$subject   = trim($_POST["subject"]   ?? "");
$content   = trim($_POST["content"]   ?? "");

if (empty($recipient_role) || empty($subject) || empty($content)) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE role = ? LIMIT 1");
$stmt->bind_param("s", $recipient_role);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "No user found with the specified role."
    ]);
    exit;
}
$recipient = $result->fetch_assc();
$stmt->close();

$recipient_id = $recipient['id'];


$stmt =$conn->prepare("INSERT INTO messages (sender_id, replied_by, message_text, subjct )
        VALUES (?, ?, ?, ?)");

$stmt->bind_param("iiss", $sender_id, $recipient_id, $content, $subject);

if ($stmt->execute()) {
    $new_id = $conn->insert_id;
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully.",
        "id"      => $new_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to send message: " . $stmt->error
    ]);
}

$stmt->close();
?>
