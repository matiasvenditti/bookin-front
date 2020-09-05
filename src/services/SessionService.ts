import {NewUser} from "../model";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import { LoginUser } from "../model/LoginUser";
import translateGender from "../utils/translateGender";
import {getUserData} from "./UserService";
import {User} from "../model";


/* Register */
export interface ResponseRegister {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}

export function register(values: NewUser): Promise<AxiosResponse> {
    values.gender = translateGender(values.gender);
    return axios.post<ResponseRegister>(`${baseURL}/signup`, values)
}

/* Login */
export interface ResponseLogin {}

export function login(values: LoginUser): Promise<AxiosResponse> {
    return axios.post<ResponseLogin>(`${baseURL}/login`, values);
}

/* Logout */
export function logout() {
    localStorage.clear();
}
