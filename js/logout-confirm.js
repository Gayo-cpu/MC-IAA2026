(function () {
  const logoutLinks = Array.from(
    document.querySelectorAll('a[href*="login"]')
  ).filter((link) => link.querySelector(".fa-right-from-bracket"));

  if (!logoutLinks.length) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    .logout-confirm-overlay {
      align-items: center;
      background: rgba(0, 0, 0, 0.45);
      display: none;
      inset: 0;
      justify-content: center;
      padding: 20px;
      position: fixed;
      z-index: 2000;
    }

    .logout-confirm-overlay.active {
      display: flex;
    }

    .logout-confirm-box {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
      max-width: 420px;
      padding: 24px;
      text-align: center;
      width: min(100%, 420px);
    }

    .logout-confirm-icon {
      align-items: center;
      background: #fff4cc;
      border-radius: 50%;
      color: #9a6b00;
      display: inline-flex;
      font-size: 24px;
      height: 58px;
      justify-content: center;
      margin-bottom: 16px;
      width: 58px;
    }

    .logout-confirm-box h3 {
      color: #0b8f4d;
      font-size: 22px;
      margin: 0 0 8px;
    }

    .logout-confirm-box p {
      color: #555;
      line-height: 1.5;
      margin: 0 0 22px;
    }

    .logout-confirm-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .logout-confirm-actions button {
      align-items: center;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      display: inline-flex;
      font-size: 15px;
      font-weight: 600;
      gap: 8px;
      justify-content: center;
      padding: 12px 18px;
      transition: 0.3s;
      width: auto;
    }

    .logout-cancel-btn {
      background: #f1f3f4;
      color: #333;
    }

    .logout-cancel-btn:hover {
      background: #e1e5e8;
    }

    .logout-confirm-btn {
      background: #dc3545;
      color: #fff;
    }

    .logout-confirm-btn:hover {
      background: #b92c3a;
    }

    @media (max-width: 480px) {
      .logout-confirm-actions {
        flex-direction: column;
      }

      .logout-confirm-actions button {
        width: 100%;
      }
    }
  `;
  document.head.appendChild(style);

  const modal = document.createElement("div");
  modal.className = "logout-confirm-overlay";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="logout-confirm-box" role="dialog" aria-modal="true" aria-labelledby="logoutConfirmTitle">
      <div class="logout-confirm-icon">
        <i class="fa-solid fa-right-from-bracket"></i>
      </div>
      <h3 id="logoutConfirmTitle">Confirm Logout</h3>
      <p>Are you sure you want to logout and go back to the login page?</p>
      <div class="logout-confirm-actions">
        <button type="button" class="logout-cancel-btn">
          <i class="fa-solid fa-xmark"></i>
          Cancel
        </button>
        <button type="button" class="logout-confirm-btn">
          <i class="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const cancelButton = modal.querySelector(".logout-cancel-btn");
  const confirmButton = modal.querySelector(".logout-confirm-btn");
  let logoutUrl = "";

  function openConfirm(url) {
    logoutUrl = url;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    cancelButton.focus();
  }

  function closeConfirm() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    logoutUrl = "";
  }

  logoutLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openConfirm(link.href);
    });
  });

  cancelButton.addEventListener("click", closeConfirm);

  confirmButton.addEventListener("click", () => {
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeConfirm();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeConfirm();
    }
  });
})();
