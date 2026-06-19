/**
 * MCIAA Association - About Us Interactions
 * Developed by: Godlove Godwin Mfungo
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Dynamic Team Icon Interaction
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.member-img i');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = '0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.member-img i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 3. Simple Objective Item Stagger
    const objectives = document.querySelectorAll('.obj-item');
    objectives.forEach((obj, index) => {
        obj.style.transitionDelay = `${index * 0.1}s`;
    });
});