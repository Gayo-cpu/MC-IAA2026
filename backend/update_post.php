<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Njia batili.']);
    exit();
}

$post_id     = intval($_POST['post_id'] ?? 0);
$title       = mysqli_real_escape_string($conn, trim($_POST['title'] ?? ''));
$content     = mysqli_real_escape_string($conn, trim($_POST['content'] ?? ''));
$image_url   = mysqli_real_escape_string($conn, trim($_POST['image_url'] ?? ''));
$category    = mysqli_real_escape_string($conn, trim($_POST['category'] ?? 'Announcement'));
$is_published = intval($_POST['is_published'] ?? 1);

if (!$post_id || empty($title) || empty($content)) {
    echo json_encode(['success' => false, 'message' => 'Data haijatosheka.']);
    exit();
}

$sql = "UPDATE post SET
            title='$title',
            content='$content',
            image_url='$image_url',
            is_published='$is_published'
        WHERE post_id='$post_id'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true, 'message' => 'Makala imesasishwa!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Hitilafu: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
