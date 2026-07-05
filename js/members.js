const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();

  let rows = document.querySelectorAll("#membersTable tbody tr");

  rows.forEach((row) => {
    let text = row.textContent.toLowerCase();

    row.style.display = text.includes(filter) ? "" : "none";
  });
});
