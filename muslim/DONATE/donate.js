
document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');
    const successPanel = document.getElementById('donationSuccess');

    donationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const donation = {
            donorName: document.getElementById('donorName').value.trim(),
            donorEmail: document.getElementById('donorEmail').value.trim().toLowerCase(),
            amount: parseFloat(document.getElementById('donationAmount').value),
            message: document.getElementById('donationMessage').value.trim()
        };

        if (!donation.donorName || !donation.donorEmail || !donation.amount || donation.amount <= 0) {
            alert('Please complete the donation form with a valid amount.');
            return;
        }

        try {
            await saveDonationRequest(donation);
            donationForm.reset();
            successPanel.style.display = 'flex';
        } catch (error) {
            console.error('Failed to submit donation:', error);
            alert('Sorry, there was an error submitting your donation. Please try again.');
        }
    });
});
