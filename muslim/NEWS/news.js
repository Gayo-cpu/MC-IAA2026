
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
});

async function renderNews() {
    const newsGrid = document.getElementById('newsGrid');

    try {
        const newsItems = await getNewsItems();

        if (!newsItems || newsItems.length === 0) {
            newsGrid.innerHTML = `
                <div class="news-card">
                    <h3>No news items yet</h3>
                    <p>There are currently no published news updates. Please check back later or ask your administrator to publish the latest announcements.</p>
                </div>
            `;
            return;
        }

        newsGrid.innerHTML = newsItems.map(item => `
            <article class="news-card">
                <div class="news-meta">
                    <span>${new Date(item.created_at).toLocaleDateString()}</span>
                    <span class="news-pill">${item.status}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.content.substring(0, 200)}${item.content.length > 200 ? '...' : ''}</p>
            </article>
        `).join('');
    } catch (error) {
        console.error('Failed to load news:', error);
        newsGrid.innerHTML = `
            <div class="news-card">
                <h3>Error loading news</h3>
                <p>Sorry, we couldn't load the news at this time. Please try again later.</p>
            </div>
        `;
    }
}
