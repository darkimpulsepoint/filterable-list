export class Loader {
    #baseurl
    isLoading = false
    constructor(baseurl){
        this.#baseurl = baseurl
    }

    getPosts = async (page=1, per_page=10, str_contains="")=> {
        this.isLoading = true

        const postsUrl = new URL(this.#baseurl + "/posts")

        postsUrl.search = `_page=${page}&`
            + `_per_page=${per_page}&`
            + `title_like=${encodeURI(str_contains)}`


        const posts = await fetch(postsUrl).then(data => data.json())

        for (let i=0; i<posts.length; i++){
            posts[i]=
                {
                    msg: {
                        title: posts[i].title,
                        body: posts[i].body
                    },
                    user: await this.getUser(posts[i].userId)
                }

        }

        this.isLoading = false
        return posts
    }

    getUser = async (uid) => {
        this.isLoading = true
        const user = await fetch(this.#baseurl + `/users/${uid}`)
            .then(data=>data.json())

        this.isLoading = false
        return user
    }
}