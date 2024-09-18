import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Post } from '../../types/post.types';

type PostStateType = {
    posts: Post []
}

const postSlice = createSlice({
    name: 'post',
    initialState: {} as PostStateType,
    reducers: {
        setPosts: (state: PostStateType, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        addPost: (state: PostStateType, action: PayloadAction<Post>) => {
            state.posts.push(action.payload)
        },
        deletePost: (state: PostStateType, action: PayloadAction<number>) => {
            state.posts= state.posts.filter(p => p.id !== action.payload)
        },
        updatePost: (state: PostStateType, action: PayloadAction<Post>) => {
            const post_index = state.posts.findIndex(p=> p.id===action.payload.id)
            state.posts[post_index] = action.payload
        },
    }
})

export const { addPost ,deletePost,updatePost,setPosts } = postSlice.actions

export default postSlice.reducer