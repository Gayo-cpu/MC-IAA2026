/**
 * Synchronizes the upper layout category call-to-action cards 
 * directly to the standard radio form selectors.
 */
function selectCategory(catName) {
    if (catName === 'Support MCIAA Association') {
        document.getElementById('cat-assoc').checked = true;
    } else {
        document.getElementById('cat-charity').checked = true;
    }
    document.getElementById('donation-form-section').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Configuration Map storing structural payment execution instructions 
 * for the localized Tanzanian processing infrastructure.
 */
const instructions = {
    'M-Pesa': '<strong>⚡ M-Pesa Payment Method:</strong><br>Please send your donation amount to Lipa Namba: <b>501234</b> (MCIAA Operations) or dial *150*00#.',
    'Airtel Money': '<strong>⚡ Airtel Money Payment Method:</strong><br>Please send your donation amount to Lipa Namba: <b>781234</b> (MCIAA General) via Airtel Merchant menu.',
    'Tigo Pesa': '<strong>⚡ Tigo Pesa Payment Method:</strong><br>Please send your donation amount to Lipa Namba: <b>251234</b> (MCIAA Charity Support).',
    'HaloPesa': '<strong>⚡ HaloPesa Payment Method:</strong><br>Please send your donation amount to HaloPesa ID: <b>991234</b>.',
    'Bank Transfer': '<strong>🏦 CRDB/NMB Bank Account Transfer:</strong><br><b>Bank Name:</b> CRDB Bank<br><b>Account Name:</b> MCIAA Student Association<br><b>Account Number:</b> 0152XXXXXXXXX'
};

/**
 * Attaches event monitors over the radio node clusters to flash 
 * descriptive transaction instructions based on chosen payment gateways.
 */
document.getElementById('payment-methods').addEventListener('change', function (e) {
    const selectedMethod = e.target.value;
    const displayBox = document.getElementById('instruction-display');

    if (instructions[selectedMethod]) {
        displayBox.innerHTML = instructions[selectedMethod];
        displayBox.style.display = 'block';
    } else {
        displayBox.style.display = 'none';
    }
});

/**
 * ==========================================================================
 * VIEWPORT INTERSECTION TRACKING CHASSIS (FAQ ANIMATIONS)
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", function () {
    // Select all targeted FAQ element nodes
    const faqElements = document.querySelectorAll('.faq-item');

    // Configuration constraints for the observer engine
    const observerOptions = {
        root: null,         // Use the browser viewport as the containment container
        rootMargin: '0px',  // No expanding or contracting box parameters
        threshold: 0.15     // Trigger execution when exactly 15% of the card is visible
    };

    // Instantiate the listener callback engine
    const faqScrollObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            // Check if the individual node has crossed into active view
            if (entry.isIntersecting) {
                // Fire the CSS transformation trigger class
                entry.target.classList.add('reveal-active');

                // Unobserve the element so the animation only plays once per page load
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Bind each element node directly into the observer processing core
    faqElements.forEach(element => {
        faqScrollObserver.observe(element);
    });
});