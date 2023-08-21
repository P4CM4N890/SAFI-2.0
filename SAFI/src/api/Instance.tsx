import axios from "axios";

export const apiSafi = axios.create({
    baseURL: "http://20.241.232.187:8000/",
    // baseURL: "http://localhost:8000",
});