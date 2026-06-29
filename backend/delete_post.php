<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Njia batili.']);
    exit();
}

$post_id = intval($_POST['post_id'] ?? 0);

if (!$post_id) {
    echo json_encode(['success' => false, 'message' => 'Hakuna post_id.']);
    exit();
}

$sql = "DELETE FROM post WHERE post_id='$post_id'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true, 'message' => 'Makala imefutwa!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Hitilafu: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
