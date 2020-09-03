import {baseURL} from "../../services/EnvironmentService";
import axios, { AxiosRequestConfig} from 'axios';

const instance = axios.create({baseURL})

instance.interceptors.request.use((req: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;    }
    return req;
});
export {
    instance
}