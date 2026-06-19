/**
 * Hifz Program Interactive Scripts
 * Author: Godlove Godwin Mfungo
 */

document.addEventListener('DOMContentLoaded', () => {
    const hifzCards = document.querySelectorAll('.hifz-card');

    // 1. Staggered Entrance Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Creates a smooth "wave" effect as cards appear
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 200);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    hifzCards.forEach(card => {
        // Initial state before scroll
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        cardObserver.observe(card);
    });

    // 2. Interactive "Reward" Click Effect
    // A small interaction to encourage students
    hifzCards.forEach(card => {
        card.addEventListener('click', () => {
            const level = card.querySelector('.level-badge').innerText;
            console.log(`User interested in: ${level}`);
            
            // You can later expand this to open a registration modal
            // or show more details about that specific level.
        });
    });
});

/**
 * MCIAA Association - Vision & Mission Dynamics
 * Developed by: Godlove Godwin Mfungo
 */

document.addEventListener('DOMContentLoaded', () => {
    const infoCards = document.querySelectorAll('.info-card');

    infoCards.forEach(card => {
        // 1. Mouse Tracking Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15; // Vertical tilt
            const rotateY = (centerX - x) / 15; // Horizontal tilt

            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // 2. Reset on Mouse Leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
        });
    });

    // 3. Staggered Entrance (Ensures cards don't appear at exactly the same time)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 200); // 200ms delay between cards
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card').forEach(card => observer.observe(card));
});