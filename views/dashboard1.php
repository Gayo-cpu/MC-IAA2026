<?php
session_start();
require_once "../config/db.php";

// Protect — must be logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: ../views/login.php");
    exit;
}

$fullname     = $_SESSION['fullname']         ?? 'Admin';
$role_desc    = $_SESSION['role_description'] ?? 'Admin';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MCIAA Dashboard</title>
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/members.css" />
    <link rel="stylesheet" href="../css/loans.css" />
    <link rel="stylesheet" href="../css/donations.css" />
    <link rel="stylesheet" href="../css/posts.css" />
    <link rel="stylesheet" href="../css/logs.css" />
    <link rel="stylesheet" href="../css/messages.css" />
    <link rel="stylesheet" href="../css/register.css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    <link rel="shortcut icon" href="../IMAGES/MCIAA.png" />

    <style>
        /* Hide all sections by default — JS shows the active one */
        .page-section { display: none; }
        .page-section.active { display: block; }
        .sidebar ul li a.active { background: rgba(255,255,255,0.15); font-weight: 600; }
    </style>
</head>
<body>

    <!-- ═══════════════════════════════════════════
         SIDEBAR — one copy shared by all pages
    ════════════════════════════════════════════ -->
    <aside class="sidebar">
        <div class="logo-area">
            <img src="../IMAGES/image.png" alt="MCIAA logo" class="logo-img" />
            <div>
                <h2>MCIAA <span>Association</span></h2>
                <span class="subtitle"><?= htmlspecialchars(ucwords($role_desc)) ?></span>
            </div>
        </div>

        <ul>
            <li><a href="#" class="nav-link active" data-page="index"><i class="fa-solid fa-house"></i> Dashboard</a></li>
            <li><a href="#" class="nav-link" data-page="members"><i class="fa-solid fa-users"></i> Members</a></li>
            <li><a href="#" class="nav-link" data-page="loans"><i class="fa-solid fa-hand-holding-dollar"></i> Loans</a></li>
            <li><a href="#" class="nav-link" data-page="donations"><i class="fa-solid fa-heart"></i> Donations</a></li>
            <li><a href="#" class="nav-link" data-page="posts"><i class="fa-solid fa-newspaper"></i> Posts</a></li>
            <li><a href="#" class="nav-link" data-page="logs"><i class="fa-solid fa-clock-rotate-left"></i> Logs</a></li>
            <li><a href="#" class="nav-link" data-page="messages"><i class="fa-solid fa-envelope"></i> Messages</a></li>
            <li><a href="#" class="nav-link" data-page="promote"><i class="fa-solid fa-user-shield"></i> Promote Leaders</a></li>
            <li><a href="#" class="nav-link" data-page="register"><i class="fa-solid fa-user-plus"></i> Register Member</a></li>
            <li><a href="../views/login.php"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
        </ul>
    </aside>

    <main class="main-content">

    <!-- ═══════════════════════════════════════════
         PAGE: INDEX (Dashboard Overview)
    ════════════════════════════════════════════ -->
    <section id="page-index" class="page-section active">
        <div class="topbar">
            <div>
                <h1>Dashboard</h1>
                <p>Welcome, <?= htmlspecialchars($fullname) ?></p>
            </div>
            <div class="profile">
                <div class="notification">
                    <i class="fa-solid fa-bell"></i>
                    <span id="notifCount">0</span>
                </div>
                <img src="../IMAGES/image.png" alt="" />
            </div>
        </div>

        <section class="stats">
            <div class="card">
                <i class="fa-solid fa-users"></i>
                <h2 id="statMembers">—</h2>
                <p>Total Members</p>
            </div>
            <div class="card">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <h2 id="statLoans">—</h2>
                <p>Total Loans</p>
            </div>
            <div class="card">
                <i class="fa-solid fa-heart"></i>
                <h2 id="statDonations">—</h2>
                <p>Donations</p>
            </div>
            <div class="card">
                <i class="fa-solid fa-newspaper"></i>
                <h2 id="statPosts">—</h2>
                <p>Posts</p>
            </div>
        </section>

        <section class="recent-section">
            <div class="recent-posts">
                <h3>Recent Posts</h3>
                <div id="recentPostsList"></div>
            </div>
            <div class="quick-info">
                <h3>Quick Summary</h3>
                <div class="summary-box"><span>Active Members</span><strong id="sumActiveMembers">—</strong></div>
                <div class="summary-box"><span>Pending Loans</span><strong id="sumPendingLoans">—</strong></div>
                <div class="summary-box"><span>Total Donations</span><strong id="sumTotalDonations">—</strong></div>
            </div>
        </section>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: MEMBERS
    ════════════════════════════════════════════ -->
    <section id="page-members" class="page-section">
        <div class="container">
            <div class="page-header">
                <div><h1>Registered Members</h1><p>View all registered members</p></div>
                <div class="member-count">
                    <i class="fa-solid fa-users"></i>
                    <span id="memberCountLabel">0 Members</span>
                </div>
            </div>
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="searchInput" placeholder="Search member..." />
            </div>
            <div class="table-container">
                <table id="membersTable">
                    <thead>
                        <tr><th>ID</th><th>Full Name</th><th>Phone</th><th>Gender</th><th>Status</th></tr>
                    </thead>
                    <tbody><!-- filled by JS --></tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: LOANS
    ════════════════════════════════════════════ -->
    <section id="page-loans" class="page-section">
        <div class="container">
            <div class="page-header">
                <div><h1>Loans Overview</h1><p>View all loan records</p></div>
            </div>
            <div class="stats-grid">
                <div class="stat-card"><i class="fa-solid fa-money-bill-wave"></i><h2 id="loanTotal">—</h2><p>Total Loans</p></div>
                <div class="stat-card"><i class="fa-solid fa-circle-check"></i><h2 id="loanRefunded">—</h2><p>Refunded</p></div>
                <div class="stat-card"><i class="fa-solid fa-clock"></i><h2 id="loanPending">—</h2><p>Pending</p></div>
                <div class="stat-card"><i class="fa-solid fa-circle-xmark"></i><h2 id="loanNotRefunded">—</h2><p>Not Refunded</p></div>
            </div>
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="loanSearch" placeholder="Search loan..." />
            </div>
            <div class="table-container">
                <table id="loanTable">
                    <thead>
                        <tr><th>Loan ID</th><th>Member</th><th>Amount</th><th>Duration</th><th>Status</th><th>Date</th></tr>
                    </thead>
                    <tbody><!-- filled by JS --></tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: DONATIONS
    ════════════════════════════════════════════ -->
    <section id="page-donations" class="page-section">
        <div class="container">
            <div class="page-header">
                <div><h1>Donations Overview</h1><p>View all donation activities</p></div>
            </div>
            <div class="stats-grid">
                <div class="stat-card"><i class="fa-solid fa-hand-holding-heart"></i><h2 id="donTotal">—</h2><p>Total Donations</p></div>
                <div class="stat-card"><i class="fa-solid fa-calendar-days"></i><h2 id="donThisMonth">—</h2><p>This Month</p></div>
                <div class="stat-card"><i class="fa-solid fa-mosque"></i><h2 id="donZaka">—</h2><p>Zaka Collection</p></div>
                <div class="stat-card"><i class="fa-solid fa-heart"></i><h2 id="donSadaka">—</h2><p>Sadaka Collection</p></div>
            </div>
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="donationSearch" placeholder="Search donation..." />
            </div>
            <div class="table-container">
                <table id="donationTable">
                    <thead>
                        <tr><th>Receipt No</th><th>Donor Name</th><th>Category</th><th>Amount</th><th>Date</th></tr>
                    </thead>
                    <tbody><!-- filled by JS --></tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: POSTS
    ════════════════════════════════════════════ -->
    <section id="page-posts" class="page-section">
        <div class="container">
            <div class="page-header">
                <div><h1>Posts & Announcements</h1><p>Posts created by Amir Habari</p></div>
                <div class="total-posts">
                    <i class="fa-solid fa-newspaper"></i>
                    <span id="postCountLabel">0 Posts</span>
                </div>
            </div>
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="searchPost" placeholder="Search post..." />
            </div>
            <div class="posts-wrapper" id="postsWrapper">
                <!-- filled by JS -->
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: LOGS
    ════════════════════════════════════════════ -->
    <section id="page-logs" class="page-section">
        <div class="container">
            <div class="page-header">
                <div><h1>System Audit Logs</h1><p>Track all activities within the system</p></div>
                <div class="log-counter">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span id="logCountLabel">0 Logs</span>
                </div>
            </div>
            <div class="cards">
                <div class="card"><i class="fa-solid fa-right-to-bracket"></i><h2 id="logLogins">—</h2><p>Logins</p></div>
                <div class="card"><i class="fa-solid fa-user-plus"></i><h2 id="logRegs">—</h2><p>Registrations</p></div>
                <div class="card"><i class="fa-solid fa-newspaper"></i><h2 id="logPosts">—</h2><p>Posts Created</p></div>
                <div class="card"><i class="fa-solid fa-triangle-exclamation"></i><h2 id="logFailed">—</h2><p>Failed Logins</p></div>
            </div>
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="searchLogs" placeholder="Search activity..." />
            </div>
            <div class="table-container">
                <table id="logsTable">
                    <thead>
                        <tr><th>User</th><th>Role</th><th>IP Address</th><th>Date & Time</th></tr>
                    </thead>
                    <tbody><!-- filled by JS --></tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: MESSAGES
    ════════════════════════════════════════════ -->
    <section id="page-messages" class="page-section">
        <div class="main-content">
            <div class="topbar">
                <div><h2>Messages Center</h2><span>Communicate with Leadership</span></div>
                <div class="admin-profile">
                    <div class="notification"><i class="fa-solid fa-bell"></i><span id="msgNotif">0</span></div>
                    <img src="../images/mciaa/image.png" alt="admin" />
                </div>
            </div>

            <div class="leaders-grid">
                <div class="leader-card"><div class="avatar">AM</div><h3>Amir Mkuu</h3><p>Main Leader</p></div>
                <div class="leader-card"><div class="avatar">KT</div><h3>Katibu</h3><p>Secretary</p></div>
                <div class="leader-card"><div class="avatar">AF</div><h3>Amir Fedha</h3><p>Finance Leader</p></div>
                <div class="leader-card"><div class="avatar">AH</div><h3>Amir Habari</h3><p>Information Leader</p></div>
                <div class="leader-card"><div class="avatar">DS</div><h3>Dean</h3><p>Dean of Students</p></div>
                <div class="leader-card"><div class="avatar">AR</div><h3>Amirati</h3><p>Female Leader</p></div>
            </div>

            <div class="message-card">
                <h3>Send New Message</h3>
                <form id="messageForm">
                    <div class="form-group">
                        <label>Recipient</label>
                        <select id="msgRecipientSelect">
                            <option value="">Select Recipient</option>
                            <option value="amir">Amir Mkuu</option>
                            <option value="secretary">Katibu</option>
                            <option value="amirat">Amirati</option>
                            <option value="habari">Amiri Habari</option>
                            <option value="super admin">Super Admin</option>
                            <option value="fedha">Amiri Fedha</option>
                            <option value="dean of student">Dean of Student</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Subject</label>
                        <input type="text" id="msgSubjectInput" placeholder="Enter subject" />
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea id="msgContentInput" rows="6" placeholder="Write your message here..."></textarea>
                    </div>
                    <button type="submit"><i class="fa-solid fa-paper-plane"></i> Send Message</button>
                </form>
            </div>

            <!-- Incoming Messages -->
            <div class="history-card incoming-card">
                <div class="history-header">
                    <h3>Incoming Messages</h3>
                    <span class="table-note">Messages from leadership</span>
                </div>
                <div class="table-container">
                    <table id="incomingMessageTable">
                        <thead>
                            <tr><th>From</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody><!-- filled by JS --></tbody>
                    </table>
                </div>
            </div>

            <!-- Sent Messages -->
            <div class="history-card">
                <div class="history-header">
                    <h3>Sent Messages</h3>
                    <input type="text" id="searchMessage" placeholder="Search messages..." />
                </div>
                <table id="messageTable">
                    <thead>
                        <tr><th>Recipient</th><th>Subject</th><th>Date</th><th>Status</th></tr>
                    </thead>
                    <tbody><!-- filled by JS --></tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: PROMOTE LEADERS
    ════════════════════════════════════════════ -->
    <section id="page-promote" class="page-section">
        <div class="topbar">
            <div>
                <h1>Promote Leaders</h1>
                <p>Assign leadership roles to existing members or students</p>
            </div>
        </div>

        <div style="background:#fff; padding:20px; border-radius:15px; box-shadow:0 5px 15px rgba(0,0,0,0.08); margin-bottom:25px;">
            <div style="display:flex; gap:15px; align-items:center; flex-wrap:wrap;">
                <div style="position:relative; flex:1; min-width:200px;">
                    <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#999;"></i>
                    <input type="text" id="searchPromote"
                        placeholder="Search by name, email or reg number..."
                        style="width:100%; padding:12px 14px 12px 40px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;" />
                </div>
                <span style="color:#777; font-size:14px;" id="promoteCountLabel">0 users found</span>
            </div>
        </div>

        <div class="card" style="padding:0; overflow:hidden;">
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead style="background:#0b8f4d; color:#fff;">
                        <tr>
                            <th style="padding:15px; text-align:left;">Name</th>
                            <th style="padding:15px; text-align:left;">Email</th>
                            <th style="padding:15px; text-align:left;">Reg No</th>
                            <th style="padding:15px; text-align:left;">Current Role</th>
                            <th style="padding:15px; text-align:left;">Assign As</th>
                            <th style="padding:15px; text-align:left;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="promoteTableBody">
                        <tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">Click Promote Leaders to load users.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="promoteFeedback" style="display:none; margin-top:20px; padding:15px 20px; border-radius:10px; font-weight:600; font-size:15px;"></div>
    </section>

    <!-- ═══════════════════════════════════════════
         PAGE: REGISTER MEMBER
    ════════════════════════════════════════════ -->
    <section id="page-register" class="page-section">
        <div class="topbar">
            <div>
                <h1>Register Member</h1>
                <p>Manually register a new member or student</p>
            </div>
        </div>

        <div style="background:#fff; padding:35px; border-radius:15px; box-shadow:0 5px 15px rgba(0,0,0,0.08); max-width:700px;">
            <form id="adminRegisterForm">

                <div style="margin-bottom:18px;">
                    <label style="display:block; font-weight:600; margin-bottom:8px;">Full Name</label>
                    <input type="text" name="full_name" placeholder="Enter full name" required
                        style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;" />
                </div>

                <div style="margin-bottom:18px;">
                    <label style="display:block; font-weight:600; margin-bottom:8px;">Registration Number</label>
                    <input type="text" name="reg_number" placeholder="e.g. BCS-01-0001-2024" required
                        style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;" />
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:18px;">
                    <div>
                        <label style="display:block; font-weight:600; margin-bottom:8px;">Course Name</label>
                        <input type="text" name="course_name" placeholder="e.g. Computer Science" required
                            style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;" />
                    </div>
                    <div>
                        <label style="display:block; font-weight:600; margin-bottom:8px;">Year of Study</label>
                        <select name="study_year" required
                            style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;">
                            <option value="" disabled selected>Select year</option>
                            <option value="1">Year 1</option>
                            <option value="2">Year 2</option>
                            <option value="3">Year 3</option>
                        </select>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:18px;">
                    <div>
                        <label style="display:block; font-weight:600; margin-bottom:8px;">Gender</label>
                        <select name="gender" required
                            style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;">
                            <option value="" disabled selected>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; font-weight:600; margin-bottom:8px;">Register As</label>
                        <select name="role" required
                            style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;">
                            <option value="" disabled selected>Select role</option>
                            <option value="member">Member</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom:18px;">
                    <label style="display:block; font-weight:600; margin-bottom:8px;">Phone Number</label>
                    <input type="tel" name="contact_number" placeholder="e.g. +255..." required
                        style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;" />
                </div>

                <div style="margin-bottom:18px;">
                    <label style="display:block; font-weight:600; margin-bottom:8px;">Email</label>
                    <input type="email" name="email" placeholder="Enter email address" required
                        style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;" />
                </div>

                <div style="margin-bottom:25px;">
                    <label style="display:block; font-weight:600; margin-bottom:8px;">Password</label>
                    <input type="password" name="password" placeholder="Set a password" required
                        style="width:100%; padding:13px; border:1px solid #ddd; border-radius:10px; outline:none; font-size:14px;" />
                </div>

                <button type="submit" id="adminRegBtn"
                    style="background:#0b8f4d; color:#fff; border:none; padding:14px 30px; border-radius:10px; cursor:pointer; font-size:15px; font-weight:600; width:100%;">
                    <i class="fa-solid fa-user-plus"></i> Register Member
                </button>
            </form>

            <div id="registerFeedback" style="display:none; margin-top:20px; padding:15px 20px; border-radius:10px; font-weight:600; font-size:15px;"></div>
        </div>
    </section>

    </main><!-- end main-content -->

    <!-- MESSAGE MODAL — kept exactly as original -->
    <div class="message-modal" id="messageModal" aria-hidden="true">
        <div class="message-modal-box" role="dialog" aria-modal="true" aria-labelledby="modalSubject">
            <div class="message-modal-header">
                <div><span id="modalSender"></span><h3 id="modalSubject"></h3></div>
                <button type="button" class="modal-icon-btn" id="modalXClose" aria-label="Close message popup">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="message-modal-meta">
                <span id="modalDate"></span>
                <span id="modalPriority"></span>
            </div>
            <p id="modalMessage"></p>
            <form class="modal-reply-form" id="modalReplyForm">
                <label for="modalReplyText">Reply message</label>
                <textarea id="modalReplyText" rows="4" placeholder="Write your reply here..."></textarea>
                <button type="submit"><i class="fa-solid fa-paper-plane"></i> Send Reply</button>
            </form>
            <div class="message-modal-actions">
                <button type="button" class="reply-btn" id="openReplyBtn"><i class="fa-solid fa-reply"></i> Reply</button>
                <button type="button" class="close-btn" id="closeModalBtn"><i class="fa-solid fa-xmark"></i> Close</button>
            </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════════════
         JS FILES — each wrapped in its own block
         to prevent variable name conflicts
    ════════════════════════════════════════════ -->

    <!-- Navigation switcher -->
    <script>
        // ── Page switcher ──────────────────────────────────────
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.page-section');

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.dataset.page;

                // Hide all sections
                sections.forEach(s => s.classList.remove('active'));
                navLinks.forEach(l => l.classList.remove('active'));

                // Show target section
                document.getElementById('page-' + target).classList.add('active');
                this.classList.add('active');

                // Load data for the section that just became visible
                if (target === 'members')   loadMembers();
                if (target === 'loans')     loadLoans();
                if (target === 'donations') loadDonations();
                if (target === 'posts')     loadPosts();
                if (target === 'logs')      loadLogs();
                if (target === 'messages')  loadMessages();
                if (target === 'index')     loadDashboard();
                if (target === 'promote')   loadPromotable();
                if (target === 'register')  resetRegisterForm();
            });
        });

        // Load dashboard stats on first open
        document.addEventListener('DOMContentLoaded', loadDashboard);
    </script>

    <!-- members.js logic — wrapped in block to isolate variables -->
    <script>
    {
        function loadMembers(search = '') {
            fetch('../backend/fetch_members.php?search=' + encodeURIComponent(search))
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector('#membersTable tbody');
                tbody.innerHTML = '';
                document.getElementById('memberCountLabel').textContent =
                    (data.count ?? 0).toLocaleString() + ' Members';

                if (!data.success || data.count === 0) {
                    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#999;padding:20px;">No members found.</td></tr>`;
                    return;
                }
                data.members.forEach(m => {
                    const cls = m.status === 'active' ? 'active' : 'inactive';
                    tbody.innerHTML += `<tr>
                        <td>M${String(m.id).padStart(3,'0')}</td>
                        <td>${m.name}</td>
                        <td>${m.phone}</td>
                        <td>${m.gender}</td>
                        <td><span class="${cls}">${m.status === 'active' ? 'Active' : 'Inactive'}</span></td>
                    </tr>`;
                });
            })
            .catch(err => console.error('Members error:', err));
        }

        // members.js search — uses unique variable name to avoid conflict
        const membersSearchInput = document.getElementById('searchInput');
        membersSearchInput.addEventListener('keyup', function () {
            loadMembers(this.value);
        });
    }
    </script>

    <!-- loans.js logic -->
    <script>
    {
        function loadLoans(search = '') {
            fetch('../backend/fetch_loans.php?search=' + encodeURIComponent(search))
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector('#loanTable tbody');
                tbody.innerHTML = '';

                if (!data.success || data.count === 0) {
                    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#999;padding:20px;">No loans found.</td></tr>`;
                    return;
                }

                // Update stat cards
                let refunded = 0, pending = 0, notRefunded = 0;
                data.loans.forEach(l => {
                    if (l.status === 'refunded')     refunded++;
                    else if (l.status === 'not refunded') notRefunded++;
                    else pending++;

                    const cls = l.status === 'refunded' ? 'approved' :
                                l.status === 'not refunded' ? 'rejected' : 'pending';
                    tbody.innerHTML += `<tr>
                        <td>L${String(l.id).padStart(3,'0')}</td>
                        <td>${l.member}</td>
                        <td>TZS ${l.amount}</td>
                        <td>${l.duration}</td>
                        <td><span class="${cls}">${l.status ?? 'Pending'}</span></td>
                        <td>${l.date}</td>
                    </tr>`;
                });

                document.getElementById('loanTotal').textContent      = data.count;
                document.getElementById('loanRefunded').textContent   = refunded;
                document.getElementById('loanPending').textContent    = pending;
                document.getElementById('loanNotRefunded').textContent = notRefunded;
            })
            .catch(err => console.error('Loans error:', err));
        }

        const loanSearchEl = document.getElementById('loanSearch');
        loanSearchEl.addEventListener('keyup', function () {
            loadLoans(this.value);
        });
    }
    </script>

    <!-- donations.js logic -->
    <script>
    {
        function loadDonations(search = '') {
            fetch('../backend/fetch_donations.php?search=' + encodeURIComponent(search))
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector('#donationTable tbody');
                tbody.innerHTML = '';

                if (!data.success || data.count === 0) {
                    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#999;padding:20px;">No donations found.</td></tr>`;
                    return;
                }

                // Compute stats from data
                let thisMonth = 0, zaka = 0, sadaka = 0, total = 0;
                const now = new Date();
                data.donations.forEach(d => {
                    const amt = parseInt(d.amount.replace(/,/g,'')) || 0;
                    total += amt;
                    if (d.category === 'Zaka')   zaka   += amt;
                    if (d.category === 'Sadaka') sadaka += amt;

                    tbody.innerHTML += `<tr>
                        <td>DN${String(d.id).padStart(3,'0')}</td>
                        <td>${d.donor}</td>
                        <td>${d.category}</td>
                        <td>TZS ${d.amount}</td>
                        <td>${d.date}</td>
                    </tr>`;
                });

                document.getElementById('donTotal').textContent    = 'TZS ' + total.toLocaleString();
                document.getElementById('donZaka').textContent     = 'TZS ' + zaka.toLocaleString();
                document.getElementById('donSadaka').textContent   = 'TZS ' + sadaka.toLocaleString();
                document.getElementById('donThisMonth').textContent = 'TZS ' + total.toLocaleString();
            })
            .catch(err => console.error('Donations error:', err));
        }

        const donSearchEl = document.getElementById('donationSearch');
        donSearchEl.addEventListener('keyup', function () {
            loadDonations(this.value);
        });
    }
    </script>

    <!-- posts.js logic -->
    <script>
    {
        function loadPosts(search = '') {
            fetch('../backend/fetch_posts.php')
            .then(res => res.json())
            .then(data => {
                const wrapper = document.getElementById('postsWrapper');
                wrapper.innerHTML = '';

                if (!data.success || data.count === 0) {
                    wrapper.innerHTML = `<p style="color:#999;text-align:center;padding:20px;">No posts found.</p>`;
                    return;
                }

                document.getElementById('postCountLabel').textContent = data.count + ' Posts';

                data.posts.forEach(p => {
                    const initials = p.author.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
                    const img = p.image_url
                        ? `<img src="../${p.image_url}" alt="" onerror="this.style.display='none'" />`
                        : '';
                    wrapper.innerHTML += `
                        <div class="post-card">
                            <div class="post-header">
                                <div class="author">
                                    <div class="avatar">${initials}</div>
                                    <div><h4>${p.author}</h4><span>${p.date}</span></div>
                                </div>
                                <div class="category">Post</div>
                            </div>
                            <div class="post-body">
                                <h3>${p.title}</h3>
                                <p>${p.content}</p>
                                ${img}
                            </div>
                        </div>`;
                });

                // Apply search filter if any
                if (search) {
                    document.querySelectorAll('.post-card').forEach(card => {
                        card.style.display = card.textContent.toLowerCase().includes(search.toLowerCase())
                            ? 'block' : 'none';
                    });
                }
            })
            .catch(err => console.error('Posts error:', err));
        }

        const postSearchEl = document.getElementById('searchPost');
        postSearchEl.addEventListener('keyup', function () {
            loadPosts(this.value);
        });
    }
    </script>

    <!-- logs.js logic -->
    <script>
    {
        function loadLogs(search = '') {
            fetch('../backend/fetch_logs.php?search=' + encodeURIComponent(search))
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector('#logsTable tbody');
                tbody.innerHTML = '';
                document.getElementById('logCountLabel').textContent =
                    (data.count ?? 0).toLocaleString() + ' Logs';

                if (!data.success || data.count === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#999;padding:20px;">No logs found.</td></tr>`;
                    return;
                }

                data.logs.forEach(l => {
                    tbody.innerHTML += `<tr>
                        <td>${l.name}</td>
                        <td>${l.role}</td>
                        <td>${l.ip}</td>
                        <td>${l.date}</td>
                    </tr>`;
                });
            })
            .catch(err => console.error('Logs error:', err));
        }

        const logSearchEl = document.getElementById('searchLogs');
        logSearchEl.addEventListener('keyup', function () {
            loadLogs(this.value);
        });
    }
    </script>

    <!-- messages.js logic — kept close to original, variable names scoped -->
    <script>
    {
        // Search sent messages
        const msgSearchEl = document.getElementById('searchMessage');
        msgSearchEl.addEventListener('keyup', function () {
            const value = this.value.toLowerCase();
            document.querySelectorAll('#messageTable tbody tr').forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(value) ? '' : 'none';
            });
        });

        // Send message form
        const msgForm = document.getElementById('messageForm');
        msgForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const recipient = document.getElementById('msgRecipientSelect').value;
            const subject   = document.getElementById('msgSubjectInput').value.trim();
            const content   = document.getElementById('msgContentInput').value.trim();

            if (!recipient || !subject || !content) {
                alert('Please fill in all fields.');
                return;
            }

            const formData = new FormData();
            formData.append('recipient', recipient);
            formData.append('subject',   subject);
            formData.append('content',   content);

            fetch('../backend/send_message.php', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('Message sent successfully!');
                    msgForm.reset();
                    loadMessages();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(() => alert('Network error. Please try again.'));
        });

        function loadMessages() {
            fetch('../backend/fetch_messages.php')
            .then(res => res.json())
            .then(data => {
                // Sent messages table
                const sentBody = document.querySelector('#messageTable tbody');
                sentBody.innerHTML = '';
                if (data.success && data.count > 0) {
                    data.messages.forEach(m => {
                        sentBody.innerHTML += `<tr>
                            <td>${m.recipient_name}</td>
                            <td>${m.subject}</td>
                            <td>${m.date}</td>
                            <td><span class="sent">${m.status}</span></td>
                        </tr>`;
                    });
                } else {
                    sentBody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#999;padding:20px;">No sent messages.</td></tr>`;
                }

                // Incoming messages table
                const inBody = document.querySelector('#incomingMessageTable tbody');
                inBody.innerHTML = '';
                if (data.incoming && data.incoming.length > 0) {
                    data.incoming.forEach(m => {
                        inBody.innerHTML += `<tr>
                            <td>${m.sender_name}</td>
                            <td>${m.subject}</td>
                            <td>${m.date}</td>
                            <td><span class="priority normal">${m.status}</span></td>
                            <td>
                                <div class="message-actions">
                                    <button type="button" class="view-btn"
                                        data-sender="${m.sender_name}"
                                        data-subject="${m.subject}"
                                        data-date="${m.date}"
                                        data-message="${m.content}"
                                        data-id="${m.id}">
                                        <i class="fa-solid fa-eye"></i> View
                                    </button>
                                    <button type="button" class="delete-btn" data-id="${m.id}">
                                        <i class="fa-solid fa-trash"></i> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>`;
                    });
                    attachMessageActions();
                } else {
                    inBody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#999;padding:20px;">No incoming messages.</td></tr>`;
                }
            })
            .catch(err => console.error('Messages error:', err));
        }

        // Modal logic — kept exactly as original messages.js
        const modal          = document.getElementById('messageModal');
        const modalSender    = document.getElementById('modalSender');
        const modalSubject   = document.getElementById('modalSubject');
        const modalDate      = document.getElementById('modalDate');
        const modalPriority  = document.getElementById('modalPriority');
        const modalMessage   = document.getElementById('modalMessage');
        const modalReplyForm = document.getElementById('modalReplyForm');
        const modalReplyText = document.getElementById('modalReplyText');
        const openReplyBtn   = document.getElementById('openReplyBtn');
        const closeModalBtn  = document.getElementById('closeModalBtn');
        const modalXClose    = document.getElementById('modalXClose');

        let activeMessage = null;

        function closeMessageModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'false');
            modalReplyForm.classList.remove('active');
            modalReplyText.value = '';
            activeMessage = null;
        }

        function attachMessageActions() {
            document.querySelectorAll('.view-btn').forEach(button => {
                button.addEventListener('click', () => {
                    activeMessage = {
                        sender:  button.dataset.sender,
                        subject: button.dataset.subject,
                        id:      button.dataset.id
                    };
                    modalSender.textContent  = button.dataset.sender;
                    modalSubject.textContent = button.dataset.subject;
                    modalDate.textContent    = button.dataset.date;
                    modalPriority.textContent = 'Normal';
                    modalMessage.textContent = button.dataset.message;
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => {
                    button.closest('tr').remove();
                });
            });
        }

        openReplyBtn.addEventListener('click', () => {
            modalReplyForm.classList.add('active');
            modalReplyText.focus();
        });

        modalReplyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!modalReplyText.value.trim()) { alert('Please write your reply.'); return; }

            const fd = new FormData();
            fd.append('message_id', activeMessage.id);
            fd.append('content',    modalReplyText.value.trim());

            fetch('../backend/reply_message.php', { method: 'POST', body: fd })
            .then(res => res.json())
            .then(data => {
                alert(data.success ? `Reply sent to ${activeMessage.sender}!` : 'Error: ' + data.message);
                closeMessageModal();
            })
            .catch(() => alert('Network error.'));
        });

        closeModalBtn.addEventListener('click', closeMessageModal);
        modalXClose.addEventListener('click', closeMessageModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeMessageModal(); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeMessageModal();
        });
    }
    </script>

    <!-- Dashboard overview stats -->
    <script>
    {
        function loadDashboard() {
            fetch('../backend/fetch_overview.php')
            .then(res => res.json())
            .then(data => {
                if (!data.success) return;
                document.getElementById('statMembers').textContent    = data.membersCount   ?? '—';
                document.getElementById('statLoans').textContent      = data.loanCount       ?? '—';
                document.getElementById('statDonations').textContent  = 'TZS ' + Number(data.totalDonations).toLocaleString();
                document.getElementById('sumActiveMembers').textContent = '—';
                document.getElementById('sumPendingLoans').textContent  = data.pendingLoan   ?? '—';
                document.getElementById('sumTotalDonations').textContent = 'TZS ' + Number(data.totalDonations).toLocaleString();
                document.getElementById('notifCount').textContent       = data.pendingCount  ?? 0;
            })
            .catch(err => console.error('Dashboard error:', err));

            // Posts count for stat card
            fetch('../backend/fetch_posts.php')
            .then(res => res.json())
            .then(data => {
                document.getElementById('statPosts').textContent = data.count ?? '—';
                // Recent posts
                const list = document.getElementById('recentPostsList');
                list.innerHTML = '';
                (data.posts ?? []).slice(0,3).forEach(p => {
                    list.innerHTML += `<div class="post"><h4>${p.title}</h4><p>Posted by ${p.author}</p></div>`;
                });
            })
            .catch(err => console.error('Posts stat error:', err));
        }
    }
    </script>


    <!-- Promote Leaders JS -->
    <script>
    {
        function loadPromotable(search = '') {
            fetch('../backend/fetch_promotable.php?search=' + encodeURIComponent(search))
            .then(res => res.json())
            .then(data => {
                const tbody = document.getElementById('promoteTableBody');
                tbody.innerHTML = '';
                document.getElementById('promoteCountLabel').textContent = (data.count ?? 0) + ' users found';

                if (!data.success || data.count === 0) {
                    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No users found.</td></tr>`;
                    return;
                }

                data.users.forEach(u => {
                    tbody.innerHTML += `
                        <tr style="border-bottom:1px solid #eee;">
                            <td style="padding:15px;">
                                <strong>${u.name}</strong><br>
                                <small style="color:#999;">${u.phone}</small>
                            </td>
                            <td style="padding:15px;">${u.email}</td>
                            <td style="padding:15px;">${u.reg_no}</td>
                            <td style="padding:15px;">
                                <span style="background:#d4edda;color:#0b8f4d;padding:5px 12px;border-radius:20px;font-size:13px;font-weight:600;">
                                    ${u.role}
                                </span>
                            </td>
                            <td style="padding:15px;">
                                <select id="prole_${u.id}"
                                    style="padding:10px;border:1px solid #ddd;border-radius:8px;outline:none;font-size:14px;cursor:pointer;">
                                    <option value="">Select role...</option>
                                    <option value="amir">Amir Mkuu</option>
                                    <option value="amirat">Amirat</option>
                                    <option value="secretary">Katibu (Secretary)</option>
                                    <option value="fedha">Amiri Fedha</option>
                                    <option value="habari">Amiri Habari</option>
                                    <option value="dean of student">Dean of Student</option>
                                    <option value="super admin">Super Admin</option>
                                </select>
                            </td>
                            <td style="padding:15px;">
                                <button onclick="promoteUser(${u.id}, '${u.name}')"
                                    style="background:#0b8f4d;color:#fff;border:none;padding:10px 18px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;">
                                    <i class="fa-solid fa-user-check"></i> Promote
                                </button>
                            </td>
                        </tr>`;
                });
            })
            .catch(err => console.error('Promote load error:', err));
        }

        function promoteUser(userId, userName) {
            const sel       = document.getElementById('prole_' + userId);
            const role_desc = sel.value;

            if (!role_desc) {
                showPromoteFeedback('Please select a role for ' + userName + ' first.', false);
                return;
            }

            const label = sel.options[sel.selectedIndex].text;

            if (!confirm('Promote ' + userName + ' to ' + label + '?')) return;

            const fd = new FormData();
            fd.append('user_id',          userId);
            fd.append('role_description', role_desc);

            fetch('../backend/promote_leader.php', { method: 'POST', body: fd })
            .then(res => res.json())
            .then(data => {
                showPromoteFeedback(data.message, data.success);
                if (data.success) loadPromotable();
            })
            .catch(() => showPromoteFeedback('Network error. Please try again.', false));
        }

        function showPromoteFeedback(msg, success) {
            const box = document.getElementById('promoteFeedback');
            box.textContent    = msg;
            box.style.display  = 'block';
            box.style.background = success ? '#d4edda' : '#fde8e8';
            box.style.color      = success ? '#0b8f4d' : '#b91c1c';
            box.style.border     = success ? '1px solid #a3d9a3' : '1px solid #f5a5a5';
            if (success) setTimeout(() => { box.style.display = 'none'; }, 5000);
        }

        document.getElementById('searchPromote').addEventListener('input', function () {
            loadPromotable(this.value);
        });
    }
    </script>

    <!-- Register Member JS -->
    <script>
    {
        function resetRegisterForm() {
            document.getElementById('adminRegisterForm').reset();
            const fb = document.getElementById('registerFeedback');
            fb.style.display = 'none';
        }

        document.getElementById('adminRegisterForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = document.getElementById('adminRegBtn');
            btn.disabled    = true;
            btn.innerHTML   = '<i class="fa-solid fa-spinner fa-spin"></i> Registering...';

            const formData = new FormData(this);

            fetch('../backend/register.php', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => {
                const fb = document.getElementById('registerFeedback');
                fb.textContent    = data.message;
                fb.style.display  = 'block';
                fb.style.background = data.success ? '#d4edda' : '#fde8e8';
                fb.style.color      = data.success ? '#0b8f4d' : '#b91c1c';
                fb.style.border     = data.success ? '1px solid #a3d9a3' : '1px solid #f5a5a5';

                if (data.success) {
                    document.getElementById('adminRegisterForm').reset();
                    // Refresh members count on dashboard
                    loadDashboard();
                    setTimeout(() => { fb.style.display = 'none'; }, 5000);
                }
            })
            .catch(() => {
                const fb = document.getElementById('registerFeedback');
                fb.textContent   = 'Network error. Please try again.';
                fb.style.display = 'block';
                fb.style.background = '#fde8e8';
                fb.style.color      = '#b91c1c';
            })
            .finally(() => {
                btn.disabled  = false;
                btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Register Member';
            });
        });
    }
    </script>
    <script src="../js/logout-confirm.js"></script>

</body>
</html>
