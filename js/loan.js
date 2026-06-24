const form = document.getElementById("loanForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const phoneInput = document.getElementById("phone").value.trim();

    if (isNaN(phoneInput) || phoneInput.length < 9) {
        alert("Please enter a valid telephone number.");
        return;
    }


    let applications = JSON.parse(localStorage.getItem("studentLoans")) || [];


    let application = {

        id: applications.length + 1,

        name: document.getElementById("full_name").value,

        regNo: document.getElementById("reg_no").value,

        course: document.getElementById("course_name").value,

        year: document.getElementById("year").value,

        phone: document.getElementById("phone").value,

        nida: document.getElementById("nida").value,

        status: "pending",

        date: new Date().toLocaleDateString()

    };


    applications.push(application);


    localStorage.setItem(
        "studentLoans",
        JSON.stringify(applications)
    );


    alert("✅ Loan application submitted successfully");


    form.reset();

});