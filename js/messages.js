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

const modal = document.getElementById("messageModal");
const modalSender = document.getElementById("modalSender");
const modalSubject = document.getElementById("modalSubject");
const modalDate = document.getElementById("modalDate");
const modalPriority = document.getElementById("modalPriority");
const modalMessage = document.getElementById("modalMessage");
const modalReplyForm = document.getElementById("modalReplyForm");
const modalReplyText = document.getElementById("modalReplyText");
const openReplyBtn = document.getElementById("openReplyBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalXClose = document.getElementById("modalXClose");

let activeMessage = null;

function closeMessageModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modalReplyForm.classList.remove("active");
  modalReplyText.value = "";
  activeMessage = null;
}

document.querySelectorAll(".view-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const sender = row.children[0].textContent.trim();
    const subject = row.children[1].textContent.trim();
    const date = row.children[2].textContent.trim();
    const priority = row.children[3].textContent.trim();

    activeMessage = { sender, subject };
    modalSender.textContent = sender;
    modalSubject.textContent = subject;
    modalDate.textContent = date;
    modalPriority.textContent = priority;
    modalMessage.textContent = button.dataset.message || subject;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  });
});

openReplyBtn.addEventListener("click", () => {
  modalReplyForm.classList.add("active");
  modalReplyText.focus();
});

modalReplyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!modalReplyText.value.trim()) {
    alert("Please write your reply message.");
    return;
  }

  alert(`Reply sent to ${activeMessage.sender}!`);
  closeMessageModal();
});

closeModalBtn.addEventListener("click", closeMessageModal);
modalXClose.addEventListener("click", closeMessageModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeMessageModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeMessageModal();
  }
});

document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("tr").remove();
  });
});
