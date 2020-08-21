import {NewUser} from "../model/NewUser";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";


export function register(values: NewUser): Promise<NewUser> {
    return new Promise((resolve, reject)=>setTimeout(() => resolve(values), 1000));
    // return axios.post<NewUser>(`${baseURL}/register`, values);
}
