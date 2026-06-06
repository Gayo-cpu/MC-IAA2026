<?php
require_once 'api/config.php';

$conn = getDBConnection();

try {
    // Insert sample news
    $conn->exec("INSERT INTO news (title, content, author, status) VALUES
        ('Welcome to MCIAA', 'Welcome to the Muslim Community Islamic Association of Arusha. We are excited to launch our new website and community platform.', 'Admin', 'published'),
        ('Ramadan 2026 Schedule', 'The Ramadan schedule for 2026 has been finalized. Taraweeh prayers will begin at 8:00 PM daily. Please check the mosque for detailed timings.', 'Admin', 'published'),
        ('Youth Program Launch', 'We are launching a new youth development program focused on Islamic education and community service. Registration is now open for ages 13-25.', 'Admin', 'draft')");

    // Insert sample donations
    $conn->exec("INSERT INTO donations (donor_name, donor_email, amount, message, status) VALUES
        ('Ahmed Hassan', 'ahmed@example.com', 100.00, 'Supporting the mosque renovation project', 'pending'),
        ('Fatima Omar', 'fatima@example.com', 50.00, 'For the youth programs', 'approved')");

    // Insert sample contacts
    $conn->exec("INSERT INTO contacts (name, email, subject, message, status) VALUES
        ('John Smith', 'john@example.com', 'Partnership Inquiry', 'I would like to discuss potential partnership opportunities with MCIAA.', 'new'),
        ('Sarah Johnson', 'sarah@example.com', 'Event Question', 'Can you provide more details about the upcoming community iftar?', 'read')");

    echo "Sample data inserted successfully!\n";
} catch(PDOException $e) {
    echo "Error inserting sample data: " . $e->getMessage() . "\n";
}
?>