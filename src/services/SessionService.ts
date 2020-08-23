import {NewUser} from "../model/NewUser";
import axios, {AxiosResponse} from 'axios';
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
export function register(values: NewUser): void {
    values.gender = translateGender(values.gender);
    axios.post<ResponseRegister>(`${baseURL}/signup`, values);
}


/* Login */
export interface ResponseLogin {
    
}
export function login(values: LoginUser): void {
    axios.post<ResponseLogin>(`${baseURL}/login`, values)
        .then((response: AxiosResponse<ResponseLogin>) => {
            saveLoginResponse(response);
        })
        .catch((error) => console.error(error));
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
