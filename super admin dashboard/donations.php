<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Donations Management</title>

    <link rel="stylesheet" href="../css/mciaa/donations.css" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    />
    <link rel="shortcut icon" href="../images/mciaa/image.png" />
  </head>
  <body>
    <aside class="sidebar">
      <div class="logo-area">
        <img src="../images/mciaa/image.png" alt="MCIAA logo" class="logo-img" />
        <div>
          <h2>MCIAA <span>Association</span></h2>
          <span class="subtitle">Super Admin</span>
        </div>
      </div>

      <ul>
        <li>
          <a href="index.php">
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
        <!-- PAGE HEADER -->

        <div class="page-header">
          <div>
            <h1>Donations Overview</h1>
            <p>View all donation activities</p>
          </div>
        </div>

        <!-- STATISTICS -->

        <div class="stats-grid">
          <div class="stat-card">
            <i class="fa-solid fa-hand-holding-heart"></i>
            <h2>TZS 45M</h2>
            <p>Total Donations</p>
          </div>

          <div class="stat-card">
            <i class="fa-solid fa-calendar-days"></i>
            <h2>TZS 6.8M</h2>
            <p>This Month</p>
          </div>

          <div class="stat-card">
            <i class="fa-solid fa-mosque"></i>
            <h2>TZS 18M</h2>
            <p>Zaka Collection</p>
          </div>

          <div class="stat-card">
            <i class="fa-solid fa-heart"></i>
            <h2>TZS 27M</h2>
            <p>Sadaka Collection</p>
          </div>
        </div>

        <!-- SEARCH -->

        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            id="donationSearch"
            placeholder="Search donation..."
          />
        </div>

        <!-- DONATIONS TABLE -->

        <div class="table-container">
          <table id="donationTable">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Donor Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>DN001</td>
                <td>Ahmed Ali</td>
                <td>Zaka</td>
                <td>TZS 500,000</td>
                <td>12 Jun 2026</td>
              </tr>

              <tr>
                <td>DN002</td>
                <td>Fatma Hassan</td>
                <td>Sadaka</td>
                <td>TZS 200,000</td>
                <td>15 Jun 2026</td>
              </tr>

              <tr>
                <td>DN003</td>
                <td>Omar Yusuf</td>
                <td>Waqf</td>
                <td>TZS 1,000,000</td>
                <td>16 Jun 2026</td>
              </tr>

              <tr>
                <td>DN004</td>
                <td>Aisha Abdallah</td>
                <td>Project Fund</td>
                <td>TZS 350,000</td>
                <td>17 Jun 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <script src="../js/mciaa/donations.js"></script>
    <script src="../js/logout-confirm.js"></script>
  </body>
</html>
