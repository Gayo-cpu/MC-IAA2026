const searchPost = document.getElementById("searchPost");

searchPost.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  const posts = document.querySelectorAll(".post-card");

  posts.forEach((post) => {
    const content = post.textContent.toLowerCase();

    post.style.display = content.includes(value) ? "block" : "none";
  });
});
