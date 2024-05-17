import {FromServerPost, Post, User} from "./types";

export class Loader {
    readonly baseurl: string
    isLoading: boolean = false
    constructor(baseurl: string){
        this.baseurl = baseurl
    }

    getPosts = async (page: number=1, per_page: number=10, str_contains: string=""): Promise<Post[]>=> {
        this.isLoading = true
        const postsUrl: URL = new URL(this.baseurl + "/posts")

        postsUrl.searchParams.set("_page", page.toString())
        postsUrl.searchParams.set("_per_page", per_page.toString())
        postsUrl.searchParams.set("title_like", encodeURI(str_contains))

        const fromServerPosts: FromServerPost[] = await fetch(postsUrl).then((data): Promise<FromServerPost[]> => data.json())

        const posts: Post[] = await Promise.all(fromServerPosts.map(async (post) => {
            return {
                msg: {
                    title: post.title,
                    body: post.body
                },
                user: await this.getUser(post.userId)
            };
        }));

        this.isLoading = false

        return posts;
    }

    getUser = async (uid: number): Promise<User> => {
        this.isLoading = true
        const user = await fetch(this.baseurl + `/users/${uid}`)
            .then(data=>data.json())

        this.isLoading = false
        return user
    }
}