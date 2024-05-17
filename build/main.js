import { addPosts } from "./render.js";
import { Loader } from "./loader.js";
const BASE_URL = "https://jsonplaceholder.typicode.com";
const loader = new Loader(BASE_URL);
const filterInput = document.querySelector("#text-filter");
const postsDiv = document.querySelector("#posts");
let page = 1;
const perPage = 10;
addPosts(postsDiv, await loader.getPosts(page, perPage));
function debounce(func, ms) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), ms);
    };
}
async function handleFilterInput() {
    page = 1;
    const posts = await loader.getPosts(page, perPage, filterInput.value);
    postsDiv.innerHTML = "";
    addPosts(postsDiv, posts);
}
filterInput.addEventListener("input", debounce(handleFilterInput, 500));
window.addEventListener("scroll", async () => {
    if (loader.isLoading)
        return;
    if (document.documentElement.clientHeight +
        document.documentElement.scrollTop >= document.documentElement.scrollHeight - 50) {
        addPosts(postsDiv, await loader.getPosts(++page, perPage, filterInput.value));
    }
});
