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

// INCOMING MESSAGE ACTIONS

document.querySelectorAll(".reply-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const sender = row.children[0].textContent.trim();
    const subject = row.children[1].textContent.trim();
    const recipient = form.querySelector("select");
    const subjectInput = form.querySelector('input[type="text"]');
    const messageInput = form.querySelector("textarea");

    recipient.value = sender;
    subjectInput.value = `Re: ${subject}`;
    messageInput.focus();
  });
});

document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("tr").remove();
  });
});
