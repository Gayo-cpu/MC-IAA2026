const searchLoan = document.getElementById("loanSearch");

searchLoan.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  let rows = document.querySelectorAll("#loanTable tbody tr");

  rows.forEach((row) => {
    let content = row.textContent.toLowerCase();

    row.style.display = content.includes(value) ? "" : "none";
  });
});
