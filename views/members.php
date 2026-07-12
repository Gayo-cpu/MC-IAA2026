<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Registered Members</title>

    <link rel="stylesheet" href="../css/members.css" />
    <link rel="shortcut icon" href="../IMAGES/MCIAA.png" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    />
    <link rel="shortcut icon" href="../IMAGES/image.png" />
  </head>

  <body>
    <aside class="sidebar">
      <div class="logo-area">
        <img src="../IMAGES/image.png" alt="MCIAA logo" class="logo-img" />
        <div>
          <h2>MCIAA <span>Association</span></h2>
          <span class="subtitle">Amir</span>
        </div>
      </div>

      <ul>
        <li>
          <a href="dashboard.php">
            <i class="fa-solid fa-house"></i>
            Dashboard
          </a>
        </li>

        <li>
          <a href="members.php">
            <i class="fa-solid fa-users"></i>
            Members
          </a>
        </li>

        <li>
          <a href="loans.php">
            <i class="fa-solid fa-hand-holding-dollar"></i>
            Loans
          </a>
        </li>

        <li>
          <a href="donations.php">
            <i class="fa-solid fa-heart"></i>
            Donations
          </a>
        </li>

        <li>
          <a href="posts.php">
            <i class="fa-solid fa-newspaper"></i>
            Posts
          </a>
        </li>

        <li>
          <a href="logs.php">
            <i class="fa-solid fa-clock-rotate-left"></i>
            Logs
          </a>
        </li>

        <li>
          <a href="messages.php">
            <i class="fa-solid fa-envelope"></i>
            Messages
          </a>
        </li>
        <li>
          <a href="../views/login.php">
            <i class="fa-solid fa-right-from-bracket"></i>
            Logout
          </a>
        </li>
      </ul>
    </aside>

    <main class="main-content">
      <div class="container">
        <div class="page-header">
          <div>
            <h1>Registered Members</h1>
            <p>View all registered members</p>
          </div>

          <div class="member-count">
            <i class="fa-solid fa-users"></i>
            <span>1,250 Members</span>
          </div>
        </div>

        <!-- Search Area -->

        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>

          <input type="text" id="searchInput" placeholder="Search member..." />
        </div>

        <!-- Members Table -->

        <div class="table-container">
          <table id="membersTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <!-- Loaded dynamically from users table -->
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <script src="../js/members.js" defer></script>
    <script src="../js/logout-confirm.js" defer></script>

    <!-- PHP Fetch Integration – fetch_members.php -->
    <script>
        // ── Load members from DB ───────────────────────────────
        function loadMembers(search = '') {
            fetch('../backend/fetch_members.php?search=' + encodeURIComponent(search))
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector('#membersTable tbody');
                tbody.innerHTML = '';

                // Update member count
                document.querySelector('.member-count span').textContent =
                    (data.count ?? 0).toLocaleString() + ' Members';

                if (!data.success || data.count === 0) {
                    tbody.innerHTML = `<tr>
                        <td colspan="5" style="text-align:center;color:#999;padding:30px;">
                            No members found.
                        </td>
                    </tr>`;
                    return;
                }

                data.members.forEach((m, index) => {
                    const statusClass = m.status === 'active' ? 'active' : 'inactive';
                    const statusLabel = m.status === 'active' ? 'Active' : 'Inactive';
                    const id = 'M' + String(m.id).padStart(3, '0');

                    tbody.innerHTML += `
                        <tr>
                            <td>${id}</td>
                            <td>${m.name}</td>
                            <td>${m.phone}</td>
                            <td>${m.gender}</td>
                            <td><span class="${statusClass}">${statusLabel}</span></td>
                        </tr>`;
                });
            })
            .catch(err => console.error('Members fetch error:', err));
        }

        // ── Search listener ────────────────────────────────────
        document.getElementById('searchInput').addEventListener('input', function () {
            loadMembers(this.value);
        });

        // ── Load on page ready ─────────────────────────────────
        document.addEventListener('DOMContentLoaded', function () {
            loadMembers();
        });
    </script>
  </body>
</html>
