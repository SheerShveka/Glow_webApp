// JavaScript source code

const btnAdd = document.getElementById("add-post-button");
const form = document.getElementById("newPost");
const posts = document.getElementById("your-posts");
const btnPost = document.getElementById("post-btn")



btnAdd.addEventListener("click", function () {
    newPost.hidden = false;
});

btnPost.addEventListener("click", function () {
    newPost.hidden = true;
});
