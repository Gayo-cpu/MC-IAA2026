<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include '../config/db.php';

// If ?all=1, return all posts (for admin dashboard)
// Otherwise return only published posts (for public news page)
$showAll = isset($_GET['all']) && $_GET['all'] == '1';

if ($showAll) {
    $sql = "SELECT p.post_id, p.title, p.content, p.image_url, p.is_published, p.created_at,
                   u.fullname AS author_name
            FROM post p
            LEFT JOIN users u ON p.author_id = u.userid
            ORDER BY p.created_at DESC";
} else {
    $sql = "SELECT p.post_id, p.title, p.content, p.image_url, p.is_published, p.created_at,
                   u.fullname AS author_name
            FROM post p
            LEFT JOIN users u ON p.author_id = u.userid
            WHERE p.is_published = 1
            ORDER BY p.created_at DESC";
}

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
    exit();
}

$posts = [];
while ($row = mysqli_fetch_assoc($result)) {
    $row['summary'] = mb_substr(strip_tags($row['content']), 0, 150) . '...';
    $posts[] = $row;
}

echo json_encode(['success' => true, 'data' => $posts]);
mysqli_close($conn);
?>
