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
