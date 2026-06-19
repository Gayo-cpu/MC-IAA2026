/**
 * ==========================================================================
 * CONTACT FORM CLIENT-SIDE INTERACTION & VALIDATION ENGINE
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;

            // Target elements and error fields
            const fullName = document.getElementById('full_name');
            const emailAddress = document.getElementById('email_address');
            const msgSubject = document.getElementById('msg_subject');
            const userMessage = document.getElementById('user_message');

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const subjectError = document.getElementById('subjectError');
            const messageError = document.getElementById('messageError');

            // Reset error layouts
            nameError.textContent = "";
            emailError.textContent = "";
            subjectError.textContent = "";
            messageError.textContent = "";

            // 1. Full Name Validation
            if (fullName.value.trim().length < 3) {
                nameError.textContent = "Please enter your full name (minimum 3 characters).";
                isValid = false;
            }

            // 2. Email Address Structural Regex Checklist
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailAddress.value.trim())) {
                emailError.textContent = "Please enter a valid active email address structural pattern.";
                isValid = false;
            }

            // 3. Subject Line Checklist
            if (msgSubject.value.trim().length < 4) {
                subjectError.textContent = "Please clarify your topic details briefly (minimum 4 characters).";
                isValid = false;
            }

            // 4. Message Block Length Boundary Checklist
            if (userMessage.value.trim().length < 15) {
                messageError.textContent = "Please flesh out your message text explicitly (minimum 15 characters).";
                isValid = false;
            }

            // Halt the request thread if any rule fails
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
});