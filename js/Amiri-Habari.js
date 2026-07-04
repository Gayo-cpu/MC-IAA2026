// ================================================================
// AMIRI HABARI DASHBOARD — Connected to MySQL Database
// ================================================================

const API_BASE = '../backend';

// ================================================================
// POSTS — Load from database
// ================================================================
async function loadPosts() {
    const grid = document.getElementById('postsGrid');
    const totalPostsEl = document.getElementById('totalPosts');
    const postCountEl  = document.getElementById('postCount');
    const recentPostsEl= document.getElementById('recentPosts');
    const recentCountEl= document.getElementById('recentCount');

    if (grid) grid.innerHTML = '<p style="text-align:center;padding:30px;color:#888;">Inapakia makala...</p>';

    try {
        const res    = await fetch(`${API_BASE}/get_posts.php?all=1`);
        const result = await res.json();

        if (!result.success) {
            if (grid) grid.innerHTML = `<p style="color:red;padding:20px;">Hitilafu: ${result.message}</p>`;
            return;
        }

        const posts = result.data || [];

        // Update overview counters
        const published = posts.filter(p => p.is_published == 1).length;
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recent = posts.filter(p => new Date(p.created_at) >= sevenDaysAgo).length;

        if (totalPostsEl) totalPostsEl.textContent = posts.length;
        if (postCountEl)  postCountEl.textContent  = `${published} published`;
        if (recentPostsEl) recentPostsEl.textContent = recent;
        if (recentCountEl) recentCountEl.textContent = 'last 7 days';

        if (!grid) return;

        if (posts.length === 0) {
            grid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:40px;color:#9aaf9a;">
                    <i class="fa-solid fa-newspaper" style="font-size:48px;color:#c8a34b;margin-bottom:16px;display:block;"></i>
                    <p style="font-size:18px;font-weight:500;color:#1a3a2a;">Hakuna makala bado</p>
                    <p style="font-size:14px;color:#8a8a7a;">Unda makala yako ya kwanza ukitumia fomu hapo juu!</p>
                </div>`;
            return;
        }

        grid.innerHTML = posts.map(p => `
            <div class="post-card" id="post-${p.post_id}">
                ${p.image_url
                    ? `<div class="post-image"><img src="${p.image_url}" alt="${p.title}" onerror="this.parentElement.innerHTML='<i class=\\'fa-solid fa-image\\'></i>'"></div>`
                    : `<div class="post-image"><i class="fa-solid fa-image" style="font-size:32px;"></i> Hakuna Picha</div>`}
                <div class="post-title">${p.title}</div>
                <div class="post-summary"><strong>Muhtasari:</strong> ${p.summary || ''}</div>
                <div class="post-content-preview"><strong>Maudhui:</strong> ${(p.content || '').substring(0,120)}${(p.content||'').length > 120 ? '...' : ''}</div>
                <div class="post-meta">
                    <span>
                        <i class="fa-regular fa-calendar"></i>
                        ${new Date(p.created_at).toLocaleDateString('sw-TZ')} &nbsp;·&nbsp;
                        Mwandishi: ${p.author_name || 'Admin'}
                    </span>
                    <span class="status ${p.is_published == 1 ? 'published' : 'draft'}">
                        ${p.is_published == 1 ? 'Imechapishwa' : 'Rasimu'}
                    </span>
                </div>
                <div class="post-actions" style="padding:12px 16px;display:flex;gap:8px;flex-wrap:wrap;">
                    <button class="btn-toggle" onclick="toggleStatus(${p.post_id})">
                        ${p.is_published == 1 ? 'Fanya Rasimu' : 'Chapisha'}
                    </button>
                    <button class="btn-edit" onclick="openEditModal(${p.post_id}, \`${escapeJs(p.title)}\`, \`${escapeJs(p.content)}\`, \`${escapeJs(p.image_url||'')}\`, ${p.is_published})">
                        <i class="fa-solid fa-edit"></i> Hariri
                    </button>
                    <button class="btn-delete" onclick="deletePost(${p.post_id})">
                        <i class="fa-solid fa-trash"></i> Futa
                    </button>
                </div>
            </div>
        `).join('');

    } catch (err) {
        if (grid) grid.innerHTML = `<p style="color:red;padding:20px;">Hitilafu ya mtandao. Jaribu tena.</p>`;
        console.error(err);
    }
}

function escapeJs(str) {
    return (str || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// ================================================================
// ADD POST
// ================================================================
async function addPost() {
    const title       = document.getElementById('postTitle')?.value.trim();
    const content     = document.getElementById('postContent')?.value.trim();
    const image_url   = document.getElementById('postImage')?.value.trim() || '';
    const category    = document.getElementById('postCategory')?.value || 'Announcement';
    const is_published= document.getElementById('postStatus')?.value ?? '1';
    const author_id   = document.getElementById('postAuthor')?.value || '1';

    if (!title) { alert('Tafadhali ingiza kichwa cha makala.'); return; }
    if (!content) { alert('Tafadhali ingiza maudhui ya makala.'); return; }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image_url', image_url);
    formData.append('category', category);
    formData.append('is_published', is_published);
    formData.append('author_id', author_id);

    try {
        const res    = await fetch(`${API_BASE}/create_post.php`, { method: 'POST', body: formData });
        const result = await res.json();

        if (result.success) {
            alert('✅ ' + result.message);
            // Clear form
            ['postTitle','postContent','postImage','postAuthor'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = id === 'postAuthor' ? '1' : '';
            });
            loadPosts();
        } else {
            alert('❌ ' + result.message);
        }
    } catch (err) {
        alert('❌ Hitilafu ya mtandao.');
        console.error(err);
    }
}

// ================================================================
// TOGGLE STATUS
// ================================================================
async function toggleStatus(post_id) {
    const formData = new FormData();
    formData.append('post_id', post_id);

    try {
        const res    = await fetch(`${API_BASE}/toggle_post.php`, { method: 'POST', body: formData });
        const result = await res.json();
        if (result.success) {
            loadPosts();
        } else {
            alert('❌ ' + result.message);
        }
    } catch (err) {
        alert('❌ Hitilafu ya mtandao.');
    }
}

// ================================================================
// DELETE POST
// ================================================================
async function deletePost(post_id) {
    if (!confirm('Una uhakika unataka kufuta makala hii?')) return;

    const formData = new FormData();
    formData.append('post_id', post_id);

    try {
        const res    = await fetch(`${API_BASE}/delete_post.php`, { method: 'POST', body: formData });
        const result = await res.json();
        if (result.success) {
            alert('✅ ' + result.message);
            loadPosts();
        } else {
            alert('❌ ' + result.message);
        }
    } catch (err) {
        alert('❌ Hitilafu ya mtandao.');
    }
}

// ================================================================
// EDIT POST — Modal
// ================================================================
function openEditModal(post_id, title, content, image_url, is_published) {
    document.getElementById('editPostId').value    = post_id;
    document.getElementById('editTitle').value     = title;
    document.getElementById('editContent').value   = content;
    document.getElementById('editImage').value     = image_url;
    document.getElementById('editStatus').value    = is_published;
    document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

async function saveEdit() {
    const post_id     = document.getElementById('editPostId').value;
    const title       = document.getElementById('editTitle').value.trim();
    const content     = document.getElementById('editContent').value.trim();
    const image_url   = document.getElementById('editImage').value.trim();
    const is_published= document.getElementById('editStatus').value;

    if (!title || !content) { alert('Kichwa na maudhui ni lazima.'); return; }

    const formData = new FormData();
    formData.append('post_id', post_id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image_url', image_url);
    formData.append('is_published', is_published);

    try {
        const res    = await fetch(`${API_BASE}/update_post.php`, { method: 'POST', body: formData });
        const result = await res.json();
        if (result.success) {
            alert('✅ ' + result.message);
            closeEditModal();
            loadPosts();
        } else {
            alert('❌ ' + result.message);
        }
    } catch (err) {
        alert('❌ Hitilafu ya mtandao.');
    }
}

// ================================================================
// NAVIGATION
// ================================================================
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const quickBtns = document.querySelectorAll('.quick-btn');

    function navigateTo(page) {
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`page-${page}`);
        if (target) target.classList.add('active');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) link.classList.add('active');
        });

        const titles = { overview: 'Content Overview', posts: 'Posts Management', messages: 'Messages Center', settings: 'Mipangilio' };
        const subtitles = { overview: "Ripoti ya leo", posts: "Unda, hariri na futa makala", messages: "Tuma na pokea ujumbe", settings: "Mapendeleo ya akaunti" };

        const titleEl = document.getElementById('pageTitle');
        const subEl   = document.getElementById('pageSubtitle');
        if (titleEl) titleEl.textContent = titles[page] || 'Dashboard';
        if (subEl)   subEl.innerHTML = `<i class="fa-regular fa-calendar"></i> ${subtitles[page] || ''}`;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });

    // LOGOUT MODAL
    const logoutBtn     = document.getElementById('logoutBtn');
    const logoutModal   = document.getElementById('logoutModal');
    const cancelLogout  = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutBtn)     logoutBtn.addEventListener('click', e => { e.preventDefault(); logoutModal?.classList.add('show'); });
    if (cancelLogout)  cancelLogout.addEventListener('click', () => logoutModal?.classList.remove('show'));
    if (confirmLogout) confirmLogout.addEventListener('click', () => { window.location.href = '../views/login.html'; });
    if (logoutModal)   logoutModal.addEventListener('click', e => { if (e.target === logoutModal) logoutModal.classList.remove('show'); });

    // Load posts on init
    loadPosts();
});
