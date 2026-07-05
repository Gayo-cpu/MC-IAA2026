<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Messages Center</title>

    <link rel="stylesheet" href="../css/messages.css" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    />
    <link rel="shortcut icon" href="../IMAGES/image.png" />
  </head>

  <body>
    <!-- SIDEBAR -->

    <aside class="sidebar">
      <div class="logo-area">
        <img
          src="../IMAGES/image.png"
          alt="MCIAA logo"
          class="logo-img"
        />
        <div>
          <h2>MCIAA <span>Association</span></h2>
          <span class="subtitle">Amir</span>
        </div>
      </div>

      <ul>
        <li>
          <a href="dashboard.php"><i class="fa-solid fa-house"></i> Dashboard</a>
        </li>

        <li>
          <a href="members.php"><i class="fa-solid fa-users"></i> Members</a>
        </li>

        <li>
          <a href="loans.php"
            ><i class="fa-solid fa-hand-holding-dollar"></i> Loans</a
          >
        </li>

        <li>
          <a href="donations.php"
            ><i class="fa-solid fa-heart"></i> Donations</a
          >
        </li>

        <li>
          <a href="posts.php"><i class="fa-solid fa-newspaper"></i> Posts</a>
        </li>

        <li>
          <a href="logs.php"
            ><i class="fa-solid fa-clock-rotate-left"></i> Logs</a
          >
        </li>

        <li class="active">
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

    <!-- MAIN CONTENT -->
    <main class="main-content">
     
        <!-- TOPBAR -->

        <div class="topbar">
          <div>
            <h2>Messages Center</h2>

            <span>Communicate with Leadership</span>
          </div>

          <div class="admin-profile">
            <div class="notification">
              <i class="fa-solid fa-bell"></i>

              <span>3</span>
            </div>

            <img src="../IMAGES/image.png" alt="admin" />
          </div>
        </div>

        <!-- LEADER CARDS -->

        <div class="leaders-grid">
          <div class="leader-card">
            <div class="avatar">AM</div>

            <h3>Amir Mkuu</h3>

            <p>Main Leader</p>
          </div>

          <div class="leader-card">
            <div class="avatar">KT</div>

            <h3>Katibu</h3>

            <p>Secretary</p>
          </div>

          <div class="leader-card">
            <div class="avatar">AR</div>

            <h3>Amirati</h3>

            <p>Female Leader</p>
          </div>
        </div>

        <!-- MESSAGE FORM -->

        <div class="message-card">
          <h3>Send New Message</h3>

          <form id="messageForm">
            <div class="form-group">
              <label>Recipient</label>

              <select>
                <option>Select Recipient</option>

                <option>Amir Mkuu</option>

                <option>Katibu</option>

                <option>Amirati</option>
              </select>
            </div>

            <div class="form-group">
              <label>Subject</label>

              <input type="text" placeholder="Enter subject" />
            </div>

            <div class="form-group">
              <label>Message</label>

              <textarea
                rows="6"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button type="submit">
              <i class="fa-solid fa-paper-plane"></i>

              Send Message
            </button>
          </form>
        </div>

        <!-- UPCOMING MESSAGES -->

        <div class="history-card incoming-card">
          <div class="history-header">
            <h3>Upcoming Messages</h3>

            <span class="table-note">Messages from leadership</span>
          </div>

          <div class="table-container">
            <table id="incomingMessageTable">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Amir Mkuu</td>
                  <td>Friday Program Updates</td>
                  <td>22 Jun 2026</td>
                  <td><span class="priority high">High</span></td>
                  <td>
                    <div class="message-actions">
                      <button
                        type="button"
                        class="view-btn"
                        data-message="Please review the Friday program updates and confirm the arrangements for the upcoming session."
                      >
                        <i class="fa-solid fa-eye"></i>
                        View
                      </button>
                      <button type="button" class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>Katibu</td>
                  <td>Committee Meeting Agenda</td>
                  <td>21 Jun 2026</td>
                  <td><span class="priority medium">Medium</span></td>
                  <td>
                    <div class="message-actions">
                      <button
                        type="button"
                        class="view-btn"
                        data-message="Kindly check the committee meeting agenda before the next leadership meeting."
                      >
                        <i class="fa-solid fa-eye"></i>
                        View
                      </button>
                      <button type="button" class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>Amirati</td>
                  <td>Women Section Report</td>
                  <td>20 Jun 2026</td>
                  <td><span class="priority normal">Normal</span></td>
                  <td>
                    <div class="message-actions">
                      <button
                        type="button"
                        class="view-btn"
                        data-message="The women section report is ready for review. Please read it and share your response."
                      >
                        <i class="fa-solid fa-eye"></i>
                        View
                      </button>
                      <button type="button" class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- MESSAGE HISTORY -->

        <div class="history-card">
          <div class="history-header">
            <h3>Sent Messages</h3>

            <input
              type="text"
              id="searchMessage"
              placeholder="Search messages..."
            />
          </div>

          <table id="messageTable">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Amir Mkuu</td>

                <td>Monthly Report</td>

                <td>18 Jun 2026</td>

                <td>
                  <span class="sent"> Sent </span>
                </td>
              </tr>

              <tr>
                <td>Katibu</td>

                <td>Meeting Reminder</td>

                <td>17 Jun 2026</td>

                <td>
                  <span class="sent"> Sent </span>
                </td>
              </tr>

              <tr>
                <td>Amirati</td>

                <td>Event Planning</td>

                <td>15 Jun 2026</td>

                <td>
                  <span class="sent"> Sent </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div class="message-modal" id="messageModal" aria-hidden="true">
      <div class="message-modal-box" role="dialog" aria-modal="true" aria-labelledby="modalSubject">
        <div class="message-modal-header">
          <div>
            <span id="modalSender"></span>
            <h3 id="modalSubject"></h3>
          </div>
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
          <button type="submit">
            <i class="fa-solid fa-paper-plane"></i>
            Send Reply
          </button>
        </form>

        <div class="message-modal-actions">
          <button type="button" class="reply-btn" id="openReplyBtn">
            <i class="fa-solid fa-reply"></i>
            Reply
          </button>
          <button type="button" class="close-btn" id="closeModalBtn">
            <i class="fa-solid fa-xmark"></i>
            Close
          </button>
        </div>
      </div>
    </div>
    <script src="../js/messages.js" defer></script>
    <script src="../js/logout-confirm.js" defer></script>
  </body>
</html>
