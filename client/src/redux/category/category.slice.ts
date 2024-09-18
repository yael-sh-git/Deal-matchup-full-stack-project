import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../types/category.types';

type CategoryStateType = {
    categories: Category []
}

const categorySlice = createSlice({
    name: 'category',
    initialState: {} as CategoryStateType,
    reducers: {
        setCategories: (state: CategoryStateType, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        addCategory: (state: CategoryStateType, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },
        deleteCategory: (state: CategoryStateType, action: PayloadAction<number>) => {
            // state = state.filter(p => p.id !== action.payload)
            state.categories= state.categories.filter(p => p.id !== action.payload)
        },
        updateCategory: (state: CategoryStateType, action: PayloadAction<Category>) => {
            const category_index = state.categories.findIndex(c=> c.id===action.payload.id)
            state.categories[category_index] = action.payload
        },
    }
})

export const { addCategory,deleteCategory,updateCategory,setCategories } = categorySlice.actions

export default categorySlice.reducer