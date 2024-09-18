import { Comment } from "./comment"

export type Post = {
    id?: number,
    name:string,
    user_Id: number,
    category_Id?: number,
    type_Id: number,
    description: string,
    imageUrl?: string,
    images: File[],
    picturesBytes?:Blob[],
    url?: string,
    rating: number,
    date_of_sharing: Date,
    comments?: Comment[],
}