import { configureStore, combineReducers } from "@reduxjs/toolkit";
import User from "./User";

const reducer = combineReducers({
    user: User,
})

export const store = configureStore({
    reducer: reducer
})