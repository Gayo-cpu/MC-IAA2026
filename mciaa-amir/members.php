<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Registered Members</title>

    <link rel="stylesheet" href="../css/mciaa-amir/members.css" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    />
    <link rel="shortcut icon" href="../images/mciaa-amir/image.png" />
  </head>

  <body>
    <aside class="sidebar">
      <div class="logo-area">
        <img src="../images/mciaa-amir/image.png" alt="MCIAA logo" class="logo-img" />
        <div>
          <h2>MCIAA <span>Association</span></h2>
          <span class="subtitle">Amir</span>
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
              <tr>
                <td>M001</td>
                <td>Ahmed Ali</td>
                <td>0712345678</td>
                <td>Male</td>
                <td>
                  <span class="active"> Active </span>
                </td>
              </tr>

              <tr>
                <td>M002</td>
                <td>Fatma Hassan</td>
                <td>0755555555</td>
                <td>Female</td>
                <td>
                  <span class="active"> Active </span>
                </td>
              </tr>

              <tr>
                <td>M003</td>
                <td>Omar Yusuf</td>
                <td>0766666666</td>
                <td>Male</td>
                <td>
                  <span class="inactive"> Inactive </span>
                </td>
              </tr>

              <tr>
                <td>M004</td>
                <td>Aisha Abdallah</td>
                <td>0744444444</td>
                <td>Female</td>
                <td>
                  <span class="active"> Active </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <script src="../js/mciaa-amir/membvers.js"></script>
    <script src="../js/logout-confirm.js"></script>
  </body>
</html>
