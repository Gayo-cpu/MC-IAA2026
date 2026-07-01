/* ============================================================
   FILE: amiri-fedha.js
   ============================================================ */

// ============================================================
// DATA STORE
// ============================================================
let donations = [];
let loans = [];
let messages = [];

let donationIdCounter = 1;
let loanIdCounter = 1;
let messageIdCounter = 1;

// ============================================================
// INITIALIZE WITH SAMPLE DATA
// ============================================================
function initializeData() {
    // Sample Donations
    donations = [
        {
            id: donationIdCounter++,
            donor: 'Ahmed Ali',
            amount: 500000,
            category: 'Zaka',
            status: 'confirmed',
            date: '12 Jun 2026'
        },
        {
            id: donationIdCounter++,
            donor: 'Fatma Hassan',
            amount: 200000,
            category: 'Sadaka',
            status: 'pending',
            date: '15 Jun 2026'
        },
        {
            id: donationIdCounter++,
            donor: 'Omar Yusuf',
            amount: 1000000,
            category: 'Waqf',
            status: 'pending',
            date: '16 Jun 2026'
        },
        {
            id: donationIdCounter++,
            donor: 'Aisha Abdallah',
            amount: 350000,
            category: 'Project Fund',
            status: 'confirmed',
            date: '17 Jun 2026'
        }
    ];

    // Sample Loans
    loans = [
        {
            id: loanIdCounter++,
            member: 'Ahmed Ali',
            amount: 500000,
            duration: '6 Months',
            status: 'approved',
            date: '12 Jun 2026'
        },
        {
            id: loanIdCounter++,
            member: 'Fatma Hassan',
            amount: 300000,
            duration: '4 Months',
            status: 'pending',
            date: '15 Jun 2026'
        },
        {
            id: loanIdCounter++,
            member: 'Omar Yusuf',
            amount: 800000,
            duration: '12 Months',
            status: 'rejected',
            date: '08 Jun 2026'
        }
    ];

    // Sample Messages
    messages = [
        {
            id: messageIdCounter++,
            recipient: 'Amir Mkuu',
            subject: 'Monthly Report',
            content: 'Please find the monthly financial report attached.',
            date: '18 Jun 2026',
            status: 'sent'
        },
        {
            id: messageIdCounter++,
            recipient: 'Katibu',
            subject: 'Meeting Reminder',
            content: 'Reminder: Meeting tomorrow at 10:00 AM.',
            date: '17 Jun 2026',
            status: 'sent'
        },
        {
            id: messageIdCounter++,
            recipient: 'Amirati',
            subject: 'Event Planning',
            content: 'We need to finalize the event plan by Friday.',
            date: '15 Jun 2026',
            status: 'sent'
        }
    ];

    updateAllUI();
}

// ============================================================
// DONATION FUNCTIONS
// ============================================================
function addDonation() {
    const donorInput = document.getElementById('donorName');
    const amountInput = document.getElementById('donationAmount');
    const categorySelect = document.getElementById('donationCategory');

    const donor = donorInput.value.trim();
    const amount = parseInt(amountInput.value);
    const category = categorySelect.value;

    if (!donor) {
        alert('Please enter the donor name.');
        donorInput.focus();
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid donation amount.');
        amountInput.focus();
        return;
    }

    // Add donation
    donations.push({
        id: donationIdCounter++,
        donor: donor,
        amount: amount,
        category: category,
        status: 'pending',
        date: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    });

    // Clear inputs
    donorInput.value = '';
    amountInput.value = '';
    categorySelect.value = 'Zaka';

    updateAllUI();
    alert(`✅ Donation of TSh ${formatNumber(amount)} from ${donor} added successfully!`);
}

function confirmDonation(id) {
    const donation = donations.find(d => d.id === id);
    if (donation && donation.status === 'pending') {
        donation.status = 'confirmed';
        updateAllUI();
        alert(`✅ Donation from ${donation.donor} confirmed!`);
    }
}

function deleteDonation(id) {
    if (confirm('Are you sure you want to delete this donation?')) {
        donations = donations.filter(d => d.id !== id);
        updateAllUI();
        alert('✅ Donation deleted successfully!');
    }
}

// ============================================================
// LOAN FUNCTIONS
// ============================================================
function addLoan() {
    const memberInput = document.getElementById('loanName');
    const amountInput = document.getElementById('loanAmount');
    const durationSelect = document.getElementById('loanDuration');

    const member = memberInput.value.trim();
    const amount = parseInt(amountInput.value);
    const duration = durationSelect.value;

    // js validates
    if (!member) {
        alert('Please enter the member name.');
        memberInput.focus();
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid loan amount.');
        amountInput.focus();
        return;
    }

    const formData = new FormData();
    formData.append('member_name', member);   // PHP reads: $_POST['member_name']
    formData.append('amount',      amount);   // PHP reads: $_POST['amount']
    formData.append('duration',    duration);

    // fetch() sends the bag to add_loan.php and waits for reply
    fetch('add_loan.php', { method: 'POST', body: formData })

    .then(res => res.json())
    .then(data => {
        if (data.success) {
            loans.push({
                id: loanIdCounter++,
                member: member,
                amount: amount,
                duration: duration,
                status: 'pending',
                date: new Date().toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
            });
        
            memberInput.value = '';
            amountInput.value = '';
            durationSelect.value = '6 Months';
        
            updateAllUI();
            alert(`✅ Loan of TSh ${formatNumber(amount)} for ${member} added successfully!`);
        }else {
            // error report
            alert(`❌ Error: ${data.message}`);
        }
    })
    .catch(() => alert('Network error occurred. Please try again.'));
}
function approveLoan(id) {
    const loan = loans.find(l => l.id === id);
    if (loan && loan.status === 'pending') {
        loan.status = 'approved';
        updateAllUI();
        alert(`✅ Loan for ${loan.member} approved!`);
    }
}

function rejectLoan(id) {
    if (confirm('Are you sure you want to reject this loan?')) {
        const loan = loans.find(l => l.id === id);
        if (loan && loan.status === 'pending') {
            loan.status = 'rejected';
            updateAllUI();
            alert(`❌ Loan for ${loan.member} rejected.`);
        }
    }
}

function deleteLoan(id) {
    if (confirm('Are you sure you want to delete this loan?')) {
        loans = loans.filter(l => l.id !== id);
        updateAllUI();
        alert('✅ Loan deleted successfully!');
    }
}

// ============================================================
// MESSAGE FUNCTIONS
// ============================================================
function sendMessage() {
    const recipientSelect = document.getElementById('msgRecipient');
    const subjectInput = document.getElementById('msgSubject');
    const contentInput = document.getElementById('msgContent');

    const recipient = recipientSelect.value;
    const subject = subjectInput.value.trim();
    const content = contentInput.value.trim();

    if (!subject) {
        alert('Please enter a subject.');
        subjectInput.focus();
        return;
    }

    if (!content) {
        alert('Please enter your message.');
        contentInput.focus();
        return;
    }

    const formData = new FormData();
    formData.append('recipient', recipient);
    formData.append('subject', subject);
    formData.append('content', content);

    fetch('send_message.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
    messages.push({
        id: messageIdCounter++,
        recipient: recipient,
        subject: subject,
        content: content,
        date: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }),
        status: 'sent'
    });

    subjectInput.value = '';
    contentInput.value = '';
    recipientSelect.value = 'All Admins';

    updateAllUI();
    alert(`📨 Message sent to ${recipient} successfully!`);
} else{
    alert(`❌ Error: ${data.message}`);
}
    })
    .catch(() => alert('Network error occurred. Please try again.'));
}

function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        messages = messages.filter(m => m.id !== id);
        updateAllUI();
        alert('✅ Message deleted successfully!');
    }
}

// ============================================================
// UI UPDATE FUNCTIONS
// ============================================================
function updateAllUI() {
    updateOverviewCards();
    renderDonations();
    renderLoans();
    renderMessages();
    updateNotificationCount();
}

function updateOverviewCards() {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalLoans = loans.reduce((sum, l) => sum + l.amount, 0);
    const confirmedDonations = donations.filter(d => d.status === 'confirmed').length;
    const confirmedLoans = loans.filter(l => l.status === 'approved').length;
    const pendingDonations = donations.filter(d => d.status === 'pending').length;
    const pendingLoans = loans.filter(l => l.status === 'pending').length;

    document.getElementById('totalDonations').textContent = `TSh ${formatNumber(totalDonations)}`;
    document.getElementById('donationCount').textContent = `${donations.length} donations`;
    
    document.getElementById('totalLoans').textContent = `TSh ${formatNumber(totalLoans)}`;
    document.getElementById('loanCount').textContent = `${loans.length} loans`;
    
    document.getElementById('confirmedCount').textContent = confirmedDonations + confirmedLoans;
    document.getElementById('confirmedDetail').textContent = `${confirmedDonations} donations · ${confirmedLoans} loans`;
    
    document.getElementById('pendingCount').textContent = pendingDonations + pendingLoans;
    document.getElementById('pendingDetail').textContent = `${pendingDonations} donations · ${pendingLoans} loans`;
}

function renderDonations() {
    const tbody = document.getElementById('donationTableBody');
    
    if (donations.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color:#999; padding:30px;">
                    <i class="fa-solid fa-inbox" style="font-size:24px; display:block; margin-bottom:10px;"></i>
                    No donations yet. Add one above!
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = donations.map(d => `
        <tr>
            <td><strong>#DON-${String(d.id).padStart(3, '0')}</strong></td>
            <td>${d.donor}</td>
            <td>${d.category}</td>
            <td><strong>TSh ${formatNumber(d.amount)}</strong></td>
            <td><span class="status-badge ${d.status}">${d.status.charAt(0).toUpperCase() + d.status.slice(1)}</span></td>
            <td>
                ${d.status === 'pending' ? 
                    `<button class="btn-confirm" onclick="confirmDonation(${d.id})"><i class="fa-solid fa-check"></i> Confirm</button>` : 
                    `<span style="color:#0b8f4d; font-weight:600;"><i class="fa-solid fa-check-circle"></i> Done</span>`
                }
                <button class="btn-delete" onclick="deleteDonation(${d.id})" style="margin-left:5px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderLoans() {
    const tbody = document.getElementById('loanTableBody');
    
    if (loans.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color:#999; padding:30px;">
                    <i class="fa-solid fa-inbox" style="font-size:24px; display:block; margin-bottom:10px;"></i>
                    No loans yet. Add one above!
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = loans.map(l => `
        <tr>
            <td><strong>#LN-${String(l.id).padStart(3, '0')}</strong></td>
            <td>${l.member}</td>
            <td><strong>TSh ${formatNumber(l.amount)}</strong></td>
            <td>${l.duration}</td>
            <td><span class="status-badge ${l.status}">${l.status.charAt(0).toUpperCase() + l.status.slice(1)}</span></td>
            <td>
                ${l.status === 'pending' ? 
                    `<button class="btn-confirm" onclick="approveLoan(${l.id})" style="background:#0b8f4d; color:#fff;">
                        <i class="fa-solid fa-check"></i> Approve
                    </button>
                    <button class="btn-delete" onclick="rejectLoan(${l.id})" style="margin-left:3px;">
                        <i class="fa-solid fa-times"></i>
                    </button>` : 
                    `<span style="color:#0b8f4d; font-weight:600;">
                        <i class="fa-solid fa-check-circle"></i> Processed
                    </span>`
                }
                <button class="btn-delete" onclick="deleteLoan(${l.id})" style="margin-left:5px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderMessages() {
    const tbody = document.getElementById('messageTableBody');
    
    if (messages.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; color:#999; padding:30px;">
                    <i class="fa-solid fa-inbox" style="font-size:24px; display:block; margin-bottom:10px;"></i>
                    No messages yet. Send one above!
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = messages.map(m => `
        <tr>
            <td><strong>${m.recipient}</strong></td>
            <td>${m.subject}</td>
            <td>${m.date}</td>
            <td>
                <span class="status-badge sent"><i class="fa-solid fa-check"></i> Sent</span>
                <button class="btn-delete" onclick="deleteMessage(${m.id})" style="margin-left:8px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateNotificationCount() {
    const pendingDonations = donations.filter(d => d.status === 'pending').length;
    const pendingLoans = loans.filter(l => l.status === 'pending').length;
    const totalPending = pendingDonations + pendingLoans;
    
    document.getElementById('notificationCount').textContent = totalPending;
}

// ============================================================
// SEARCH FUNCTIONS
// ============================================================
// Donations Search
document.addEventListener('DOMContentLoaded', function() {
    const donationSearch = document.getElementById('donationSearch');
    if (donationSearch) {
        donationSearch.addEventListener('keyup', function() {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll('#donationTableBody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(value) ? '' : 'none';
            });
        });
    }

    // Loans Search
    const loanSearch = document.getElementById('loanSearch');
    if (loanSearch) {
        loanSearch.addEventListener('keyup', function() {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll('#loanTableBody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(value) ? '' : 'none';
            });
        });
    }

    // Messages Search
    const messageSearch = document.getElementById('messageSearch');
    if (messageSearch) {
        messageSearch.addEventListener('keyup', function() {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll('#messageTableBody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(value) ? '' : 'none';
            });
        });
    }
});

// ============================================================
// NAVIGATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const quickBtns = document.querySelectorAll('.quick-btn');

    function navigateTo(page) {
        // Hide all pages
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target page
        const target = document.getElementById(`page-${page}`);
        if (target) {
            target.classList.add('active');
        }

        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // Update page title
        const titles = {
            overview: 'Financial Overview',
            donations: 'Donations Management',
            loans: 'Loans Overview',
            messages: 'Messages Center',
            settings: 'Settings'
        };
        const subtitles = {
            overview: 'Today\'s report',
            donations: 'Confirm pending donations',
            loans: 'View all loan records',
            messages: 'Send and receive messages',
            settings: 'Account preferences'
        };

        document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';
        document.getElementById('pageSubtitle').innerHTML = 
            `<i class="fa-regular fa-calendar"></i> ${subtitles[page] || ''}`;
    }

    // Nav links click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });

    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });
});

// ============================================================
// LOGOUT MODAL
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutModal.classList.add('show');
        });
    }

    if (cancelLogout) {
        cancelLogout.addEventListener('click', function() {
            logoutModal.classList.remove('show');
        });
    }

    if (confirmLogout) {
        confirmLogout.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    // Close modal on outside click
    logoutModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
});

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================================
// INITIALIZE
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    console.log('Amiri Fedha Dashboard initialized successfully!');
});