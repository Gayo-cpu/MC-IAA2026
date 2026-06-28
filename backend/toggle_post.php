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

// Get current status
$check = mysqli_query($conn, "SELECT is_published FROM post WHERE post_id='$post_id'");
if (mysqli_num_rows($check) === 0) {
    echo json_encode(['success' => false, 'message' => 'Makala haikupatikana.']);
    exit();
}
$row = mysqli_fetch_assoc($check);
$new_status = $row['is_published'] == 1 ? 0 : 1;

mysqli_query($conn, "UPDATE post SET is_published='$new_status' WHERE post_id='$post_id'");

$status_label = $new_status == 1 ? 'Published' : 'Draft';
echo json_encode(['success' => true, 'message' => "Hali imebadilishwa: $status_label", 'is_published' => $new_status]);

mysqli_close($conn);
?>
