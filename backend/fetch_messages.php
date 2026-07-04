<?php
// fetch_messages.php
// Returns all messages as JSON for the message history table
session_start();
header("Content-Type: application/json");
require "../config/db.php";

$user_id = $SESSION['userid'];
// ─── OPTIONAL SEARCH FILTER ────────────────────────────────
// Pass ?search=keyword to filter results
$search = trim($_GET["search"] ?? "");

if (!empty($search)) {
    $like = "%". $search . "%";
    $stmt = $conn->prepare(
        "SELECT
        m.message_id,
        m.subject,
        m.message_text,
        m.created_at,
        m.is_answered,
        s.role_description AS sender_role,
        r.role_description AS recipient_role
        FROM message m
        JOIN users s ON s.userid = m.sender_id
        JOIN users r ON r.userid = m.replied_by
        WHERE m.sender_id = ? OR m.replied_by = ?
        AND (m.subject LIKE ? OR m.message_text LIKE ?)
        ORDER BY m.created_at DESC"
    );
    $stmt->bind_param("iiss", $user_id, $user_id, $like, $like);
} else {
    $stmt = $conn->prepare(

        "SELECT
        m.message_id,
        m.subject,
        m.message_text,
        m.created_at,
        m.is_answered,
        s.role_description AS sender_role,
        r.role_description AS recipient_role
        FROM messages m
        JOIN users s ON s.userid = m.sender_id
        JOIN user r ON r.userid = m.replied_by
        WHERE m.sender_id = ? OR m.replied_by = ?
        ORDER BY m.created_at DESC"
    );
    $stmt->bind_param("ii", $user_id, $user_id);
    
}
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
while ($row = $result->fetch_assoc()){
    $message[] = [
        "id" => $row["message_id"],
        "subject" => $row["subject"],
        "recipient_role" => $row["sender_role"],
        "date" => date("d M Y, H:i",srtotime($row['created_at'])),
        "status" => $row["is_answered"] ? "Answered" : "Pending"
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($message),
    "messages" => $messages
]);

$stmt->close();
$conn->close();

?>
