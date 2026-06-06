<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single news item
            $stmt = $conn->prepare("SELECT * FROM news WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $news = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($news ?: ['error' => 'News not found']);
        } else {
            // Get all published news
            $stmt = $conn->query("SELECT * FROM news WHERE status = 'published' ORDER BY created_at DESC");
            $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($news);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['title']) || !isset($data['content'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Title and content are required']);
            break;
        }

        $stmt = $conn->prepare("INSERT INTO news (title, content, author, status) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['title'],
            $data['content'],
            $data['author'] ?? 'Admin',
            $data['status'] ?? 'draft'
        ]);

        echo json_encode(['id' => $conn->lastInsertId(), 'message' => 'News created successfully']);
        break;

    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'News ID is required']);
            break;
        }

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid data']);
            break;
        }

        $updateFields = [];
        $params = [];

        if (isset($data['title'])) {
            $updateFields[] = "title = ?";
            $params[] = $data['title'];
        }
        if (isset($data['content'])) {
            $updateFields[] = "content = ?";
            $params[] = $data['content'];
        }
        if (isset($data['author'])) {
            $updateFields[] = "author = ?";
            $params[] = $data['author'];
        }
        if (isset($data['status'])) {
            $updateFields[] = "status = ?";
            $params[] = $data['status'];
        }

        if (empty($updateFields)) {
            http_response_code(400);
            echo json_encode(['error' => 'No fields to update']);
            break;
        }

        $params[] = $_GET['id'];
        $stmt = $conn->prepare("UPDATE news SET " . implode(', ', $updateFields) . " WHERE id = ?");
        $stmt->execute($params);

        echo json_encode(['message' => 'News updated successfully']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'News ID is required']);
            break;
        }

        $stmt = $conn->prepare("DELETE FROM news WHERE id = ?");
        $stmt->execute([$_GET['id']]);

        echo json_encode(['message' => 'News deleted successfully']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>