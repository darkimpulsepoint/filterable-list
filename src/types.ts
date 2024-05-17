export interface User {
    name: string,
    phone: string,
    email: string,
}

export interface Msg {
    title: string,
    body: string,
}

export interface FromServerPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface Post {
    user: User,
    msg: Msg,
} 