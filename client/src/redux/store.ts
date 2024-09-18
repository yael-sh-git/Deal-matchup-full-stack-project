import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import categoryReducer from './category/category.slice'
import postReducer from './post/post.slice'
import authReducer from './auth/auth.slice'
import userReducer from './user/user.slice'


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        post: postReducer,
        auth: authReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
    Promise<ReturnType> | ReturnType,
    RootState,
    unknown,
    UnknownAction
>