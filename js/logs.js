const searchLogs = document.getElementById("searchLogs");

searchLogs.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  const rows = document.querySelectorAll("#logsTable tbody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();

    row.style.display = text.includes(value) ? "" : "none";
  });
});

const logoutBtn = document.getElementById("logoutBtn");

const logoutModal = document.getElementById("logoutModal");

const cancelLogout = document.getElementById("cancelLogout");

const confirmLogout = document.getElementById("confirmLogout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();

    logoutModal.style.display = "flex";
  });
}

if (cancelLogout) {
  cancelLogout.addEventListener("click", function () {
    logoutModal.style.display = "none";
  });
}

if (confirmLogout) {
  confirmLogout.addEventListener("click", function () {
    window.location.href = "login.html";
  });
}
