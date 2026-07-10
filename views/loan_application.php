<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>MCIAA Community Loans</title>

    <link rel="stylesheet" href="../css/index.css">
    <link rel="stylesheet" href="../css/loan_application.css?v=2">
</head>

<body>

    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="nav-container">

            <a href="../views/index.php" class="nav-logo">
                e-MCIAA
            </a>

            <ul class="nav-links">
                <a href="../views/index.php">Home</a>
                <a href="../views/about.php">About Us</a>
                <a href="../views/hifz.php">Programs</a>
                <a href="../views/ask_imam.php">Ask Imam</a>
                <a href="../views/news.php">News</a>
                <a href="../views/donate.php">Donate</a>
                <a href="loan_application.php" class="active">Loan</a>
                <a href="../views/contact.php">Contact Us</a>
            </ul>

            <div class="nav-auth">
                <a href="../views/login.php" class="btn-admin">
                    Admin Login
                </a>

                <a href="../views/register.php" class="btn-join">
                    Join Us
                </a>
            </div>

        </div>
    </nav>



    <!-- HERO SECTION -->

    <section class="loan-hero">

        <div class="hero-content">

            <h1>
                MCIAA Community Loan Program
            </h1>

            <p>
                Supporting our members through trust, cooperation,
                and responsible financial assistance.
            </p>

            <a href="#application" class="hero-btn">
                Apply For Loan
            </a>

        </div>

    </section>




    <!-- LOAN CATEGORIES -->

    <section class="section">

        <h2>
            Our Loan Services
        </h2>

        <p class="section-description">
            MCIAA provides financial support to members
            through simple and transparent loan programs.
        </p>


        <div class="loan-cards">


            <div class="loan-card">

                <div class="loan-icon">
                    🎓
                </div>

                <h3>
                    Student Loan
                </h3>

                <p>
                    Financial support for tuition fees,
                    academic materials and educational expenses.
                </p>

            </div>



            <div class="loan-card">

                <div class="loan-icon">
                    🚑
                </div>

                <h3>
                    Emergency Loan
                </h3>

                <p>
                    Assistance during urgent situations
                    such as medical or unexpected family needs.
                </p>

            </div>


        </div>

    </section>





    <!-- HOW IT WORKS -->

    <section class="process-section">

        <h2>
            How The Loan Process Works
        </h2>


        <div class="process-container">


            <div class="process-step">
                <span>1</span>
                <h3>Submit Application</h3>
                <p>
                    Provide your details and loan requirements.
                </p>
            </div>


            <div class="process-step">
                <span>2</span>
                <h3>Application Review</h3>
                <p>
                    MCIAA reviews your request.
                </p>
            </div>


            <div class="process-step">
                <span>3</span>
                <h3>Approval Decision</h3>
                <p>
                    Loan request is approved or declined.
                </p>
            </div>


            <div class="process-step">
                <span>4</span>
                <h3>Repayment</h3>
                <p>
                    Follow the agreed repayment schedule.
                </p>
            </div>


        </div>

    </section>





    <!-- REQUIREMENTS -->

    <section class="requirements section">


        <h2>
            Loan Requirements
        </h2>


        <div class="requirements-box">

            <ul>

                <li>✔ MCIAA membership</li>

                <li>✔ Valid identification</li>

                <li>✔ Active phone number</li>

                <li>✔ Clear loan purpose</li>

                <li>✔ Guarantor information</li>

                <li>✔ Agreement to repayment terms</li>

            </ul>

        </div>


    </section>





    <!-- LOAN CALCULATOR -->


    <section class="calculator-section">


        <h2>
            Loan Calculator
        </h2>


        <div class="calculator-box">


            <div class="calculator-input">

                <label for="loanAmount">
                    Loan Amount (TZS)
                </label>

                <input type="number" id="loanAmount" placeholder="Example: 500,000">


            </div>



            <div class="calculator-input">

                <label for="loanDuration">
                    Repayment Period
                </label>

                <select id="loanDuration">

                    <option value="3">
                        3 Months
                    </option>

                    <option value="6">
                        6 Months
                    </option>

                    <option value="12" selected>
                        12 Months
                    </option>

                    <option value="24">
                        24 Months
                    </option>

                </select>

            </div>



            <div class="calculation-result">

                Estimated Monthly Payment:

                <strong id="monthlyPayment">
                    0 TZS
                </strong>

            </div>


        </div>


    </section>





    <!-- APPLICATION FORM -->


    <section class="application-section" id="application">


        <h2>
            Loan Application Form
        </h2>


        <p class="form-description">
            Please provide accurate information
            for MCIAA loan processing.
        </p>




        <form id="loanForm" action="../backend/process_loan.php" method="POST">


            <!-- PERSONAL INFORMATION -->


            <div class="form-section">


                <h3>
                    Personal Information
                </h3>



                <div class="form-grid">


                    <div class="form-group">

                        <label for="full_name">
                            Full Name
                        </label>

                        <input type="text" id="full_name" name="full_name" required>

                    </div>



                    <div class="form-group">

                        <label for="phone">
                            Phone Number
                        </label>

                        <input type="tel" id="phone" name="phone" required autocomplete="off">

                    </div>




                    <div class="form-group">

                        <label for="reg_no">
                            Registration Number
                        </label>

                        <input type="text" id="reg_no" name="reg_no" required>

                    </div>




                    <div class="form-group">

                        <label for="course">
                            Course Name
                        </label>

                        <input type="text" id="course" name="course" required>

                    </div>



                    <div class="form-group">

                        <label for="year">
                            Year of Study
                        </label>

                        <select id="year" name="year">

                            <option value=" 1">
                                Year 1
                            </option>

                            <option value=" 2">
                                Year 2
                            </option>

                            <option value=" 3">
                                Year 3
                            </option>

                        </select>

                    </div>



                </div>


            </div>





            <!-- LOAN DETAILS -->


            <div class="form-section">


                <h3>
                    Loan Details
                </h3>


                <div class="form-grid">


                    <div class="form-group">

                        <label for="loan_category">
                            Loan Type
                        </label>

                        <select id="loan_category" name="loan_category">

                            <option value="Student_Loan">
                                Student Loan
                            </option>

                            <option value="Emergency_Loan">
                                Emergency Loan
                            </option>

                        </select>

                    </div>



                    <div class="form-group">

                        <label for="amount">
                            Amount Requested (TZS)
                        </label>

                        <input type="number" id="amount" name="amount" required>

                    </div>



                    <div class="form-group full">

                        <label for="reason">
                            Loan Purpose
                        </label>

                        <textarea id="reason" name="reason" rows="4" required></textarea>

                    </div>



                </div>


            </div>


            <div class="agreement">

                <input type="checkbox" id="agreement" name="agreement" required>

                I agree to MCIAA loan repayment terms and conditions.

            </div>




            <button type="submit" class="submit-btn">

                Submit Loan Application

            </button>



        </form>



    </section>





    <!-- TERMS -->


    <section class="terms-section">


        <h2>
            Loan Terms & Conditions
        </h2>


        <p>
            Borrowers must provide accurate information,
            respect repayment agreements, and fulfill
            their financial responsibilities to MCIAA.
        </p>


    </section>





    <!-- CONTACT -->


    <section class="contact-section">


        <h2>
            Need Help?
        </h2>


        <p>
            Contact MCIAA office for more information
            about the loan program.
        </p>


    </section>





    <footer>

        <p>
            © 2026 e-MCIAA. All Rights Reserved.
        </p>

    </footer>



    <script src="../js/loan_application.js?v=2"></script>

</body>

</html>