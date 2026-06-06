/* ==========================================
   MUSLIM YOUTH ASSOCIATION - INTERACTIVE ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
    // Makes content fade in as you scroll down, like professional modern sites.
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Target all program cards and section headers for animation
    document.querySelectorAll('.program-card, .section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });


    // 2. DYNAMIC NAVIGATION MORPHING
    // Shrinks the floating nav and increases blur when scrolling.
    window.addEventListener('scroll', () => {
    const navContainer = document.querySelector('.nav-container');
    const mainNav = document.querySelector('.main-nav');

    if (window.scrollY > 80) {
        // When scrolling down
        navContainer.style.padding = "0.4rem 1.5rem";
        navContainer.style.width = "90%";
        navContainer.style.background = "rgba(255, 255, 255, 0.98)";
        mainNav.style.padding = "1rem 5%";
    } else {
        // When at the very top
        navContainer.style.padding = "0.6rem 2rem";
        navContainer.style.width = "95%";
        navContainer.style.background = "rgba(255, 255, 255, 0.9)";
        mainNav.style.padding = "2rem 5%";
    }
});


    // 3. INTERACTIVE SEARCH/FILTER PREVIEW (For News or Hifz)
    // Lets users see results instantly as they type.
    const searchInput = document.getElementById('searchPrograms');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.program-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                if (title.includes(term)) {
                    card.style.display = "block";
                    card.style.animation = "fadeIn 0.5s";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }


    // 4. PARALLAX EFFECT FOR HERO SECTION
    // Subtle movement of the hero text based on mouse position.
    const hero = document.querySelector('.hero-overlay');
    hero.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX * -0.02);
        const moveY = (e.clientY * -0.02);
        document.querySelector('.hero-text').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

});

// 5. THE "ASK IMAM" QUICK-PREVIEW
// Shows the user their question in a "Live Preview" box before submitting.
function updatePreview() {
    const text = document.getElementById('questionInput').value;
    const previewBox = document.getElementById('previewText');
    if (previewBox) {
        previewBox.innerText = text ? text : "Your question will appear here...";
    }
}
/*PRAYER TIME SCRIPT*/
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// Start counters when section is visible
const statsSection = document.querySelector('.stats-bar');
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) startCounters();
}, { threshold: 0.5 });

observer.observe(statsSection);

/*TESTMONY SCRIPT*/
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a small delay for each card to create a "wave" effect
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 150); 
        }
    });
}, observerOptions);

document.querySelectorAll('.testimonial-card-v2').forEach(card => {
    // Initial state: hidden and slightly moved down
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});
/*VALUE BAR SCRIPT*/
const valueCards = document.querySelectorAll('.value-item-card');

const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // This creates the "one-by-one" pop-up effect
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); 
        }
    });
}, { threshold: 0.5 });

valueCards.forEach(card => {
    // Initial state before animation
    card.style.opacity = "0";
    card.style.transform = "scale(0.8)";
    card.style.transition = "all 0.5s ease-out";
    valueObserver.observe(card);
});

// Add this to your CSS to handle the transition
/*
.value-item-card.visible {
    opacity: 1 !important;
    transform: scale(1) !important;
}
*/