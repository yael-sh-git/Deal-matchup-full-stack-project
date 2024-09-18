import { ENDPOINTS } from "../api/endpoints"
import { AuthUser, LoginUser } from "../types/user.types"
import axios from "../utils/axios"

export const login = async (loginUser:LoginUser) => {
    const response = await axios.post(`${ENDPOINTS.login}`,loginUser)
    return response.data
        // user: { email, password },
        // token: response.data
    
}
