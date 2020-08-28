import {User} from "../model";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import {getEncodedToken} from "./AuthService";

function addHeaders<T1>(url:string) :Promise<AxiosResponse<T1>>{
    axios.defaults.headers.common['Authorization'] = 'Bearer' + getEncodedToken()
    return axios.get<T1>(url);
}


// User API calls to our server separated from component logic.
export function getAllUsers(): Promise<AxiosResponse<User[]>> {
    return addHeaders(`${baseURL}/users`)
}

// User API calls to our server separated from component logic.
export function getUserData(): Promise<AxiosResponse<User[]>> {
    return addHeaders(`${baseURL}/users/me`)
}