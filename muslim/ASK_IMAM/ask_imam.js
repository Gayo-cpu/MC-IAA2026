document.addEventListener("DOMContentLoaded", () => {

    // --- 1. ACCORDION CONTROLLER ENGINE ---
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const currentItem = trigger.parentElement;
            const contentBlock = currentItem.querySelector(".accordion-content");
            const isActive = currentItem.classList.contains("active");

            // Close all active items to ensure singular visual flow
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".accordion-content").style.maxHeight = null;
            });

            // Toggle selected element state calculation
            if (!isActive) {
                currentItem.classList.add("active");
                // Dynamically extract the exact scrollheight of the internal elements
                contentBlock.style.maxHeight = contentBlock.scrollHeight + "px";
            }
        });
    });

    // --- 2. FORM VALIDATION & UI SUBMIT ENGINE ---
    const askForm = document.getElementById("askImamForm");
    const responseBox = document.getElementById("formResponse");

    askForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Lock browser page execution routing

        // Extract input fields
        const name = document.getElementById("userName").value.trim() || "Anonymous";
        const email = document.getElementById("userEmail").value.trim();
        const category = document.getElementById("queryCategory").value;
        const message = document.getElementById("userMessage").value.trim();

        // Basic verification checks
        if (!email || !category || !message) {
            responseBox.className = "response-message error";
            responseBox.textContent = "Please complete all mandatory processing fields.";
            return;
        }

        // Simulating clean system success message loading
        responseBox.className = "response-message success";
        responseBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> Salam, ${name}. Your inquiry has been encrypted and dispatched to the Imam. A reference confirmation has been logged.`;
        responseBox.classList.remove("hidden");

        // Flash interaction block cleanup
        askForm.reset();

        // Auto-remove notification banner safely after an explicit timeout
        setTimeout(() => {
            responseBox.classList.add("hidden");
        }, 6000);
    });
});