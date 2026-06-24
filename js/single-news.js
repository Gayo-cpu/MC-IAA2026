// Get all news
let news =
    JSON.parse(localStorage.getItem("news")) || [];



// Get ID from URL

const params =
    new URLSearchParams(window.location.search);


const id =
    params.get("id");



// Find selected news

const article =
    news.find(post => post.id == id);



const container =
    document.getElementById("articleContainer");



if (article && article.is_published === 1) {


    container.innerHTML = `


${article.image_url ?

            `
<img 
src="${article.image_url}"
class="article-image">
`

            :
            ""

        }



<span class="category">
${article.category}
</span>



<h1>
${article.title}
</h1>



<div class="meta">

Published:

${new Date(article.created_at)
            .toLocaleDateString()}


&nbsp; | &nbsp;


Views:
${article.views}

</div>




<p class="summary">

${article.summary}

</p>



<div class="content">

${article.content}

</div>


`;



}

else {


    container.innerHTML = `

<h2>
News not found
</h2>

<p>
This article is unavailable.
</p>

`;

}