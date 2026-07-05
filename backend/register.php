<?php
header("Content-Type: application/json");
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $full_name      = trim($_POST['full_name']      ?? '');
    $reg_number     = trim($_POST['reg_number']     ?? '');
    $course_name    = trim($_POST['course_name']    ?? '');
    $study_year     = trim($_POST['study_year']     ?? '');
    $contact_number = trim($_POST['contact_number'] ?? '');
    $email          = trim($_POST['email']          ?? '');
    $password       = trim($_POST['password']       ?? '');
    $gender         = trim($_POST['gender']         ?? '');
    $role           = trim($_POST['role']           ?? 'member');

    // role_description itawekwa na  super admin baadae sio kwenye regitration

    if (empty($full_name) || empty($reg_number) || empty($email) || empty($password) || empty($gender) || empty($role)) {
        echo json_encode([
            "success" => false,
            "message" => "All required fields must be filled in."
        ]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid email address."
        ]);
        exit;
    }

    // kucheck email kama imejirudia
    $stmt = $conn->prepare("SELECT userid FROM users WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode([
            "success" => false,
            "message" => "An account with this email already exists."
        ]);
        $stmt->close();
        exit;
    }
    $stmt->close();

    // kuficha password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // kuingiza data
    $stmt = $conn->prepare(
        "INSERT INTO users (fullname, phonenumber, email, password, gender, registration_no, academic_year, role)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param(
        "ssssssss",
        $full_name,
        $contact_number,
        $email,
        $hashed_password,
        $gender,
        $reg_number,
        $study_year,
        $role
    );
    //interaction ya PHP na JS pindi data zikiwa zinatumwa 
    if ($stmt->execute()) {
        $new_id = $conn->insert_id;
        echo json_encode([
            "success" => true,
            "message" => "Registration successful! You can now log in.",
            "user_id" => $new_id,
            "name"    => $full_name,
            "role"    => $role
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Registration failed: " . $stmt->error
        ]);
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
