/**
 * MCIAA Association - Ask Imam Portal Logic
 * Developed by: fouzy
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. ROLE CONFIGURATION
    // For testing: Change to 'imam' to see the dashboard, or 'student' for the form.
    const userRole = 'student'; 

    const studentView = document.getElementById('studentView');
    const imamView = document.getElementById('imamView');

    // 2. VIEW INITIALIZATION
    if (userRole === 'imam') {
        studentView.classList.remove('active');
        imamView.classList.add('active');
        renderImamDashboard();
    } else {
        studentView.classList.add('active');
        imamView.classList.remove('active');
    }

    // 3. STUDENT FORM SUBMISSION
    const studentForm = document.getElementById('studentForm');
    const successMsg = document.getElementById('successMsg');

    if (studentForm) {
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = studentForm.querySelector('.submit-btn');
            const originalContent = submitBtn.innerHTML;

            // Visual feedback: Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Delivering...</span> <i class="fas fa-spinner fa-spin"></i>';

            // Simulate database latency
            setTimeout(() => {
                studentForm.style.display = 'none';
                successMsg.style.display = 'block';
                successMsg.style.animation = 'fadeIn 0.5s ease forwards';
            }, 1500);
        });
    }

    renderAskAnnouncements();
});

function renderAskAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('mc_announcements') || '[]')
        .filter(item => item.status === 'Active');
    const container = document.getElementById('askAnnouncements');

    if (!container) return;

    if (announcements.length === 0) {
        container.innerHTML = `
            <div class="announcement-summary">
                <h3>No current announcements</h3>
                <p>The administration will share program updates and community notices here as they are published.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = announcements.map(a => `
        <div class="announcement-summary">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-bottom:0.75rem;">
                <h3>${a.title}</h3>
                <span class="announcement-pill">${a.status}</span>
            </div>
            <p>${a.message}</p>
        </div>
    `).join('');
}

// 4. IMAM DASHBOARD RENDERING (Mock Data)
function renderImamDashboard() {
    const grid = document.getElementById('questionsGrid');
    const pendingCount = document.getElementById('pendingCount');

    // Mock data representing rows from your 'questions' table
    const mockQuestions = [
        { 
            id: 101, 
            name: "Aisha Mfungo", 
            category: "Fiqh", 
            text: "What are the recommended Sunnah fasts for the month of Shawwal?" 
        },
        { 
            id: 102, 
            name: "Omar Bakari", 
            category: "Youth Issues", 
            text: "How can I better manage my time between university studies and Madrasa?" 
        },
        { 
            id: 103, 
            name: "Anonymous", 
            category: "General", 
            text: "Is there a community service project planned for Arusha this month?" 
        }
    ];

    pendingCount.innerText = mockQuestions.length;

    grid.innerHTML = mockQuestions.map(q => `
        <div class="q-card reveal-on-scroll active">
            <h3>
                <span><i class="fas fa-user-circle"></i> ${q.name}</span>
                <small style="font-size: 0.7rem; color: #d4af37;">${q.category}</small>
            </h3>
            <p>"${q.text}"</p>
            <div class="card-footer">
                <a href="reply.php?id=${q.id}" class="reply-btn">
                    <i class="fas fa-reply"></i> Answer Question
                </a>
            </div>
        </div>
    `).join('');
}