// Get news from admin dashboard
let news = JSON.parse(localStorage.getItem("news")) || [];


const newsContainer =
    document.getElementById("newsContainer");


// Display published news only
function displayNews() {


    const publishedNews =
        news.filter(post => post.is_published === 1);



    if (publishedNews.length === 0) {

        newsContainer.innerHTML = `

        <div class="empty-news">

            <h2>No News Available</h2>

            <p>
            There are currently no published announcements.
            </p>

        </div>

        `;

        return;
    }



    newsContainer.innerHTML =
        publishedNews.map(post => {


            return `


        <article class="news-card">


            ${post.image_url ?

                    `
            <img 
            src="${post.image_url}" 
            class="news-image"
            alt="${post.title}">
            `

                    :

                    ""

                }



            <div class="news-info">


                <span class="badge-tag">
                ${post.category}
                </span>


                <h3>
                ${post.title}
                </h3>



                <span class="news-date">

                <i class="fa-regular fa-calendar"></i>

                ${new Date(post.created_at)
                    .toLocaleDateString()}

                </span>



                <p>
                ${post.summary}
                </p>



                <button 
                class="read-more"
                onclick="openNews(${post.id})">

                Read More

                </button>


            </div>


        </article>


        `;


        }).join("");

}




// Open full article
function openNews(id) {

    window.location.href =
        `single-news.html?id=${id}`;

}



displayNews();