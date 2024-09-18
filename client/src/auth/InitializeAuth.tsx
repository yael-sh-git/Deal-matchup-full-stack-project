import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../redux/store"
import { AuthUser } from "../types/user.types"
import { getSession, isValidToken, setAuthorizationHeader } from "./auth.utils"
import { setInitialize, setAuthUser } from "../redux/auth/auth.slice"
import { Props } from "../types/props.types"



export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const authUser: AuthUser | null = getSession()
        if (authUser?.token && isValidToken(authUser.token)) {
            // בדיקה האם הטוקן שווה לנתוני היוזר
            // dispatch(setUser(authUser.user)) checkk
            setAuthorizationHeader(authUser.token)
        }
        dispatch(setInitialize())
    }, [])

    return <>{children}</>
}