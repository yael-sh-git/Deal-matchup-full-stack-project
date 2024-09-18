import { Comment } from "../types/comment"
import axios from "../utils/axios"

export const addCommentApi = async (comment: Omit<Comment, 'id'>) => {
    const response = await axios.post('/Comment', comment)
    const newComment = response.data
    return newComment
}