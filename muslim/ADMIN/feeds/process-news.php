<?php
// process-news.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Sanitize text string elements to protect data integrity
    $title = trim(htmlspecialchars($_POST['title']));
    $category = trim(htmlspecialchars($_POST['category']));
    $snippet = trim(htmlspecialchars($_POST['snippet']));
    $content = trim(htmlspecialchars($_POST['content']));

    // 2. Check file upload process flow
    if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['thumbnail']['tmp_name'];
        $fileName = $_FILES['thumbnail']['name'];
        $fileSize = $_FILES['thumbnail']['size'];

        // Isolate extension types safely
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

        if (in_array($fileExtension, $allowedExtensions)) {
            // Give the file a completely unique name using random timestamps to avoid overwrite loops
            $newFileName = 'news_' . time() . '_' . rand(1000, 9999) . '.' . $fileExtension;

            // Set the target server directory path destination
            $uploadFileDir = '../../uploads/news/';
            $dest_path = $uploadFileDir . $newFileName;

            // Move the file out of temp storage into your permanent directory folder
            if (move_uploaded_file($fileTmpPath, $dest_path)) {

                // 3. Insert records securely into database via PDO Prepared Statements
                $sql = "INSERT INTO mciaa_news (title, category, image_path, snippet, content) VALUES (:title, :category, :image_path, :snippet, :content)";
                $stmt = $pdo->prepare($sql);

                $stmt->execute([
                    ':title'      => $title,
                    ':category'   => $category,
                    ':image_path' => $dest_path, // Saving file path string reference location
                    ':snippet'    => $snippet,
                    ':content'    => $content
                ]);

                header("Location: admin-upload.php?success=1");
                exit();
            } else {
                header("Location: admin-upload.php?error=Error moving file package to server destination directory.");
                exit();
            }
        } else {
            header("Location: admin-upload.php?error=Invalid file formatting. Only JPG, JPEG, PNG, and WEBP supported.");
            exit();
        }
    } else {
        header("Location: admin-upload.php?error=Cover thumbnail file execution failed on transfer.");
        exit();
    }
} else {
    header("Location: admin-upload.php");
    exit();
}
