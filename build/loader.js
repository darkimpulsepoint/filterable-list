export class Loader {
    baseurl;
    isLoading = false;
    constructor(baseurl) {
        this.baseurl = baseurl;
    }
    getPosts = async (page = 1, per_page = 10, str_contains = "") => {
        this.isLoading = true;
        const postsUrl = new URL(this.baseurl + "/posts");
        postsUrl.searchParams.set("_page", page.toString());
        postsUrl.searchParams.set("_per_page", per_page.toString());
        postsUrl.searchParams.set("title_like", encodeURI(str_contains));
        const fromServerPosts = await fetch(postsUrl).then((data) => data.json());
        const posts = await Promise.all(fromServerPosts.map(async (post) => {
            return {
                msg: {
                    title: post.title,
                    body: post.body
                },
                user: await this.getUser(post.userId)
            };
        }));
        this.isLoading = false;
        return posts;
    };
    getUser = async (uid) => {
        this.isLoading = true;
        const user = await fetch(this.baseurl + `/users/${uid}`)
            .then(data => data.json());
        this.isLoading = false;
        return user;
    };
}
