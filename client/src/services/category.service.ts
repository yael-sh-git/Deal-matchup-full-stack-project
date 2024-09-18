import axios from "../utils/axios";
import { Category } from '../types/category.types';


export const getCategoryApi = async () => {
    const response = await axios.get('/Category')
    const categories = response.data
    return categories
}
export const getCategoryByIdApi = async (id:Number) => {
    const response = await axios.get(`/Category/${id}`)
    const Category = response.data
    return Category
}

export const addCategoryApi = async (category: Omit<Category, 'id'>) => {
    const response = await axios.post('/Category', category)
    const newCategory = response.data
    return newCategory
}

export const updateCategoryApi = async (category: Category) => {
    const response = await axios.put(`/Category/${category.id}`, category)
    const updatedCategory = response.data
    return updatedCategory
}

export const deleteCategoryApi = async (id: number) => {
    const response = await axios.delete(`/Category/${id}`)
    return response
}