import axios from '../utils/axios';
import { Post } from '../types/post.types';


export const getPostApi = async () => {
    const response = await axios.get('/Shared_Item')
    const posts = response.data
    return posts
}
export const getPostByIdApi = async (id:Number) => {
    const response = await axios.get(`/Shared_Item/${id}`)
    const post = response.data
    return post
}

export const addPostApi = async (formData: FormData) => {
    // No need for custom headers, axios will automatically set the content-type
    try {
        const response = await axios.post('/Shared_Item', formData, { //`${ENDPOINTS.addProduct}`
            headers: {
                'Content-Type': "multipart/form-data"
            }
        });
        const newProduct = response.data;
        return newProduct;
    } catch (error) {
        // Handle error
        console.error('Error adding product:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};

export const updatePostApi = async (post: Post) => {
    const response = await axios.put(`/Shared_Item/${post.id}`, post)
    const updatedPost = response.data
    return updatedPost
}

export const deletePostApi = async (id: number) => {
    const response = await axios.delete(`/Shared_Item/${id}`)
    return response
}

export const getPostsByDescriptionApi =async (description:string) => {
    const response = await axios.get(`/Shared_Item/byDescription/${description}`)
    const posts= response.data
    return posts
}

export const getPostsByCategoryApi =async (category:number) => {
    const response = await axios.get(`/Shared_Item/category/${category}`)
    const posts= response.data
    return posts
}