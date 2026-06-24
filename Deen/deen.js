let loans = [];
let messages = [];

let messageIdCounter = 1;


// LOAD DATA
function initializeData() {

    loans = JSON.parse(localStorage.getItem("studentLoans")) || [];


    messages = [
        {
            id: messageIdCounter++,
            recipient: "Amir Mkuu",
            subject: "Monthly Report",
            date: "18 Jun 2026",
            status: "sent"
        }
    ];


    renderLoans();
    renderMessages();
    updateNotification();

}



// LOANS DISPLAY
function renderLoans() {

    const table = document.getElementById("loanTableBody");

    if (!table) return;


    if (loans.length === 0) {

        table.innerHTML = `
        <tr>
        <td colspan="9">
        No student loan applications yet
        </td>
        </tr>
        `;

        return;
    }



    table.innerHTML = loans.map((loan, index) => `

    <tr>

    <td>#${index + 1}</td>

    <td>${loan.name}</td>

    <td>${loan.regNo}</td>

    <td>${loan.course}</td>

    <td>${loan.year}</td>

    <td>${loan.phone}</td>

    <td>${loan.nida || "N/A"}</td>


    <td>
    <span class="status-badge ${loan.status}">
    ${loan.status}
    </span>
    </td>


    <td>

    ${loan.status === "pending"

            ?

            `
        <button class="btn-confirm"
        onclick="approveLoan(${index})">
        Approve
        </button>


        <button class="btn-delete"
        onclick="rejectLoan(${index})">
        Reject
        </button>
        `

            :

            "Processed"

        }

    </td>


    </tr>


    `).join("");

}




// APPROVE LOAN
function approveLoan(index) {

    loans[index].status = "approved";


    saveLoans();

}


// REJECT LOAN
function rejectLoan(index) {

    loans[index].status = "rejected";


    saveLoans();

}



// SAVE
function saveLoans() {

    localStorage.setItem(
        "studentLoans",
        JSON.stringify(loans)
    );


    renderLoans();

    updateNotification();

}



// NOTIFICATION
function updateNotification() {

    let count = loans.filter(
        l => l.status === "pending"
    ).length;


    let badge = document.getElementById(
        "notificationCount"
    );


    if (badge) {

        badge.textContent = count;

    }

}



// SEARCH LOANS
document.addEventListener(
    "DOMContentLoaded",
    () => {


        const search = document.getElementById(
            "loanSearch"
        );


        if (search) {

            search.addEventListener(
                "keyup",
                () => {


                    let value =
                        search.value.toLowerCase();



                    document
                        .querySelectorAll(
                            "#loanTableBody tr"
                        )
                        .forEach(row => {


                            row.style.display =
                                row.textContent
                                    .toLowerCase()
                                    .includes(value)

                                    ?
                                    ""

                                    :

                                    "none";



                        });


                });

        }


    });





// MESSAGES
function sendMessage() {


    let recipient =
        document.getElementById(
            "msgRecipient"
        ).value;



    let subject =
        document.getElementById(
            "msgSubject"
        ).value;



    let content =
        document.getElementById(
            "msgContent"
        ).value;



    if (!subject || !content) {

        alert("Fill all fields");

        return;

    }



    messages.push({

        id: messageIdCounter++,

        recipient,

        subject,

        content,

        date: new Date()
            .toLocaleDateString(),

        status: "sent"

    });



    renderMessages();



}




function renderMessages() {


    const table =
        document.getElementById(
            "messageTableBody"
        );


    if (!table) return;



    table.innerHTML =
        messages.map(m => `

<tr>

<td>${m.recipient}</td>

<td>${m.subject}</td>

<td>${m.date}</td>

<td>${m.status}</td>

</tr>


`).join("");

}




// PAGE NAVIGATION
document.addEventListener(
    "DOMContentLoaded",
    () => {


        const links =
            document.querySelectorAll(
                ".nav-links a"
            );



        links.forEach(link => {


            link.addEventListener(
                "click",
                function (e) {


                    e.preventDefault();


                    let page = this.dataset.page;



                    document
                        .querySelectorAll(
                            ".page-section"
                        )
                        .forEach(section => {

                            section.classList.remove(
                                "active"
                            );

                        });



                    let target =
                        document.getElementById(
                            "page-" + page
                        );



                    if (target) {

                        target.classList.add(
                            "active"
                        );

                    }



                    links.forEach(l =>
                        l.classList.remove(
                            "active"
                        )
                    );



                    this.classList.add(
                        "active"
                    );



                });



        });





    });




// LOGOUT
document.addEventListener(
    "DOMContentLoaded",
    () => {


        let logout =
            document.getElementById(
                "logoutBtn"
            );


        let modal =
            document.getElementById(
                "logoutModal"
            );



        let cancel =
            document.getElementById(
                "cancelLogout"
            );


        let confirm =
            document.getElementById(
                "confirmLogout"
            );



        if (logout) {

            logout.onclick = function (e) {

                e.preventDefault();

                modal.classList.add(
                    "show"
                );

            }

        }




        if (cancel) {

            cancel.onclick = function () {

                modal.classList.remove(
                    "show"
                );

            }

        }




        if (confirm) {

            confirm.onclick = function () {

                window.location.href = "../views/login.html";

            }

        }



    });





// START
document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeData();

        console.log(
            "Dean Dashboard Ready"
        );


    });