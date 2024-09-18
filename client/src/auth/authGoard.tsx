import { ReactNode, useState } from "react"
import { useAppSelector } from "../redux/store"
import { selectAuth } from "../redux/auth/auth.selectors"
import { Navigate, useLocation } from "react-router-dom"
import { PATHS } from "../routes/paths"
import { Props } from "../types/props.types"
import React from "react"
import SignInDialog from "../components/SignInDialog"


export default function AuthGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
    const { pathname } = useLocation()
    const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);

    const handleClose = () => {
        setSignInDialogOpen(false);
    };

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (!isAuthanticated) {
        //return (<Navigate to={PATHS.signIn} state={pathname} />)
        return  <SignInDialog open= {true} handleClose={handleClose}></SignInDialog>
        

    }

    return <>{children}</>
}