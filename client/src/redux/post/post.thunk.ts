import { addPostApi, getPostApi, updatePostApi } from "../../services/post.service"
import { Post } from "../../types/post.types"
import { AppThunk } from "../store"
import { addPost, setPosts, updatePost } from "./post.slice"

export const getPostsThunk = (): AppThunk<Promise<Post[]>> => async (dispatch, getState)=> {
    const posts = await getPostApi()
    console.log(posts)
    dispatch(setPosts(posts))
    return posts
}

export const addPostThunk= (formData: FormData): AppThunk<Post> => async (dispatch, getState)=> {
    const post = await addPostApi(formData)
    console.log(post)
    dispatch(addPost(post))
    //להוסיף למשתמש רשימה של פוסטים שלו-ולעשות פונקציה שמוסיפה לו  את הפוסט בסלייס
    //dispatch(addProductForUser(product))
    return post
}
// export const updatePostThunk=(post:Post):AppThunk<Post> => async(dispatch,getState )=>{
//     const updatedPost= await updatePostApi(post);
//     dispatch(updatePost(updatePost));
//     return updatePost
// }

