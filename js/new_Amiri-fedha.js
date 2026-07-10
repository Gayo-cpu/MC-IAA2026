
// GLOBAL DATA

let donations = [];
let loans = [];
let messages = [];

// INITIALIZE DASHBOARD

function initializeData() {
    donations = [];
    messages = [];

    // Load loans from database first
    loadLoansFromDatabase();
    updateNotificationCount();
}

// LOAD LOANS FROM MYSQL DATABASE

function loadLoansFromDatabase() {


    fetch("../backend/fetch_loans.php")


        .then(response => response.json())


        .then(data => {


            if (data.success) {


                loans = data.loans.map(loan => ({
                    id: loan.loan_id,
                    full_name: loan.full_name,
                    reg_no: loan.reg_no,
                    course: loan.course,
                    year: loan.year,
                    phone: loan.phone,
                    amount: Number(
                        loan.amount.toString()
                            .replace(/,/g, "")
                    ),

                    reason: loan.reason,
                    loan_category: loan.loan_category,

                    status: loan.status.toLowerCase(),
                    date: loan.date
                }));


                renderLoans();
                updateOverviewCards();
                updateNotificationCount();
            }

            else {
                console.log("API Error:", data.message);

            }

        })
        .catch(error => {
            console.error(
                "Loan loading error:",
                error
            );


        });
}

// ADD LOAN (ADMIN SIDE)

function addLoan() {
    const full_name = document.getElementById("full_name").value.trim();
    const amount = document.getElementById("loanAmount").value;
    const duration = document.getElementById("loanDuration").value;

    // ADD THIS LINE HERE: Grab the category dropdown element from your modal form
    const loanCategoryEl = document.getElementById("loan_category");
    const loan_category = loanCategoryEl ? loanCategoryEl.value : "Student_Loan";

    if (full_name === "") {
        alert("Enter full name");
        return;
    }
    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    let formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("amount", amount);
    formData.append("duration", duration);
    formData.append("loan_category", loan_category);

    fetch("../backend/add_loan.php",
        {

            method: "POST",

            body: formData

        })


        .then(res => res.json())


        .then(data => {


            if (data.success) {


                alert(
                    "Loan added successfully"
                );


                document.getElementById("full_name").value = "";

                document.getElementById("loanAmount").value = "";


                loadLoansFromDatabase();


            }


            else {


                alert(data.message);


            }


        })



        .catch(() => {


            alert(
                "Server connection error"
            );


        });



}

// APPROVE LOAN

function approveLoan(id) {


    updateLoanStatus(
        id,
        "Approved"
    );


}

// REJECT LOAN

function rejectLoan(id) {


    updateLoanStatus(
        id,
        "Rejected"
    );


}

// UPDATE LOAN STATUS

function updateLoanStatus(id, status) {


    let formData =
        new FormData();


    formData.append(
        "loan_id",
        id
    );


    formData.append(
        "status",
        status
    );



    fetch("../backend/update_loan.php",
        {

            method: "POST",

            body: formData

        })



        .then(res => res.json())



        .then(data => {


            if (data.success) {


                alert(
                    "Loan " + status
                );


                loadLoansFromDatabase();


            }

            else {


                alert(data.message);


            }


        });



}

// DELETE LOAN

function deleteLoan(id) {


    if (!confirm(
        "Delete this loan application?"
    )) return;



    let formData =
        new FormData();


    formData.append(
        "loan_id",
        id
    );



    fetch("../backend/delete_loan.php",
        {

            method: "POST",

            body: formData

        })



        .then(res => res.json())


        .then(data => {


            if (data.success) {


                alert(
                    "Loan deleted"
                );


                loadLoansFromDatabase();


            }

            else {


                alert(data.message);


            }


        });

}

// RENDER LOANS TABLE

function renderLoans() {


    const tbody =
        document.getElementById("loanTableBody");



    if (!tbody) return;


    if (loans.length === 0) {

        tbody.innerHTML = `

        <tr>
            <td colspan="10" style="text-align:center;padding:30px;color:#999">
                <i class="fa-solid fa-inbox" style="font-size:25px; margin-bottom:10px;"></i>
                <br>No loan applications found matching criteria
            </td>
        </tr>

        `;

        return;

    }

    tbody.innerHTML = loans.map(loan => {


        let statusClass =
            loan.status.toLowerCase();



        let actionButtons = "";



        // Checking string comparison value strictly against mapped lower case transformation array rules
        if (statusClass === "pending") {
            actionButtons = `
            <button onclick="approveLoan(${loan.id})" class="btn btn-success btn-sm" style="background:#2ec4b6;color:white;border:none;padding:5px 8px;border-radius:4px;cursor:pointer;margin-right:2px;">
                <i class="fas fa-check"></i> Approve
            </button>
            <button onclick="rejectLoan(${loan.id})" class="btn btn-danger btn-sm" style="background:#e71d36;color:white;border:none;padding:5px 8px;border-radius:4px;cursor:pointer;">
                <i class="fas fa-times"></i> Reject
            </button>
            `;
        } else {
            actionButtons = `
            <span style="color:#0b8f4d; font-weight:600; font-size:13px;">
                <i class="fa-solid fa-check-circle"></i> Processed (${loan.status})
            </span>
            `;
        }

        return `
        <tr>
            <td><strong>#${loan.id}</strong></td> <td>${escapeHtml(loan.full_name)}</td>
            <td><code>${escapeHtml(loan.reg_no)}</code></td>
            <td>${escapeHtml(loan.course)}</td>
            <td>Year ${loan.year}</td>
            <td>${loan.phone}</td>
            <td>${escapeHtml(loan.reason)}</td> 
            <td>TSh ${formatNumber(loan.amount)}</td>
            <td><span class="status-badge ${statusClass}">${loan.status}</span></td>
            <td>${loan.date}</td>
            <td>
                <div class="action-buttons" style="display: flex; align-items: center; gap: 4px;">
                    ${actionButtons} <button onclick="deleteLoan(${loan.id})" class="btn btn-link text-danger p-0 ms-2" style="background:none; border:none; cursor:pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `;
    }).join("");
}

// RENDER SEARCH RESULTS

function renderFilteredLoans(data) {


    const oldLoans = loans;


    loans = data;


    renderLoans();


    loans = oldLoans;


}
// UPDATE DASHBOARD METRICS SUMMARY COUNTS 
function updateOverviewCards() {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalLoans = loans.reduce((sum, l) => sum + l.amount, 0);

    const approvedLoans = loans.filter(l => l.status === "approved").length;
    const pendingLoans = loans.filter(l => l.status === "pending").length;

    const confirmedDonations = donations.filter(d => d.status === "confirmed").length;
    const pendingDonations = donations.filter(d => d.status === "pending").length;

    const totalDonationsEl = document.getElementById("totalDonations");
    const donationCountEl = document.getElementById("donationCount");
    const totalLoansEl = document.getElementById("totalLoans");
    const loanCountEl = document.getElementById("loanCount");
    const confirmedCountEl = document.getElementById("confirmedCount");
    const confirmedDetailEl = document.getElementById("confirmedDetail");
    const pendingCountEl = document.getElementById("pendingCount");
    const pendingDetailEl = document.getElementById("pendingDetail");

    if (totalDonationsEl) totalDonationsEl.textContent = "TSh " + formatNumber(totalDonations);
    if (donationCountEl) donationCountEl.textContent = donations.length + " donations";
    if (totalLoansEl) totalLoansEl.textContent = "TSh " + formatNumber(totalLoans);
    if (loanCountEl) loanCountEl.textContent = loans.length + " loans";

    if (confirmedCountEl) confirmedCountEl.textContent = confirmedDonations + approvedLoans;
    if (confirmedDetailEl) confirmedDetailEl.textContent = `${confirmedDonations} donations · ${approvedLoans} loans`;

    if (pendingCountEl) pendingCountEl.textContent = pendingDonations + pendingLoans;
    if (pendingDetailEl) pendingDetailEl.textContent = `${pendingDonations} donations · ${pendingLoans} loans`;
}

// UPDATE NOTIFICATIONS

function updateNotificationCount() {


    const pendingLoans =
        loans.filter(
            l => l.status.toLowerCase() === "pending"
        ).length;



    const pendingDonations =
        donations.filter(
            d => d.status === "pending"
        ).length;



    const total =
        pendingLoans + pendingDonations;



    const badge =
        document.getElementById(
            "notificationCount"
        );



    if (badge) {

        badge.textContent = total;

    }


}
// LOCAL FILTERS KEYSTROKE INPUT CAPTURE LOOP
const loanSearch = document.getElementById("loanSearch");
if (loanSearch) {
    loanSearch.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        const filtered = loans.filter(loan => {
            return (
                loan.full_name.toLowerCase().includes(value) ||
                loan.reg_no.toLowerCase().includes(value) ||
                loan.course.toLowerCase().includes(value) ||
                loan.status.toLowerCase().includes(value)
            );
        });
        renderFilteredLoans(filtered);
    });
}
// SIDEBAR SINGLE PAGE VIEW ROUTER
document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");

        document.querySelectorAll(".nav-links a").forEach(item => {
            item.classList.remove("active");
        });
        this.classList.add("active");

        document.querySelectorAll(".page-section").forEach(section => {
            section.classList.remove("active");
        });

        const selectedPage = document.getElementById("page-" + page);
        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        const title = document.getElementById("pageTitle");
        const titles = {
            overview: "Financial Overview",
            donations: "Donations Management",
            loans: "Loans Overview",
            messages: "Messages Center",
            settings: "Settings"
        };

        if (title && titles[page]) {
            title.textContent = titles[page];
        }
    });
});

// --- FIXED SECTION: ADDED CRITICAL CORE HELPER FUNCTIONS ---
function formatNumber(num) {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 0 }).format(num);
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// MOUNT TO FRAME CONTAINER INITIALIZER RUNTIME
document.addEventListener("DOMContentLoaded", function () {
    initializeData();
    console.log("Amiri Fedha Dashboard Ready");
});