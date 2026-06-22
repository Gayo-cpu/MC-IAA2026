
let posts = [];
let messages = [];
let postIdCounter = 1;
let messageIdCounter = 1;

// 
// INITIALIZE WITH SAMPLE DATA
// 
function initializeData() {
    // Sample Posts
    posts = [
        {
            id: postIdCounter++,
            title: 'Eid Preparation Meeting',
            summary: 'All members are invited to attend the Eid preparation meeting after Maghrib.',
            content: 'We are pleased to announce that the Eid preparation meeting will be held this Saturday at 8:00 PM. All committee members are required to attend. We will discuss the Eid prayer arrangements, community iftar plans, and volunteer assignments. Please come prepared with your ideas and suggestions. Jazakallah Khair!',
            author_id: 1,
            image_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=300&fit=crop',
            category: 'Announcement',
            is_published: 1,
            created_at: '16 June 2026',
            views: 245
        },
        {
            id: postIdCounter++,
            title: 'Youth Da\'wah Program',
            summary: 'Islamic youth seminar this Saturday. All youth members are encouraged to attend.',
            content: 'The Youth Da\'wah Program is back! This Saturday from 2:00 PM to 6:00 PM, we will host an inspiring seminar on "Building a Strong Muslim Identity". The program will feature guest speakers, interactive workshops, and Q&A sessions. Registration is free and open to all youth members aged 15-30. Don\'t miss this opportunity to learn and grow together!',
            author_id: 1,
            image_url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=300&fit=crop',
            category: 'Event',
            is_published: 1,
            created_at: '15 June 2026',
            views: 180
        },
        {
            id: postIdCounter++,
            title: 'Friday Reminder',
            summary: 'Remember to attend Jumu\'ah prayer and arrive early at the mosque.',
            content: 'Brothers and sisters, this is a gentle reminder to attend Jumu\'ah prayer tomorrow. Please arrive at the mosque at least 15 minutes before the khutbah begins. The sermon will focus on the importance of community unity and charity. May Allah accept our efforts. Ameen.',
            author_id: 1,
            image_url: '',
            category: 'Reminder',
            is_published: 1,
            created_at: '13 June 2026',
            views: 320
        },
        {
            id: postIdCounter++,
            title: 'Community Clean-Up Drive',
            summary: 'Join us this Sunday for a community clean-up drive around the mosque area.',
            content: 'We are organizing a community clean-up drive this Sunday from 8:00 AM to 12:00 PM. All members are encouraged to participate. Please bring your own gloves and water bottles. Cleaning supplies will be provided. Let\'s work together to keep our community clean and beautiful!',
            author_id: 2,
            image_url: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&h=300&fit=crop',
            category: 'Event',
            is_published: 0,
            created_at: '12 June 2026',
            views: 95
        }
    ];

    // Sample Messages
    messages = [
        {
            id: messageIdCounter++,
            recipient: 'Amir Mkuu',
            subject: 'Weekly Content Report',
            content: 'Assalamu alaikum. Here is the weekly content report for your review. We published 5 new posts this week with a total of 1,200 views. The most popular post was about the Eid preparation meeting. Let me know if you need any changes.',
            date: '18 Jun 2026',
            status: 'sent'
        },
        {
            id: messageIdCounter++,
            recipient: 'Katibu',
            subject: 'Meeting Minutes Request',
            content: 'Salam. Could you please share the meeting minutes from last week\'s session? I need to include them in the upcoming newsletter. Shukran.',
            date: '17 Jun 2026',
            status: 'sent'
        },
        {
            id: messageIdCounter++,
            recipient: 'Amirati',
            subject: 'Event Coverage Plan',
            content: 'I am finalizing the content plan for the upcoming Youth Da\'wah Program. Would you like to contribute a welcome message? Please let me know by Thursday.',
            date: '15 Jun 2026',
            status: 'sent'
        }
    ];

    updateAllUI();
}

// 
// POST FUNCTIONS
//
function addPost() {
    const titleInput = document.getElementById('postTitle');
    const authorInput = document.getElementById('postAuthor');
    const summaryInput = document.getElementById('postSummary');
    const contentInput = document.getElementById('postContent');
    const imageInput = document.getElementById('postImage');
    const categorySelect = document.getElementById('postCategory');
    const statusSelect = document.getElementById('postStatus');

    const title = titleInput.value.trim();
    const authorId = parseInt(authorInput.value) || 1;
    const summary = summaryInput.value.trim() || title.substring(0, 100) + '...';
    const content = contentInput.value.trim();
    const imageUrl = imageInput.value.trim() || '';
    const category = categorySelect.value;
    const isPublished = parseInt(statusSelect.value);

    if (!title) {
        alert('Please enter a post title.');
        titleInput.focus();
        return;
    }

    if (!content) {
        alert('Please enter post content.');
        contentInput.focus();
        return;
    }

    posts.push({
        id: postIdCounter++,
        title: title,
        summary: summary,
        content: content,
        author_id: authorId,
        image_url: imageUrl,
        category: category,
        is_published: isPublished,
        created_at: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        views: 0
    });

    // Clear inputs
    titleInput.value = '';
    authorInput.value = '1';
    summaryInput.value = '';
    contentInput.value = '';
    imageInput.value = '';
    categorySelect.value = 'Announcement';
    statusSelect.value = '1';

    updateAllUI();
    alert('✅ Post published successfully!');
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const newTitle = prompt('Edit Title:', post.title);
    if (newTitle === null) return;
    
    const newSummary = prompt('Edit Summary:', post.summary);
    if (newSummary === null) return;
    
    const newContent = prompt('Edit Content:', post.content);
    if (newContent === null) return;
    
    const newImage = prompt('Edit Image URL:', post.image_url || '');
    if (newImage === null) return;
    
    const newCategory = prompt('Edit Category (Announcement, Event, Reminder, News, Update):', post.category);
    if (newCategory === null) return;

    post.title = newTitle.trim() || post.title;
    post.summary = newSummary.trim() || post.summary;
    post.content = newContent.trim() || post.content;
    post.image_url = newImage.trim() || '';
    post.category = newCategory.trim() || post.category;

    updateAllUI();
    alert('✅ Post updated successfully!');
}

function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(p => p.id !== id);
        updateAllUI();
        alert('✅ Post deleted successfully!');
    }
}

function toggleStatus(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.is_published = post.is_published === 1 ? 0 : 1;
        updateAllUI();
        const status = post.is_published === 1 ? 'Published' : 'Draft';
        alert(`✅ Post status changed to ${status}!`);
    }
}


// MESSAGE FUNCTIONS
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
}

function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        messages = messages.filter(m => m.id !== id);
        updateAllUI();
        alert('✅ Message deleted successfully!');
    }
}


// UI UPDATE FUNCTIONS

function updateAllUI() {
    updateOverviewCards();
    renderPosts();
    renderMessages();
    updateNotificationCount();
}

function updateOverviewCards() {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter(p => p.is_published === 1).length;
    const totalMessages = messages.length;
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const recentPosts = posts.filter(p => {
        const postDate = new Date(p.created_at);
        const today = new Date();
        const diffTime = Math.abs(today - postDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    }).length;

    document.getElementById('totalPosts').textContent = totalPosts;
    document.getElementById('postCount').textContent = `${publishedPosts} published`;
    document.getElementById('totalMessages').textContent = totalMessages;
    document.getElementById('messageCount').textContent = `${totalMessages} conversations`;
    document.getElementById('totalViews').textContent = totalViews;
    document.getElementById('viewsCount').textContent = 'post views';
    document.getElementById('recentPosts').textContent = recentPosts;
    document.getElementById('recentCount').textContent = 'last 7 days';
}

function renderPosts() {
    const grid = document.getElementById('postsGrid');
    
    if (posts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #9aaf9a;">
                <i class="fa-solid fa-newspaper" style="font-size: 48px; color: #c8a34b; margin-bottom: 16px; display: block;"></i>
                <p style="font-size: 18px; font-weight: 500; color: #1a3a2a;">No posts yet</p>
                <p style="font-size: 14px; color: #8a8a7a;">Create your first post using the form above!</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = posts.map(p => `
        <div class="post-card">
            ${p.image_url ? 
                `<div class="post-image"><img src="${p.image_url}" alt="${p.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fa-solid fa-image\\'></i> No Image'"></div>` : 
                `<div class="post-image"><i class="fa-solid fa-image" style="font-size: 32px;"></i> No Image</div>`
            }
            <div class="post-title">${p.title}</div>
            <div class="post-summary"><strong>Summary:</strong> ${p.summary}</div>
            <div class="post-content-preview"><strong>Content:</strong> ${p.content.substring(0, 120)}${p.content.length > 120 ? '...' : ''}</div>
            <div class="post-meta">
                <span>
                    <i class="fa-regular fa-calendar"></i> ${p.created_at} · 
                    <i class="fa-regular fa-eye"></i> ${p.views || 0} views · 
                    Author: #${p.author_id}
                </span>
                <span class="category">${p.category}</span>
                <span class="status ${p.is_published === 1 ? 'published' : 'draft'}">
                    ${p.is_published === 1 ? 'Published' : 'Draft'}
                </span>
            </div>
            <div class="post-meta" style="border-top: none; padding-top: 8px;">
                <div class="post-actions">
                    <button class="btn-toggle" onclick="toggleStatus(${p.id})">
                        ${p.is_published === 1 ? 'Unpublish' : 'Publish'}
                    </button>
                    <button class="btn-edit" onclick="editPost(${p.id})"><i class="fa-solid fa-edit"></i> Edit</button>
                    <button class="btn-delete" onclick="deletePost(${p.id})"><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderMessages() {
    const tbody = document.getElementById('messageTableBody');
    
    if (messages.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; color:#9aaf9a; padding:30px;">
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
    const draftPosts = posts.filter(p => p.is_published === 0).length;
    document.getElementById('notificationCount').textContent = draftPosts;
}


// SEARCH FUNCTIONS

document.addEventListener('DOMContentLoaded', function() {
    // Posts Search
    const postSearch = document.getElementById('postSearch');
    if (postSearch) {
        postSearch.addEventListener('keyup', function() {
            const value = this.value.toLowerCase();
            const cards = document.querySelectorAll('.post-card');
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(value) ? '' : 'none';
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


// NAVIGATION

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
            overview: 'Content Overview',
            posts: 'Posts Management',
            messages: 'Messages Center',
            settings: 'Settings'
        };
        const subtitles = {
            overview: 'Today\'s report',
            posts: 'Create, edit, and delete posts',
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


// LOGOUT MODAL

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

// UTILITY FUNCTIONS
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// INITIALIZE

document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    console.log('Amiri Habari Dashboard initialized successfully!');
});