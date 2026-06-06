
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successPanel = document.getElementById('contactSuccess');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const message = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim().toLowerCase(),
            subject: document.getElementById('contactSubject').value.trim(),
            message: document.getElementById('contactMessage').value.trim()
        };

        if (!message.name || !message.email || !message.subject || !message.message) {
            alert('Please complete all required fields.');
            return;
        }

        try {
            await saveContactMessage(message);
            contactForm.reset();
            successPanel.style.display = 'flex';
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        }
    });
});
