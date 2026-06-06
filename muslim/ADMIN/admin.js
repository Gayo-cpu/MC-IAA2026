// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
});

async function initializeAdmin() {
    checkAuth();
    await loadDashboardStats();
    setupEventListeners();
    updateClock();
    setInterval(updateClock, 1000);
}

// ==================== Authentication ====================
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('mc_currentUser') || 'null');
    if (!currentUser || !['admin', 'assistant'].includes(currentUser.role)) {
        window.location.href = '../LOGIN/login.html';
        return;
    }
    document.getElementById('userName').textContent = currentUser.name || 'Admin User';
    document.getElementById('adminInfo').textContent = `${currentUser.email || 'System Admin'} · ${currentUser.role}`;
}

// ==================== Tab Navigation ====================
async function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Modal handlers - attach only if elements exist
    const addMemberBtn = document.getElementById('addMemberBtn');
    if (addMemberBtn) addMemberBtn.addEventListener('click', openMemberModal);
    
    const addAssistantBtn = document.getElementById('addAssistantBtn');
    if (addAssistantBtn) addAssistantBtn.addEventListener('click', openAssistantModal);
    
    const addAnnouncementBtn = document.getElementById('addAnnouncementBtn');
    if (addAnnouncementBtn) addAnnouncementBtn.addEventListener('click', openAnnouncementModal);
    
    const addNewsBtn = document.getElementById('addNewsBtn');
    if (addNewsBtn) addNewsBtn.addEventListener('click', openNewsModal);
    
    const addProgramBtn = document.getElementById('addProgramBtn');
    if (addProgramBtn) addProgramBtn.addEventListener('click', openProgramModal);
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // Close modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                // Clear file inputs on modal close
                modal.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
            }
        });
    });

    // Form listeners - attach only if elements exist
    const memberForm = document.getElementById('memberForm');
    if (memberForm) memberForm.addEventListener('submit', saveMember);
    
    const assistantForm = document.getElementById('assistantForm');
    if (assistantForm) assistantForm.addEventListener('submit', saveAssistant);
    
    const announcementForm = document.getElementById('announcementForm');
    if (announcementForm) announcementForm.addEventListener('submit', saveAnnouncement);
    
    const newsForm = document.getElementById('newsForm');
    if (newsForm) newsForm.addEventListener('submit', saveNews);
    
    const programForm = document.getElementById('programForm');
    if (programForm) programForm.addEventListener('submit', saveProgram);
    
    const answerForm = document.getElementById('answerForm');
    if (answerForm) answerForm.addEventListener('submit', postAnswer);

    const announcementImage = document.getElementById('announcementImage');
    if (announcementImage) announcementImage.addEventListener('change', handleAnnouncementImageChange);
    
    const programImage = document.getElementById('programImage');
    if (programImage) programImage.addEventListener('change', handleProgramImageChange);

    // Load initial data
    loadMembers();
    loadQuestions();
    loadAnnouncements();
    await loadPrograms();
    await loadNews();
    await loadDonations();
    await loadContacts();
    loadTeam();
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    if (tabName === 'programs') {
        loadPrograms();
    }
}

function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentTime').textContent = `${dateStr} - ${timeStr}`;
}

// ==================== Dashboard ====================
async function loadDashboardStats() {
    try {
        const [news, donations, contacts] = await Promise.all([
            getNewsItems(),
            getDonationRequests(),
            getContactMessages()
        ]);
        const announcements = JSON.parse(localStorage.getItem('mc_announcements') || '[]');
        const programs = JSON.parse(localStorage.getItem('mc_programs') || '[]');
        const questions = JSON.parse(localStorage.getItem('mc_questions') || '[]');
        const members = JSON.parse(localStorage.getItem('mc_users') || '[]');

        document.getElementById('statMembers').textContent = members.length.toString();
        document.getElementById('statQuestions').textContent = questions.filter(q => !q.answered).length.toString();
        document.getElementById('statAnnouncements').textContent = announcements.filter(a => a.status === 'Active').length.toString();
        document.getElementById('statPrograms').textContent = programs.length.toString();
        document.getElementById('statTeam').textContent = donations.length + contacts.length;
    } catch (error) {
        console.error('Failed to load dashboard stats:', error);
        // Set defaults
        document.getElementById('statMembers').textContent = '0';
        document.getElementById('statQuestions').textContent = '0';
        document.getElementById('statAnnouncements').textContent = '0';
        document.getElementById('statTeam').textContent = '0';
    }
}

// ==================== Announcements Management ====================

function loadAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('mc_announcements') || '[]');
    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = '';

    if (announcements.length === 0) {
        announcementsList.innerHTML = '<p class="empty-state">No announcements yet. Add one to share information with members.</p>';
        return;
    }

    announcements.forEach((announcement, index) => {
        const card = document.createElement('div');
        card.className = 'item-card announcement-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${announcement.title}</h4>
                <span class="status ${announcement.status === 'Active' ? 'status-answered' : 'status-pending'}">${announcement.status}</span>
            </div>
            <p class="item-message">${announcement.message}</p>
            ${announcement.image ? `<img src="${announcement.image}" alt="Announcement image" class="announcement-image">` : ''}
            <div class="item-actions">
                <button class="btn-sm btn-edit" onclick="editAnnouncement(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-sm btn-delete" onclick="deleteAnnouncement(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        announcementsList.appendChild(card);
    });
}

function openAnnouncementModal() {
    document.getElementById('announcementId').value = '';
    document.getElementById('announcementForm').reset();
    document.querySelector('#announcementModal .modal-header h3').textContent = 'Add Announcement';
    document.getElementById('announcementModal').style.display = 'flex';
}

function editAnnouncement(index) {
    const announcements = JSON.parse(localStorage.getItem('mc_announcements') || '[]');
    const announcement = announcements[index];

    document.getElementById('announcementId').value = index;
    document.getElementById('announcementTitle').value = announcement.title;
    document.getElementById('announcementMessage').value = announcement.message;
    document.getElementById('announcementStatus').value = announcement.status;
    document.querySelector('#announcementModal .modal-header h3').textContent = 'Edit Announcement';
    document.getElementById('announcementModal').style.display = 'flex';
    showPreview('announcementImagePreview', announcement.image);
}

async function saveAnnouncement(e) {
    e.preventDefault();
    const announcements = JSON.parse(localStorage.getItem('mc_announcements') || '[]');
    const id = document.getElementById('announcementId').value;
    const existing = id !== '' ? announcements[id] : null;
    const imageFile = document.getElementById('announcementImage').files[0];
    const imageData = imageFile ? await readImageFileAsDataURL(imageFile) : existing?.image || '';

    const newAnnouncement = {
        title: document.getElementById('announcementTitle').value,
        message: document.getElementById('announcementMessage').value,
        status: document.getElementById('announcementStatus').value,
        image: imageData,
        createdAt: new Date().toISOString()
    };

    if (id !== '') {
        announcements[id] = newAnnouncement;
    } else {
        announcements.unshift(newAnnouncement);
    }

    localStorage.setItem('mc_announcements', JSON.stringify(announcements));
    closeAnnouncementModal();
    loadAnnouncements();
    loadDashboardStats();
}

function deleteAnnouncement(index) {
    if (confirm('Delete this announcement?')) {
        const announcements = JSON.parse(localStorage.getItem('mc_announcements') || '[]');
        announcements.splice(index, 1);
        localStorage.setItem('mc_announcements', JSON.stringify(announcements));
        loadAnnouncements();
        loadDashboardStats();
    }
}

function closeAnnouncementModal() {
    document.getElementById('announcementModal').style.display = 'none';
    clearPreview('announcementImagePreview');
}

// ==================== News Management ====================
async function loadNews() {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '<p class="empty-state">Loading news...</p>';

    try {
        const news = await getNewsItems();

        newsList.innerHTML = '';

        if (news.length === 0) {
            newsList.innerHTML = '<p class="empty-state">No news items yet. Add the first story for your site.</p>';
            return;
        }

        news.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-header">
                    <h4>${item.title}</h4>
                    <span class="status ${item.status === 'published' ? 'status-answered' : 'status-pending'}">${item.status}</span>
                </div>
                <p class="item-message">${item.content.substring(0, 200)}${item.content.length > 200 ? '...' : ''}</p>
                <p class="item-email"><strong>Published:</strong> ${new Date(item.created_at).toLocaleDateString()}</p>
                <div class="item-actions">
                    <button class="btn-sm btn-edit" onclick="editNews(${item.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-sm btn-delete" onclick="deleteNews(${item.id})"><i class="fas fa-trash"></i> Delete</button>
                </div>
            `;
            newsList.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load news:', error);
        newsList.innerHTML = '<p class="empty-state">Error loading news. Please try again.</p>';
    }
}

function openNewsModal() {
    document.getElementById('newsId').value = '';
    document.getElementById('newsForm').reset();
    document.querySelector('#newsModal .modal-header h3').textContent = 'Add News Item';
    document.getElementById('newsModal').style.display = 'flex';
}

function editNews(id) {
    // For now, we'll open the modal with empty form since we need to fetch the item
    // In a full implementation, you'd fetch the specific news item
    document.getElementById('newsId').value = id;
    document.getElementById('newsForm').reset();
    document.querySelector('#newsModal .modal-header h3').textContent = 'Edit News Item';
    document.getElementById('newsModal').style.display = 'flex';
}

async function saveNews(e) {
    e.preventDefault();
    const id = document.getElementById('newsId').value;
    const newItem = {
        title: document.getElementById('newsTitle').value,
        content: document.getElementById('newsSummary').value,
        status: document.getElementById('newsStatus').value.toLowerCase(),
        author: 'Admin'
    };

    try {
        if (id !== '') {
            await updateNewsItem(id, newItem);
        } else {
            await saveNewsItem(newItem);
        }
        closeNewsModal();
        await loadNews();
        loadDashboardStats();
    } catch (error) {
        console.error('Failed to save news:', error);
        alert('Failed to save news item. Please try again.');
    }
}

async function deleteNews(id) {
    if (confirm('Delete this news item?')) {
        try {
            await deleteNewsItem(id);
            await loadNews();
            loadDashboardStats();
        } catch (error) {
            console.error('Failed to delete news:', error);
            alert('Failed to delete news item. Please try again.');
        }
    }
}

function closeNewsModal() {
    document.getElementById('newsModal').style.display = 'none';
}

// ==================== Donations Management ====================
async function loadDonations() {
    const donationsList = document.getElementById('donationsList');
    donationsList.innerHTML = '<p class="empty-state">Loading donations...</p>';

    try {
        const donations = await getDonationRequests();

        donationsList.innerHTML = '';

        if (donations.length === 0) {
            donationsList.innerHTML = '<p class="empty-state">No donation requests yet.</p>';
            return;
        }

        donations.forEach((donation) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-header">
                    <h4>${donation.donor_name}</h4>
                    <span class="status status-pending">${donation.status}</span>
                </div>
                <p class="item-email"><strong>Email:</strong> ${donation.donor_email}</p>
                <p class="item-message"><strong>Amount:</strong> $${parseFloat(donation.amount).toFixed(2)}</p>
                <p class="item-message"><strong>Message:</strong> ${donation.message || 'No message provided.'}</p>
                <p class="item-role-desc"><strong>Submitted:</strong> ${new Date(donation.created_at).toLocaleString()}</p>
                <div class="item-actions">
                    <button class="btn-sm btn-approve" onclick="updateDonationStatus(${donation.id}, 'approved')">Approve</button>
                    <button class="btn-sm btn-reject" onclick="updateDonationStatus(${donation.id}, 'rejected')">Reject</button>
                </div>
            `;
            donationsList.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load donations:', error);
        donationsList.innerHTML = '<p class="empty-state">Error loading donations. Please try again.</p>';
    }
}

async function updateDonationStatus(id, status) {
    try {
        await updateDonationStatus(id, status);
        await loadDonations();
    } catch (error) {
        console.error('Failed to update donation status:', error);
        alert('Failed to update donation status. Please try again.');
    }
}

// ==================== Contact Messages Management ====================
async function loadContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '<p class="empty-state">Loading contacts...</p>';

    try {
        const contacts = await getContactMessages();

        contactsList.innerHTML = '';

        if (contacts.length === 0) {
            contactsList.innerHTML = '<p class="empty-state">No contact messages yet.</p>';
            return;
        }

        contacts.forEach((message) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-header">
                    <h4>${message.subject}</h4>
                    <span class="status status-pending">${message.status}</span>
                </div>
                <p class="item-email"><strong>From:</strong> ${message.name} — ${message.email}</p>
                <p class="item-message">${message.message}</p>
                <p class="item-role-desc"><strong>Received:</strong> ${new Date(message.created_at).toLocaleString()}</p>
                <div class="item-actions">
                    <button class="btn-sm btn-read" onclick="updateContactStatus(${message.id}, 'read')">Mark Read</button>
                    <button class="btn-sm btn-replied" onclick="updateContactStatus(${message.id}, 'replied')">Mark Replied</button>
                </div>
            `;
            contactsList.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load contacts:', error);
        contactsList.innerHTML = '<p class="empty-state">Error loading contacts. Please try again.</p>';
    }
}

async function updateContactStatus(id, status) {
    try {
        await updateContactStatus(id, status);
        await loadContacts();
    } catch (error) {
        console.error('Failed to update contact status:', error);
        alert('Failed to update contact status. Please try again.');
    }
}

// ==================== Members Management ====================
function loadMembers() {
    const members = JSON.parse(localStorage.getItem('mc_users') || '[]');
    const membersList = document.getElementById('membersList');
    membersList.innerHTML = '';

    if (members.length === 0) {
        membersList.innerHTML = '<p class="empty-state">No members yet. Add your first member.</p>';
        return;
    }

    members.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${member.fullName}</h4>
                <span class="item-date">${new Date().toLocaleDateString()}</span>
            </div>
            <p class="item-email"><strong>Email:</strong> ${member.email}</p>
            <p class="item-phone"><strong>Phone:</strong> ${member.phone || 'Not provided'}</p>
            <div class="item-actions">
                <button class="btn-sm btn-edit" onclick="editMember(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-sm btn-delete" onclick="deleteMember(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        membersList.appendChild(card);
    });
}

function openMemberModal() {
    document.getElementById('memberId').value = '';
    document.getElementById('memberForm').reset();
    document.querySelector('#memberModal .modal-header h3').textContent = 'Add New Member';
    document.getElementById('memberModal').style.display = 'flex';
}

function editMember(index) {
    const members = JSON.parse(localStorage.getItem('mc_users') || '[]');
    const member = members[index];

    document.getElementById('memberId').value = index;
    document.getElementById('memberName').value = member.fullName;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberPhone').value = member.phone || '';
    document.querySelector('#memberModal .modal-header h3').textContent = 'Edit Member';
    document.getElementById('memberModal').style.display = 'flex';
}

function saveMember(e) {
    e.preventDefault();
    const members = JSON.parse(localStorage.getItem('mc_users') || '[]');
    const id = document.getElementById('memberId').value;
    const newMember = {
        fullName: document.getElementById('memberName').value,
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        password: id ? members[id].password : generatePassword()
    };

    if (id) {
        members[id] = newMember;
    } else {
        members.push(newMember);
    }

    localStorage.setItem('mc_users', JSON.stringify(members));
    closeMemberModal();
    loadMembers();
    loadDashboardStats();
}

function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
        const members = JSON.parse(localStorage.getItem('mc_users') || '[]');
        members.splice(index, 1);
        localStorage.setItem('mc_users', JSON.stringify(members));
        loadMembers();
        loadDashboardStats();
    }
}

function closeMemberModal() {
    document.getElementById('memberModal').style.display = 'none';
}

// ==================== Questions Management ====================
function loadQuestions() {
    const questions = JSON.parse(localStorage.getItem('mc_questions') || '[]');
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';

    if (questions.length === 0) {
        questionsList.innerHTML = '<p class="empty-state">No questions yet.</p>';
        return;
    }

    questions.forEach((q, index) => {
        const statusClass = q.answered ? 'status-answered' : 'status-pending';
        const statusText = q.answered ? 'Answered' : 'Pending';
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${q.question.substring(0, 50)}...</h4>
                <span class="status ${statusClass}">${statusText}</span>
            </div>
            <p class="item-asker"><strong>From:</strong> ${q.asker}</p>
            <p class="item-category"><strong>Category:</strong> ${q.category}</p>
            <div class="item-actions">
                <button class="btn-sm btn-info" onclick="viewQuestion(${index})">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        `;
        questionsList.appendChild(card);
    });
}

function viewQuestion(index) {
    const questions = JSON.parse(localStorage.getItem('mc_questions') || '[]');
    const q = questions[index];

    document.getElementById('qAsker').textContent = q.asker;
    document.getElementById('qCategory').textContent = q.category;
    document.getElementById('qStatus').textContent = q.answered ? 'Answered' : 'Pending';
    document.getElementById('qText').textContent = q.question;
    document.getElementById('qAnswer').value = q.answer || '';
    document.getElementById('questionModal').dataset.questionIndex = index;
    document.getElementById('questionModal').style.display = 'flex';
}

function postAnswer(e) {
    e.preventDefault();
    const questionIndex = document.getElementById('questionModal').dataset.questionIndex;
    const questions = JSON.parse(localStorage.getItem('mc_questions') || '[]');
    const answer = document.getElementById('qAnswer').value;

    questions[questionIndex].answer = answer;
    questions[questionIndex].answered = true;

    localStorage.setItem('mc_questions', JSON.stringify(questions));
    closeQuestionModal();
    loadQuestions();
    loadDashboardStats();
}

function closeQuestionModal() {
    document.getElementById('questionModal').style.display = 'none';
}

function readImageFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

function showPreview(containerId, imageData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (imageData) {
        container.innerHTML = `<img src="${imageData}" alt="Preview" class="image-preview-img">`;
    } else {
        container.innerHTML = '';
    }
}

function clearPreview(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}

function handleAnnouncementImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        readImageFileAsDataURL(file).then(dataUrl => showPreview('announcementImagePreview', dataUrl));
    } else {
        clearPreview('announcementImagePreview');
    }
}

function handleProgramImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        readImageFileAsDataURL(file).then(dataUrl => showPreview('programImagePreview', dataUrl));
    } else {
        clearPreview('programImagePreview');
    }
}

// ==================== Programs Management ====================
async function loadPrograms() {
    const programs = JSON.parse(localStorage.getItem('mc_programs') || '[]');
    const programsList = document.getElementById('programsList');
    programsList.innerHTML = '';

    if (programs.length === 0) {
        programsList.innerHTML = '<p class="empty-state">No programs yet. Create your first program with an image and description.</p>';
        return;
    }

    programs.forEach((program, index) => {
        const card = document.createElement('div');
        card.className = 'item-card program-card';
        card.innerHTML = `
            <div class="program-card-header">
                <div>
                    <h4>${program.name}</h4>
                    <p class="item-schedule"><strong>Schedule:</strong> ${program.schedule}</p>
                    <p class="item-capacity"><strong>Capacity:</strong> ${program.capacity} participants</p>
                    <p class="item-message">${program.description}</p>
                </div>
                <span class="status ${program.status === 'Active' ? 'status-answered' : 'status-pending'}">${program.status}</span>
            </div>
            ${program.image ? `<img src="${program.image}" alt="${program.name}" class="program-image">` : ''}
            <div class="item-actions">
                <button class="btn-sm btn-edit" onclick="editProgram(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-sm btn-delete" onclick="deleteProgram(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        programsList.appendChild(card);
    });
}

function openProgramModal() {
    document.getElementById('programForm').reset();
    document.getElementById('programId').value = '';
    document.querySelector('#programModal .modal-header h3').textContent = 'Add Program';
    document.getElementById('programModal').style.display = 'flex';
    clearPreview('programImagePreview');
}

function editProgram(index) {
    const programs = JSON.parse(localStorage.getItem('mc_programs') || '[]');
    const program = programs[index];

    document.getElementById('programId').value = index;
    document.getElementById('programName').value = program.name;
    document.getElementById('programSchedule').value = program.schedule;
    document.getElementById('programCapacity').value = program.capacity;
    document.getElementById('programDescription').value = program.description;
    document.getElementById('programStatus').value = program.status;
    document.querySelector('#programModal .modal-header h3').textContent = 'Edit Program';
    document.getElementById('programModal').style.display = 'flex';
    showPreview('programImagePreview', program.image);
}

async function saveProgram(e) {
    e.preventDefault();
    const programs = JSON.parse(localStorage.getItem('mc_programs') || '[]');
    const id = document.getElementById('programId').value;
    const existing = id !== '' ? programs[id] : null;
    const imageFile = document.getElementById('programImage').files[0];
    const imageData = imageFile ? await readImageFileAsDataURL(imageFile) : existing?.image || '';

    const program = {
        name: document.getElementById('programName').value,
        schedule: document.getElementById('programSchedule').value,
        capacity: parseInt(document.getElementById('programCapacity').value, 10) || 0,
        description: document.getElementById('programDescription').value,
        status: document.getElementById('programStatus').value,
        image: imageData,
        updatedAt: new Date().toISOString()
    };

    if (id !== '') {
        programs[id] = program;
    } else {
        programs.unshift(program);
    }

    localStorage.setItem('mc_programs', JSON.stringify(programs));
    closeProgramModal();
    await loadPrograms();
    loadDashboardStats();
}

function deleteProgram(index) {
    if (confirm('Delete this program?')) {
        const programs = JSON.parse(localStorage.getItem('mc_programs') || '[]');
        programs.splice(index, 1);
        localStorage.setItem('mc_programs', JSON.stringify(programs));
        loadPrograms();
        loadDashboardStats();
    }
}

function closeProgramModal() {
    document.getElementById('programModal').style.display = 'none';
    clearPreview('programImagePreview');
}

// ==================== Team Management (5 Assistant Roles) ====================
const assistantRoles = {
    member_manager: { name: 'Member Manager', description: 'Manages member database and registrations' },
    question_manager: { name: 'Question Manager (Imam)', description: 'Handles Islamic questions and answers' },
    program_coordinator: { name: 'Program Coordinator', description: 'Oversees programs and events' },
    content_manager: { name: 'Content Manager', description: 'Manages website content and resources' },
    donation_manager: { name: 'Donation Manager', description: 'Handles donations and fundraising' }
};

const permissionNames = {
    manage_members: 'Members & Registration',
    manage_questions: 'Islamic Questions',
    manage_programs: 'Programs & Events',
    manage_announcements: 'Announcements',
    manage_news: 'News & Content',
    manage_donations: 'Donations',
    view_contacts: 'View Contacts',
    manage_team: 'Manage Team'
};

function loadTeam() {
    const team = JSON.parse(localStorage.getItem('mc_team') || '[]');
    const teamList = document.getElementById('teamList');
    teamList.innerHTML = '';

    if (team.length === 0) {
        teamList.innerHTML = '<p class="empty-state">No team members yet. Add your management team.</p>';
        return;
    }

    team.forEach((member, index) => {
        const role = assistantRoles[member.role];
        const card = document.createElement('div');
        card.className = 'item-card team-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${member.name}</h4>
                <span class="role-badge">${role.name}</span>
            </div>
            <p class="item-email"><strong>Email:</strong> ${member.email}</p>
            <p class="item-role-desc">${role.description}</p>
            <div class="item-actions">
                <button class="btn-sm btn-edit" onclick="editAssistant(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-sm btn-delete" onclick="deleteAssistant(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        teamList.appendChild(card);
    });
}

function openAssistantModal() {
    document.getElementById('assistantId').value = '';
    document.getElementById('assistantForm').reset();
    document.querySelector('#assistantModal .modal-header h3').textContent = 'Add Team Member';
    document.getElementById('assistantModal').style.display = 'flex';
}

function editAssistant(index) {
    const team = JSON.parse(localStorage.getItem('mc_team') || '[]');
    const member = team[index];

    document.getElementById('assistantId').value = index;
    document.getElementById('assistantName').value = member.name;
    document.getElementById('assistantEmail').value = member.email;
    document.getElementById('assistantRole').value = member.role;
    document.querySelector('#assistantModal .modal-header h3').textContent = 'Edit Team Member';
    document.getElementById('assistantModal').style.display = 'flex';
}

function saveAssistant(e) {
    e.preventDefault();
    let team = JSON.parse(localStorage.getItem('mc_team') || '[]');
    const id = document.getElementById('assistantId').value;
    const newMember = {
        name: document.getElementById('assistantName').value,
        email: document.getElementById('assistantEmail').value,
        role: document.getElementById('assistantRole').value
    };

    if (id !== '') {
        team[id] = newMember;
    } else {
        team.push(newMember);
    }

    localStorage.setItem('mc_team', JSON.stringify(team));
    closeAssistantModal();
    loadTeam();
    loadDashboardStats();
}

function deleteAssistant(index) {
    if (confirm('Are you sure you want to remove this team member?')) {
        let team = JSON.parse(localStorage.getItem('mc_team') || '[]');
        team.splice(index, 1);
        localStorage.setItem('mc_team', JSON.stringify(team));
        loadTeam();
        loadDashboardStats();
    }
}

function closeAssistantModal() {
    document.getElementById('assistantModal').style.display = 'none';
}

// ==================== Utilities ====================
function generatePassword() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10).toUpperCase();
}

function exportData() {
    const data = {
        users: JSON.parse(localStorage.getItem('mc_users') || '[]'),
        questions: JSON.parse(localStorage.getItem('mc_questions') || '[]'),
        announcements: JSON.parse(localStorage.getItem('mc_announcements') || '[]'),
        news: JSON.parse(localStorage.getItem('mc_news') || '[]'),
        donations: JSON.parse(localStorage.getItem('mc_donations') || '[]'),
        contacts: JSON.parse(localStorage.getItem('mc_contacts') || '[]'),
        team: JSON.parse(localStorage.getItem('mc_team') || '[]'),
        exportDate: new Date().toLocaleString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mciaa_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('mc_currentUser');
        window.location.href = '../LOGIN/login.html';
    }
}

// Initialize Programs on tab switch
document.addEventListener('DOMContentLoaded', () => {
    const programsTab = document.querySelector('[data-tab="programs"]');
    if (programsTab) {
        programsTab.addEventListener('click', loadPrograms);
    }
});
