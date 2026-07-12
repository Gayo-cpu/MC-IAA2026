<?php
session_start();
header("Content-Type: application/json");
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // ── STEP 1: Get all fields ───────────────────────────────
    $full_name      = trim($_POST['full_name']      ?? '');
    $reg_number     = trim($_POST['reg_number']     ?? '');
    $course_name    = trim($_POST['course_name']    ?? '');
    $study_year     = trim($_POST['study_year']     ?? '');
    $contact_number = trim($_POST['contact_number'] ?? '');
    $email          = trim($_POST['email']          ?? '');
    $password       = trim($_POST['password']       ?? '');
    $gender         = trim($_POST['gender']         ?? '');
    $role           = trim($_POST['role']           ?? 'member');

    // ── STEP 2: Validate required fields ────────────────────
    if (empty($full_name) || empty($reg_number) || empty($email) || empty($password) || empty($gender) || empty($role)) {
        echo json_encode([
            "success" => false,
            "message" => "All required fields must be filled in."
        ]);
        exit;
    }

    // ── SECURITY: Whitelist roles ────────────────────────────
    // Only member or student allowed through registration
    // Leader roles can ONLY be assigned by super admin
    $allowed_roles = ['member', 'student'];
    if (!in_array($role, $allowed_roles)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid role. Only member or student allowed."
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

    // ── STEP 3: Check if email already exists ────────────────
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

    // ── STEP 4: Hash the password ────────────────────────────
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // ── STEP 5: Insert using prepare and bind_param ──────────
    // role_description always NULL on registration
    // super admin assigns it later through the dashboard
    $role_description = null;

    $stmt = $conn->prepare(
        "INSERT INTO users (fullname, phonenumber, email, password, gender, registration_no, academic_year, role, role_description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param(
        "sssssssss",
        $full_name,
        $contact_number,
        $email,
        $hashed_password,
        $gender,
        $reg_number,
        $study_year,
        $role,
        $role_description
    );

    if ($stmt->execute()) {
        $new_id = $conn->insert_id;
        echo json_encode([
            "success" => true,
            "message" => "Registration successful!",
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
