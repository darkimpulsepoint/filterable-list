export function addPosts(posts) {
    const postsDiv = document.querySelector("#posts")

    posts.forEach(post=> {
        const postDiv = document.createElement("div")

        postDiv.className = "post"
        postDiv.appendChild(userDiv(post.user.name, post.user.phone, post.user.email))
        postDiv.appendChild(postTextDiv(post.msg.title, post.msg.body))

        postsDiv.appendChild(postDiv)
    })
}

export function clearPosts(){
    document.querySelector("#posts").innerHTML = ""
}

function postTextDiv(title, body){
    const postTextD = document.createElement("div")
    postTextD.className = "message"

    const titleH = document.createElement("h1")
    titleH.innerText = title

    const textP = document.createElement("p")
    textP.innerText = body

    postTextD.appendChild(titleH)
    postTextD.appendChild(textP)

    return postTextD
}

function userDiv(name, phone, email){
    const userD = document.createElement("div")
    userD.className = "user-info"

    const nameH = document.createElement("h2")
    nameH.innerText = name
    nameH.className = "name"

    const phoneP = document.createElement("p")
    phoneP.innerText = phone
    phoneP.className = "phone"

    const emailP = document.createElement("p")
    emailP.innerText = email
    emailP.className = "email"

    userD.appendChild(nameH)
    userD.appendChild(phoneP)
    userD.appendChild(emailP)

    return userD
}