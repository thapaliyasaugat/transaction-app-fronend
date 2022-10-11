import { loginError, loginStart, loginSuccess, userLogout } from "./User"
import { publicRequest } from "../requestMethod"
import { toast } from "react-toastify";
export const login = async (dispatch, data) => {
    try {
        dispatch(loginStart())
        const user = await publicRequest.post("/auth/signin", data);
        console.log("userData:: " + user.data)
        localStorage.setItem('userDetail', JSON.stringify(user.data))
        dispatch(loginSuccess(user.data))
        window.location.reload(true)
    } catch (error) {
        dispatch(loginError())
        toast(error?.response?.data?.message);
        toast(error?.response?.data?.email);
        toast(error?.response?.data?.password);
    }
}


export const logout = (dispatch) => {
    console.log("logout called.")
    dispatch(userLogout())
    localStorage.removeItem('userDetail')
}