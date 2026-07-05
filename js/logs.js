const searchLogs = document.getElementById("searchLogs");

searchLogs.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  const rows = document.querySelectorAll("#logsTable tbody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();

    row.style.display = text.includes(value) ? "" : "none";
  });
});
