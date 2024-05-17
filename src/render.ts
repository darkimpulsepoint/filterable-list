import {Post} from "./types";

export function addPosts(postsDiv: HTMLDivElement, posts: Post[]) {

    posts.forEach((post: Post): void => {
        const postDiv: HTMLDivElement = document.createElement("div")

        postDiv.className = "post"
        postDiv.appendChild(userDiv(post.user.name, post.user.phone, post.user.email))
        postDiv.appendChild(postTextDiv(post.msg.title, post.msg.body))

        postsDiv.appendChild(postDiv)
    })
}

function postTextDiv(title: string, body: string): HTMLDivElement{
    const postTextD: HTMLDivElement = document.createElement("div")
    postTextD.className = "message"

    const titleH: HTMLHeadingElement = document.createElement("h1")
    titleH.innerText = title

    const textP: HTMLParagraphElement = document.createElement("p")
    textP.innerText = body

    postTextD.appendChild(titleH)
    postTextD.appendChild(textP)

    return postTextD
}

function userDiv(name: string, phone: string, email: string): HTMLDivElement {
    const userD: HTMLDivElement = document.createElement("div")
    userD.className = "user-info"

    const nameH: HTMLHeadingElement = document.createElement("h2")
    nameH.innerText = name
    nameH.className = "name"

    const phoneP: HTMLParagraphElement = document.createElement("p")
    phoneP.innerText = phone
    phoneP.className = "phone"

    const emailP: HTMLParagraphElement = document.createElement("p")
    emailP.innerText = email
    emailP.className = "email"

    userD.appendChild(nameH)
    userD.appendChild(phoneP)
    userD.appendChild(emailP)

    return userD
}