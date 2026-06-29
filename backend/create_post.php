<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start();
include '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Njia batili.']);
    exit();
}

$title       = mysqli_real_escape_string($conn, trim($_POST['title'] ?? ''));
$content     = mysqli_real_escape_string($conn, trim($_POST['content'] ?? ''));
$summary     = mysqli_real_escape_string($conn, trim($_POST['summary'] ?? ''));
$image_url   = mysqli_real_escape_string($conn, trim($_POST['image_url'] ?? ''));
$category    = mysqli_real_escape_string($conn, trim($_POST['category'] ?? 'Announcement'));
$is_published = intval($_POST['is_published'] ?? 1);
$author_id   = intval($_POST['author_id'] ?? 1);

if (empty($title) || empty($content)) {
    echo json_encode(['success' => false, 'message' => 'Kichwa na maudhui ni lazima.']);
    exit();
}

// Use summary if provided, else auto-generate
if (empty($summary)) {
    $summary = mb_substr(strip_tags($content), 0, 150) . '...';
    $summary = mysqli_real_escape_string($conn, $summary);
}

$sql = "INSERT INTO post (author_id, title, content, image_url, is_published, created_at)
        VALUES ('$author_id', '$title', '$content', '$image_url', '$is_published', NOW())";

if (mysqli_query($conn, $sql)) {
    $new_id = mysqli_insert_id($conn);
    echo json_encode(['success' => true, 'message' => 'Makala imechapishwa!', 'post_id' => $new_id]);
} else {
    echo json_encode(['success' => false, 'message' => 'Hitilafu: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
