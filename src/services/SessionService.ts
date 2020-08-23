import {NewUser} from "../model/NewUser";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import { LoginUser } from "../model/LoginUser";
import translateGender from "../utils/translateGender";

export interface ResponseRegister {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}

export function register(values: NewUser): Promise<AxiosResponse<ResponseRegister>> {
    values.gender = translateGender(values.gender);
    return axios.post<ResponseRegister>(`${baseURL}/signup`, values);
}

export function login(values: LoginUser): Promise<LoginUser> {
    return new Promise((resolve, reject)=> setTimeout(() => resolve(values), 1000));
}

export function logout() {
    localStorage.clear();
}
