/**
 * NEWS PAGE - Inachukua makala kutoka database kupitia API
 */
const newsContainer = document.getElementById("newsContainer");

async function loadNews() {
    newsContainer.innerHTML = '<p style="text-align:center;padding:20px;">Inapakia habari...</p>';

    try {
        const response = await fetch('../backend/get_posts.php');
        const result = await response.json();

        if (!result.success || result.data.length === 0) {
            newsContainer.innerHTML = `
                <div class="empty-news">
                    <h2>Hakuna Habari Zilizopo</h2>
                    <p>Kwa sasa hakuna matangazo yaliyochapishwa.</p>
                </div>`;
            return;
        }

        newsContainer.innerHTML = result.data.map(post => `
            <article class="news-card">
                ${post.image_url
                    ? `<img src="${post.image_url}" class="news-image" alt="${post.title}">`
                    : ''}
                <div class="news-info">
                    <span class="badge-tag">Tangazo</span>
                    <h3>${post.title}</h3>
                    <span class="news-date">
                        <i class="fa-regular fa-calendar"></i>
                        ${new Date(post.created_at).toLocaleDateString('sw-TZ')}
                    </span>
                    <p>${post.summary}</p>
                    <button class="read-more" onclick="openNews(${post.post_id})">
                        Soma Zaidi
                    </button>
                </div>
            </article>
        `).join('');

    } catch (err) {
        newsContainer.innerHTML = `
            <div class="empty-news">
                <h2>Hitilafu ya Mtandao</h2>
                <p>Imeshindwa kupakia habari. Tafadhali jaribu tena.</p>
            </div>`;
    }
}

function openNews(id) {
    window.location.href = `single-news.html?id=${id}`;
}

loadNews();
