document.addEventListener("DOMContentLoaded", () => {
    // 1. Grab all the target elements from our HTML output page
    const headlineElement = document.querySelector(".news-headline");
    const imageElement = document.querySelector(".news-featured-img");
    const imageCaptionElement = document.querySelector(".image-caption");
    const leadElement = document.querySelector(".lead-paragraph");
    const quoteTextElement = document.querySelector(".news-quote p");
    const quoteAuthorElement = document.querySelector(".news-quote cite");
    const dateElement = document.querySelector(".news-meta .date");
    const tagElement = document.querySelector(".news-tag");

    // 2. Catch data from the incoming URL (e.g., news-detail.html?title=Hello&quote=Hi...)
    const urlParams = new URLSearchParams(window.location.search);

    const newsData = {
        title: urlParams.get("title"),
        image: urlParams.get("image"),
        caption: urlParams.get("caption"),
        lead: urlParams.get("lead"),
        quoteText: urlParams.get("quote"),
        quoteAuthor: urlParams.get("author"),
        tag: urlParams.get("tag"),
        date: urlParams.get("date")
    };

    // 3. Optional: Fallback data layer in case no inputs are passed in the URL
    const fallbackData = {
        title: "Building a Brighter Community: MCIAA Enters Next Phase",
        image: "../IMAGES/about.jpg",
        caption: "Members gathering at the local assembly hall for the project launch.",
        lead: "This is your default introductory explanation paragraph summarizing the core milestone.",
        quoteText: '"Unity and dedication within our structural programs allow us to lay a permanent foundation."',
        quoteAuthor: "— Director of Association Affairs",
        tag: "Announcement",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    // 4. Safely output and inject the caught elements into the DOM layout
    headlineElement.textContent = newsData.title || fallbackData.title;
    leadElement.textContent = newsData.lead || fallbackData.lead;
    quoteTextElement.textContent = newsData.quoteText || fallbackData.quoteText;
    quoteAuthorElement.textContent = newsData.quoteAuthor || fallbackData.quoteAuthor;
    tagElement.textContent = newsData.tag || fallbackData.tag;
    dateElement.textContent = newsData.date || fallbackData.date;

    // Handle Image source & caption changes smoothly
    if (imageElement) {
        imageElement.src = newsData.image || fallbackData.image;
        imageElement.alt = newsData.title || fallbackData.title;
    }
    if (imageCaptionElement) {
        imageCaptionElement.textContent = newsData.caption || fallbackData.caption;
    }
});