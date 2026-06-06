<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single contact
            $stmt = $conn->prepare("SELECT * FROM contacts WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $contact = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($contact ?: ['error' => 'Contact not found']);
        } else {
            // Get all contacts
            $stmt = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC");
            $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($contacts);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, subject, and message are required']);
            break;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email format']);
            break;
        }

        $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['subject'],
            $data['message'],
            $data['status'] ?? 'new'
        ]);

        echo json_encode(['id' => $conn->lastInsertId(), 'message' => 'Contact message sent successfully']);
        break;

    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Contact ID is required']);
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
        $stmt = $conn->prepare("UPDATE contacts SET " . implode(', ', $updateFields) . " WHERE id = ?");
        $stmt->execute($params);

        echo json_encode(['message' => 'Contact updated successfully']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Contact ID is required']);
            break;
        }

        $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
        $stmt->execute([$_GET['id']]);

        echo json_encode(['message' => 'Contact deleted successfully']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>