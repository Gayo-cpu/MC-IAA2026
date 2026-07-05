<?php
session_start();
header("Content-Type: application/json");
require "../config/db.php";

$sender_id = $_SESSION["userid"] ?? null;
$message_id = trim($_POST["message_id"] ?? null);
$content = trim($_POST["content"] ?? null);

if(empty($sender_id) || empty($message_id) || empty($content)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

<!-- Check the sender in the user table -->
$stmt = $conn->prepare("SELECT role_description FROM users WHERE userid = ?");
$stmt->bind_param("i", $sender_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$stmt->close();

$sender_role = $result['role_description'];

<!-- fetch replies from the message row -->
$stmt = $conn->prepare("SELECT reply_text FROM messages WHERE message_id = ?");
$stmt->bind_param("i", $message_id);
$stmt->execute();
$row = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$row){
    die(json_encode(["success" => false, "Message not found"]));
}

<!-- Decode existing replies - start empty array if NULL -->
$replies = json_decode($row['reply_text'], true) ?? [];
<!-- add the new reply to the array -->
$replies[] = [
    "sender"  => $sender_role,
    "content" => $content,
    "sent_at" => date("Y-m-d H:i:s")
    ];
    
    <!-- Encode back to JSON and update the same row -->
    $updated_replies = json_encode($replies);
    
    $stmt = $conn->prepare("UPDATE messages SET reply_text = ?, replied_by = ?, is_answered = 1, replied_at = NOW() WHERE message_id = ?");
    $stmt->bind_param("sii", $updated_replies, $sender_id, $message_id);
    
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Reply sent."]);
    } else {
        echo json_encode(["success" => false, "message" => $stmt->error]);
    }
    
    $stmt->close();
    $conn->close();
    ?>
