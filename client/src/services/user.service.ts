import { User } from '../types/user.types';
import axios from '../utils/axios';


// export const getUserApi = async () => {
//     const response = await axios.get('/User')
//     const users = response.data
//     return users
// }
export const getUserByIdApi = async (id:Number) => {
    const response = await axios.get(`/User/${id}`)
    const user = response.data
    return user
}

export const addUserApi = async (user: Omit<User, 'id'>) => {
    const response = await axios.post('/User', user)
    const newUser = response.data
    return newUser
}

export const updateUserApi = async (user: User) => {
    const response = await axios.put(`/User/${user.id}`, user)
    const updatedUser = response.data
    return updatedUser
}

export const deleteUserApi = async (id: number) => {
    const response = await axios.delete(`/User/${id}`)
    return response
}
