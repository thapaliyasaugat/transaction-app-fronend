import axios from 'axios';

// const BASE_URL = "http://localhost:8080/api";
const BASE_URL = "http://10.10.29.114:8080/api";
const token = JSON.parse(localStorage.getItem('userDetail'))?.data?.token;
console.log("req token :: ", token)

export const publicRequest = axios.create({ baseURL: BASE_URL, })

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { HEADER_STRING: `${token}` },
});