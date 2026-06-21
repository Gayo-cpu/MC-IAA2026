const searchLoan = document.getElementById("loanSearch");

searchLoan.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  let rows = document.querySelectorAll("#loanTable tbody tr");

  rows.forEach((row) => {
    let content = row.textContent.toLowerCase();

    row.style.display = content.includes(value) ? "" : "none";
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
