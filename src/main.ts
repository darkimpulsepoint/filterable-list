import {addPosts} from "./render";
import {Loader} from "./loader";
import {Post} from "./types";

const BASE_URL: string = "https://jsonplaceholder.typicode.com"
const loader: Loader = new Loader(BASE_URL)
const filterInput: HTMLInputElement = document.querySelector("#text-filter")!
const postsDiv :HTMLDivElement = document.querySelector("#posts")!

let page: number = 1
const perPage: number = 10

addPosts(postsDiv, await loader.getPosts(page, perPage))

function debounce(func: Function, ms: number): (...args: any)=>any {
    let timeout: number;
    return function(...args: any): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), ms);
    };
}

async function handleFilterInput(): Promise<void> {
    page = 1
    const posts: Post[] = await loader.getPosts(page, perPage, filterInput.value)
    postsDiv.innerHTML = ""
    addPosts(postsDiv, posts)
}

filterInput.addEventListener("input", debounce(handleFilterInput, 500))

window.addEventListener("scroll", async (): Promise<void> => {
    if (loader.isLoading) return;
    if (document.documentElement.clientHeight +
        document.documentElement.scrollTop>= document.documentElement.scrollHeight - 50) {
        addPosts(postsDiv, await loader.getPosts(++page, perPage, filterInput.value))
    }
})