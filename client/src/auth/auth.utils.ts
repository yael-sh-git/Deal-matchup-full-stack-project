import { PATHS } from "../routes/paths";
import { AuthUser } from "../types/user.types";
import axios from "../utils/axios";

// שומרת את המשתמש ב- localStorage
//בעתיד HTTP כדי להוסיף אותו לבקשות Authorization מגדירה 
export const setSession = (user:{id:number, token: string}) => {
    localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
}

//פונקציה שמקבלת token ומגדירה אותו בכותרת ה-Authorization של axios.
export const setAuthorizationHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

//localStorage מחזירה את פרטי המשתמש מה 
export const getSession = (): AuthUser | null => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user
}

//localStorage מסירה את פרטי המשתמש מה 
//axios של Authorization מנקה את ה 
export const removeSession = () => {
    localStorage.removeItem('user');
    axios.defaults.headers.common.Authorization = undefined;
    window.location.href = PATHS.home;
}

//מפענחת טוקן
export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}


export const isValidToken = (token: string) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};
