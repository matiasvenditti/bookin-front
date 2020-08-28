import {baseURL} from "../../services/EnvironmentService";
import axios, { AxiosRequestConfig} from 'axios';

const instance = axios.create({baseURL})

instance.interceptors.request.use((req: AxiosRequestConfig) => {
    console.log("In Request Interceptor");
    const token = localStorage.getItem("token");
    if (token) {
        console.log("Tiene token");
        req.headers.Authorization = `Bearer ${token}`;    }
    return req;
});
export {
    instance
}