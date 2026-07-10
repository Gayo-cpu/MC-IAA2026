

// --- SECTION 1: FORM SUBMISSION VIA AJAX ---
document.getElementById("loanForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append("full_name", document.getElementById("full_name").value);
    formData.append("reg_no", document.getElementById("reg_no").value);
    formData.append("course", document.getElementById("course").value);
    formData.append("year", document.getElementById("year").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("loan_category", document.getElementById("loan_category").value);
    formData.append("amount", document.getElementById("amount").value);
    formData.append("reason", document.getElementById("reason").value);

    // Debugging loop
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    // e.g., "../backend/process_loan.php"
    fetch("../backend/process_loan.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log("SERVER RESPONSE:", data);

            // Show success alert to user and reset the form fields
            alert("Application submitted successfully!");
            document.getElementById("loanForm").reset();
            document.getElementById("monthlyPayment").innerHTML = "0 TZS";
        })
        .catch(error => {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        });
}); // FIXED: Added missing closing bracket and parenthesis for the submit event!


// --- SECTION 2: LOAN CALCULATOR ---
const loanAmountInput = document.getElementById("loanAmount");
const loanDurationInput = document.getElementById("loanDuration");
const monthlyPayment = document.getElementById("monthlyPayment");

function calculateLoan() {
    let amount = Number(loanAmountInput.value);
    let duration = Number(loanDurationInput.value);

    if (amount > 0) {
        let payment = amount / duration;

        // Formats numbers nicely (e.g., 500,000)
        monthlyPayment.innerHTML = payment.toLocaleString("en-TZ") + " TZS";
    } else {
        monthlyPayment.innerHTML = "0 TZS";
    }
}

// Event listeners for interactive calculation
loanAmountInput.addEventListener("input", calculateLoan);
loanDurationInput.addEventListener("change", calculateLoan);