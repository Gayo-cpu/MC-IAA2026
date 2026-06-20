// SEARCH SENT MESSAGES

const searchInput = document.getElementById("searchMessage");

searchInput.addEventListener("keyup", () => {
  let value = searchInput.value.toLowerCase();

  let rows = document.querySelectorAll("#messageTable tbody tr");

  rows.forEach((row) => {
    let text = row.textContent.toLowerCase();

    row.style.display = text.includes(value) ? "" : "none";
  });
});

// FORM DEMO

const form = document.getElementById("messageForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Message sent successfully!");

  form.reset();
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
