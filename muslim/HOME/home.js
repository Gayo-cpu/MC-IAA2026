/* ==========================================
   MUSLIM YOUTH ASSOCIATION - INTERACTIVE ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    /* 1. SCROLL-TRIGGERED ANIMATIONS */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.program-card, .section-header, .prayer-card, .stat-item, .testimonial-card-v2, .value-item-card').forEach(el => {
        el.classList.add('fade-in');
        revealObserver.observe(el);
    });

    /* 2. NAVIGATION MORPHING */
    const navContainer = document.querySelector('.nav-container');
    const mainNav = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        if (!navContainer || !mainNav) return;

        if (window.scrollY > 80) {
            navContainer.style.padding = '0.4rem 1.5rem';
            navContainer.style.width = '90%';
            navContainer.style.background = 'rgba(255, 255, 255, 0.98)';
            mainNav.style.padding = '1rem 5%';
        } else {
            navContainer.style.padding = '0.6rem 2rem';
            navContainer.style.width = '95%';
            navContainer.style.background = 'rgba(255, 255, 255, 0.9)';
            mainNav.style.padding = '2rem 5%';
        }
    });

    /* 3. SEARCH PREVIEW */
    const searchInput = document.getElementById('searchPrograms');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.program-card').forEach(card => {
                const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
                card.style.display = title.includes(term) ? 'block' : 'none';
            });
        });
    }

    /* 4. HERO PARALLAX */
    const hero = document.querySelector('.hero-overlay');
    const heroText = document.querySelector('.hero-text');
    if (hero && heroText) {
        hero.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX * -0.02);
            const moveY = (e.clientY * -0.02);
            heroText.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    /* 5. LIVE CHAT WIDGET */
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatPanel = document.getElementById('chatPanel');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    const toggleChat = (show) => {
        if (!chatPanel) return;
        chatPanel.classList.toggle('open', show);
        chatPanel.setAttribute('aria-hidden', show ? 'false' : 'true');
        if (show && chatInput) chatInput.focus();
    };

    const appendChatMessage = (text, sender = 'bot') => {
        if (!chatMessages) return;
        const message = document.createElement('div');
        message.className = `chat-message ${sender}`;
        message.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const sendUserMessage = () => {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        appendChatMessage(text, 'user');
        chatInput.value = '';
        setTimeout(() => {
            appendChatMessage('Thank you for your message! We will get back to you shortly. For faster support, use WhatsApp below.', 'bot');
        }, 900);
    };

    if (chatToggle) {
        chatToggle.addEventListener('click', () => toggleChat(true));
    }

    if (chatClose) {
        chatClose.addEventListener('click', () => toggleChat(false));
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendUserMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendUserMessage();
            }
        });
    }

    renderHomeAnnouncements();
});

function renderHomeAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('mc_announcements') || '[]')
        .filter(item => item.status === 'Active');
    const container = document.getElementById('homeAnnouncements');

    if (!container) return;

    if (announcements.length === 0) {
        container.innerHTML = `
            <div class="announcement-card">
                <div class="announcement-meta">
                    <h3>No announcements available</h3>
                    <span class="announcement-pill">None</span>
                </div>
                <p>Administrators will publish updates here soon. Check back for the latest news, events, and program status.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = announcements.map(a => `
        <div class="announcement-card">
            <div class="announcement-meta">
                <h3>${a.title}</h3>
                <span class="announcement-pill">${a.status}</span>
            </div>
            <p>${a.message}</p>
        </div>
    `).join('');
}

function updatePreview() {
    const text = document.getElementById('questionInput')?.value || '';
    const previewBox = document.getElementById('previewText');
    if (previewBox) {
        previewBox.innerText = text ? text : 'Your question will appear here...';
    }
}

const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText || 0;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = `${target}+`;
            }
        };
        updateCount();
    });
};

const statsSection = document.querySelector('.stats-bar');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
            startCounters();
            statsObserver.disconnect();
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            testimonialObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.testimonial-card-v2').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    testimonialObserver.observe(card);
});

const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            valueObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.value-item-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    card.style.transition = 'all 0.5s ease-out';
    valueObserver.observe(card);
});
