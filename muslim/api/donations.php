<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single donation
            $stmt = $conn->prepare("SELECT * FROM donations WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $donation = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($donation ?: ['error' => 'Donation not found']);
        } else {
            // Get all donations
            $stmt = $conn->query("SELECT * FROM donations ORDER BY created_at DESC");
            $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($donations);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['donorName']) || !isset($data['donorEmail']) || !isset($data['amount'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Donor name, email, and amount are required']);
            break;
        }

        if (!is_numeric($data['amount']) || $data['amount'] <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid donation amount']);
            break;
        }

        $stmt = $conn->prepare("INSERT INTO donations (donor_name, donor_email, amount, message, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['donorName'],
            $data['donorEmail'],
            $data['amount'],
            $data['message'] ?? '',
            $data['status'] ?? 'pending'
        ]);

        echo json_encode(['id' => $conn->lastInsertId(), 'message' => 'Donation submitted successfully']);
        break;

    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Donation ID is required']);
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
        $stmt = $conn->prepare("UPDATE donations SET " . implode(', ', $updateFields) . " WHERE id = ?");
        $stmt->execute($params);

        echo json_encode(['message' => 'Donation updated successfully']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Donation ID is required']);
            break;
        }

        $stmt = $conn->prepare("DELETE FROM donations WHERE id = ?");
        $stmt->execute([$_GET['id']]);

        echo json_encode(['message' => 'Donation deleted successfully']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>