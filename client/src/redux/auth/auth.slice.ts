import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";
import { removeSession } from "../../auth/auth.utils";

type AuthStateType = {
    user: User | null,
    isAuthanticated: boolean,
    isInitialized: boolean
}

const initialState = {
    user: null,
    isAuthanticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state: AuthStateType, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthanticated = true;
            state.isInitialized = true;
        },
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        },
        logOut: (state: AuthStateType) => {
            state.user = null;
            state.isAuthanticated = false;
            state.isInitialized = false;
            removeSession();
        }
    }
})

export const { setAuthUser, setInitialize, logOut } = authSlice.actions

export default authSlice.reducer