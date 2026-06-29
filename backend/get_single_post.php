<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include '../config/db.php';

$post_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($post_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Kitambulisho cha makala si sahihi.']);
    exit();
}

$sql = "SELECT p.post_id, p.title, p.content, p.image_url, p.is_published, p.created_at,
               u.fullname AS author_name
        FROM post p
        LEFT JOIN users u ON p.author_id = u.userid
        WHERE p.post_id = $post_id AND p.is_published = 1";

$result = mysqli_query($conn, $sql);

if (!$result || mysqli_num_rows($result) === 0) {
    echo json_encode(['success' => false, 'message' => 'Makala haikupatikana.']);
    exit();
}

$post = mysqli_fetch_assoc($result);
echo json_encode(['success' => true, 'data' => $post]);

mysqli_close($conn);
?>
