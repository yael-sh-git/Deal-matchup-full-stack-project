import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { PATHS } from "./paths";
import Posts from "../pages/Posts";
import { getPostApi } from "../services/post.service";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Posts2 from "../pages/Post2";
import LandingPage from "../pages/home";
import SignIn2 from "../pages/SignIn2";
import UserAreaLayout from "../layouts/UserAreaLatouts";
import { Children } from "react";
import InitializeAuth from "../auth/InitializeAuth";
import UserPosts from "../pages/UserPosts";
import AuthGuard from "../auth/authGoard";
import { getCategoryApi } from "../services/category.service";
import { useAppDispatch } from "../redux/store";
import { setCategories } from "../redux/category/category.slice";

export const router = createBrowserRouter([
    {
        path: PATHS.home,
        element: <Layout />,
        // loader: async()=>{
        //     const categories= await getCategoryApi()
        //     return categories
        // },
        children: [
            {
                path: '',
                element: <LandingPage/>,
            },
            {
                path: PATHS.posts,
                element: <Posts2/>,
                // element: <Posts />,
                // loader: async () => {
                //     const post: any[] = await getPostApi()
                //     return post
                // },
                errorElement: <h1>Load Post Data Failed</h1>,
            },
            {
                path: 'about',
                element: <h1>About</h1>,
            },

        ],
    },
    {
        path: PATHS.userArea,
        element: <AuthGuard><InitializeAuth><UserAreaLayout/></InitializeAuth></AuthGuard>,
        children:[
            {
                path: PATHS.profile,
                element: <SignUp/>,
            },
            {
                path: PATHS.userPost,
                element: <UserPosts typeId={1}/>,
            },
            {
                path: PATHS.userQuestion,
                element: <UserPosts typeId={2}/>,
            },
        ],
    },
    {
        path: PATHS.signIn,
        //element: <GuestGuard><LoginPage /></GuestGuard>,
        element: <SignIn/>
    },
    {
        path: PATHS.signIn2,
        //element: <GuestGuard><LoginPage /></GuestGuard>,
        element: <SignIn2/>
    },
    {
        path: PATHS.signUp,
        element: <SignUp/>
    },
    {
        path: '/',
        element: <Navigate to={PATHS.home} />,
        index: true
    },
    {
        path: '*',
        element: <h1>404</h1>
    },
]);
