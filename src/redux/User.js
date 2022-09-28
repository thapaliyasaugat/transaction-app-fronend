import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentuser: JSON.parse(localStorage.getItem('userDetail')) || null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.currentuser = null;
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            console.log(action.payload);
            state.currentuser = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginError: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = true;
        },
        userLogout: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = false;
        }
    }
})

export const { loginStart, loginSuccess, loginError, userLogout } = userSlice.actions;
export default userSlice.reducer;