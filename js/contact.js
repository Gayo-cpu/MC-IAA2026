/**
 * CONTACT FORM - inatuma data kwa backend na kuonyesha ujumbe wa mafanikio/hitilafu
 */
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Reset errors
            ['nameError','emailError','subjectError','messageError'].forEach(id => {
                document.getElementById(id).textContent = '';
            });
            formResponse.style.display = 'none';

            const fullName    = document.getElementById('full_name');
            const emailAddr   = document.getElementById('email_address');
            const msgSubject  = document.getElementById('msg_subject');
            const userMessage = document.getElementById('user_message');

            let isValid = true;

            if (fullName.value.trim().length < 3) {
                document.getElementById('nameError').textContent = 'Tafadhali ingiza jina lako (angalau herufi 3).';
                isValid = false;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailAddr.value.trim())) {
                document.getElementById('emailError').textContent = 'Tafadhali ingiza barua pepe sahihi.';
                isValid = false;
            }
            if (msgSubject.value.trim().length < 4) {
                document.getElementById('subjectError').textContent = 'Mada lazima iwe na herufi angalau 4.';
                isValid = false;
            }
            if (userMessage.value.trim().length < 15) {
                document.getElementById('messageError').textContent = 'Ujumbe lazima uwe na herufi angalau 15.';
                isValid = false;
            }

            if (!isValid) return;

            // Send to backend
            submitBtn.disabled = true;
            submitBtn.textContent = 'Inatuma...';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('../backend/contact_submit.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                formResponse.style.display = 'block';
                if (result.success) {
                    formResponse.style.background = '#d4edda';
                    formResponse.style.color = '#155724';
                    formResponse.style.border = '1px solid #c3e6cb';
                    formResponse.textContent = '✅ ' + result.message;
                    contactForm.reset();
                } else {
                    formResponse.style.background = '#f8d7da';
                    formResponse.style.color = '#721c24';
                    formResponse.style.border = '1px solid #f5c6cb';
                    formResponse.textContent = '❌ ' + result.message;
                }
            } catch (err) {
                formResponse.style.display = 'block';
                formResponse.style.background = '#f8d7da';
                formResponse.style.color = '#721c24';
                formResponse.style.border = '1px solid #f5c6cb';
                formResponse.textContent = '❌ Hitilafu ya mtandao. Tafadhali jaribu tena.';
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }
});
