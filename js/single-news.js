/**
 * SINGLE NEWS PAGE - Inachukua makala moja kutoka database
 */
const container = document.getElementById("articleContainer");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadArticle() {
    if (!id) {
        container.innerHTML = '<h2>Makala haijachaguliwa.</h2><p><a href="news.html">Rudi kwenye habari</a></p>';
        return;
    }

    container.innerHTML = '<p style="text-align:center;padding:20px;">Inapakia makala...</p>';

    try {
        const response = await fetch(`../backend/get_single_post.php?id=${id}`);
        const result = await response.json();

        if (!result.success) {
            container.innerHTML = `<h2>Makala haikupatikana</h2><p>${result.message}</p>`;
            return;
        }

        const article = result.data;

        container.innerHTML = `
            ${article.image_url
                ? `<img src="${article.image_url}" class="article-image" alt="${article.title}">`
                : ''}
            <span class="category">Tangazo</span>
            <h1>${article.title}</h1>
            <div class="meta">
                Imechapishwa: ${new Date(article.created_at).toLocaleDateString('sw-TZ')}
                &nbsp;|&nbsp;
                Mwandishi: ${article.author_name || 'MCIAA'}
            </div>
            <div class="content">${article.content}</div>
        `;

    } catch (err) {
        container.innerHTML = '<h2>Hitilafu ya mtandao</h2><p>Imeshindwa kupakia makala. Tafadhali jaribu tena.</p>';
    }
}

loadArticle();
