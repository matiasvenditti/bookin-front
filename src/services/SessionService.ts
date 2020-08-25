import {NewUser} from "../model/NewUser";
import axios, {AxiosResponse, AxiosPromise} from 'axios';
import {baseURL} from "./EnvironmentService";
import { LoginUser } from "../model/LoginUser";
import translateGender from "../utils/translateGender";
import { saveLoginResponse, getDecodedToken } from './AuthService';
import { DecodedToken } from "../model/DecodedToken";


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
export interface ResponseLogin {
    
}

export function login(values: LoginUser): Promise<AxiosResponse> {
    return axios.post<ResponseLogin>(`${baseURL}/login`, values);
}


/* User Profile Data */
export function getProfileData() {
    const decodedToken: DecodedToken = getDecodedToken();
    return decodedToken.sub; // TODO only user mail, prob will change
}


/* Logout */
export function logout() {
    localStorage.clear();
}
