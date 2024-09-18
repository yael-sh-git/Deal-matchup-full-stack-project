import { Post } from "./post.types"

export type User = {
    id?: number,
    name: string,
    email: string,
    password: string,
    rating: number,
    role: string,
    shared_items?:Post[]
}

export type LoginUser = {
    email:string,
    password:string
}

export type AuthUser = {
    user: User,
    token: string
}
