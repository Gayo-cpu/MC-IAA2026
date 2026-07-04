const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();

  let rows = document.querySelectorAll("#membersTable tbody tr");

  rows.forEach((row) => {
    let text = row.textContent.toLowerCase();

    row.style.display = text.includes(filter) ? "" : "none";
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
