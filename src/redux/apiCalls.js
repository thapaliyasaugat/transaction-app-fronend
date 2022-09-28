import { loginError, loginStart, loginSuccess, userLogout } from "./User"
import { publicRequest } from "../requestMethod"
export const login = async (dispatch, data) => {
    console.log("login api calls: " + data);
    try {
        dispatch(loginStart())
        const user = await publicRequest.post("/auth/signin", data);
        console.log(user.data)
        localStorage.setItem('userDetail', JSON.stringify(user.data))
        dispatch(loginSuccess(user.data))
        window.location.reload(true)
    } catch (error) {
        dispatch(loginError())
    }
}


export const logout = (dispatch) => {
    console.log("logout called.")
    dispatch(userLogout())
    localStorage.removeItem('userDetail')
}