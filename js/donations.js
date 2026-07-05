const donationSearch = document.getElementById("donationSearch");

donationSearch.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  let rows = document.querySelectorAll("#donationTable tbody tr");

  rows.forEach((row) => {
    let text = row.textContent.toLowerCase();

    row.style.display = text.includes(value) ? "" : "none";
  });
});
