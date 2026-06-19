document.addEventListener("DOMContentLoaded", function () {

    // 1. DYNAMIC REFUND/CANCELLATION WINDOW CALCULATOR
    // Generates a target date exactly 30 days from today
    const deadlineElement = document.getElementById("refundDeadline");
    if (deadlineElement) {
        const today = new Date();
        const refundDeadline = new Date(today);
        refundDeadline.setDate(today.getDate() + 30); // 30-day window for official loan updates

        // Formats the date cleanly (e.g., "July 18, 2026")
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        deadlineElement.textContent = refundDeadline.toLocaleDateString('en-US', options);
    }

    // 2. FORM VALIDATION
    const form = document.getElementById("loanForm");
    form.addEventListener("submit", function (event) {
        const phoneInput = document.getElementById("phone").value.trim();

        // Simple validation to check that the phone number contains digit baselines
        if (isNaN(phoneInput) || phoneInput.length < 9) {
            alert("Please enter a valid telephone number.");
            event.preventDefault(); // Prevents page submission on error
        }
    });
});