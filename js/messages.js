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

// ── PHP FETCH INTEGRATION ─────────────────────────────────────
// Overrides the demo submit above — sends real data to database

form.addEventListener("submit", function () {
    // e.preventDefault() was already called by the listener above
    // so we just run the fetch here

    const recipient = document.getElementById("msgRecipient")?.value.trim()  ?? "";
    const subject   = document.getElementById("msgSubject")?.value.trim()    ?? "";
    const content   = document.getElementById("msgContent")?.value.trim()    ?? "";

    // Stop if fields are empty
    if (!recipient || !subject || !content) return;

    const formData = new FormData();
    formData.append("recipient", recipient);
    formData.append("subject",   subject);
    formData.append("content",   content);

    fetch("../backend/send_message.php", { method: "POST", body: formData })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Reload sent messages table to show new entry
            loadSentMessages();
        } else {
            alert("Failed to send: " + data.message);
        }
    })
    .catch(err => console.error("Send message error:", err));
});

// ── LOAD SENT MESSAGES FROM DB ────────────────────────────────
function loadSentMessages() {
    fetch("../backend/fetch_messages.php")
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector("#messageTable tbody");
        if (!tbody) return;
        tbody.innerHTML = "";

        if (!data.success || data.count === 0) {
            tbody.innerHTML = `<tr>
                <td colspan="4" style="text-align:center;color:#999;padding:20px;">
                    No sent messages.
                </td>
            </tr>`;
            return;
        }

        data.messages.forEach(m => {
            tbody.innerHTML += `<tr>
                <td>${m.recipient_name}</td>
                <td>${m.subject}</td>
                <td>${m.date}</td>
                <td><span class="sent">${m.status}</span></td>
            </tr>`;
        });
    })
    .catch(err => console.error("Fetch messages error:", err));
}

// ── AUTO-LOAD on page ready ───────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
    loadSentMessages();
});
