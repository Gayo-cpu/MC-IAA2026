<?php
require_once "../config/db.php";

function security($defence){
    $defence = htmlspecialchars($defence);
    $defence = trim($defence);
    $defence = stripslashes($defence);
}

function isLoggedIn(): bool {
    return isset($_SESSION['userid']);
}

function getDonorInfo(mysqli $conn): array {
    if(isLoggedIn()){
        // return only the user id 
        return [
            'user_id' => (int) $_SESSION['userid'],
            'donor_name' => NULL,
            'donor_email' => NULL,
            'donor_phone' => NULL,
        ];
    }
    // for registered donors
    $email= security($_POST['email'] ?? '');

    $stmt = $conn->prepare("SELECT userid FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $results= $stmt->get_result();
    $user = $results->fetch_assoc();
    $stmt->close();

    if($user){
        return [
            'user_id' => (int) $user['userid'],
            'donor_name'=> null,
            'donor_email' => NULL,
            'donor_phone' => NULL,
            'is_guest' =>false,
        ];
    }
    // for guest donors
    return [
        'user_id' => NULL,
        'donor_name' => security($_POST['full_name'] ?? 'guest'),
        'donor_email' => $email,
        'donor_phone' => security($_POST['phone'] ?? '')
    ];
}

function saveDonation(mysqli $conn, array $donor, float $amount, string $donateType, string $paymentMethod, string $transcation_id, string $message, string $category ): {
    $query = "INSERT INTO donation(user_id, donor_name, donor_email, donor_phone, amount, donate_type, payment_method, transaction_reference, messages, donation_title)
    VALUES(?,?,?,?,?,?,?,?,?,?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param(
        "isssdsssss"
        $donor['userid'],
        $donor['donor_name'],
        $donor['donor_email'],
        $donor['donor_phone'],
        $amount,
        $donateType,
        $paymentMethod,
        $transcation_id,
        $message,
        $category
    );
    $stmt->excute();
    $insertId = (int) $conn->insert_id;
    $stmt->exit();
    return $insertedId;
}

if ($_SEVER['REQUEST_METHOD'] !== 'POST'){
    header("Location: donate.html");
    exit;
}


$category = security($_POST['category']);
$donor = getDonorInfo($conn);
$amount = (float) security($_POST['amount'] ?? 0.00);
$donateType = security($_POST['donation_type']);
$paymentMethod = security($_POST['payment_method']);
$transcation_id = 'TXN-' . strtoupper(bin2hex(random_bytes(8)));
$message = security($_POST['message']);

$donation = saveDonation($conn, $donor, $amount, $donateType, $paymentMethod, $transcation_id, $message);


?>