const searchPost = document.getElementById("searchPost");

searchPost.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  const posts = document.querySelectorAll(".post-card");

  posts.forEach((post) => {
    const content = post.textContent.toLowerCase();

    post.style.display = content.includes(value) ? "block" : "none";
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
