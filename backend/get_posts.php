<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include '../config/db.php';

// Fetch all published posts with author name
$sql = "SELECT p.post_id, p.title, p.content, p.image_url, p.is_published, p.created_at,
               u.fullname AS author_name
        FROM post p
        LEFT JOIN users u ON p.author_id = u.userid
        WHERE p.is_published = 1
        ORDER BY p.created_at DESC";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
    exit();
}

$posts = [];
while ($row = mysqli_fetch_assoc($result)) {
    // Add short summary (first 150 chars of content)
    $row['summary'] = mb_substr(strip_tags($row['content']), 0, 150) . '...';
    $posts[] = $row;
}

echo json_encode(['success' => true, 'data' => $posts]);

mysqli_close($conn);
?>
