import {User} from "../model";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
//import { Gender } from "../model/Gender";
import {instance} from "../utils/Interceptors/Inerceptors";

// User API calls to our server separated from component logic.
export function getAllUsers(): Promise<AxiosResponse<User[]>> {
    return instance.get(`${baseURL}/users`)
}

// User API calls to our server separated from component logic.
export function getUserData(): Promise<AxiosResponse<User[]>> {
    return instance.get(`${baseURL}/users/me`)
}

export function changeUserData(id: number, values: User): Promise<User> {
    console.log('change user data', values);
    // return new Promise((resolve, reject) => resolve(
    //     {
    //         firstName: 'Mock User',
    //         lastName: 'Mockerino',
    //         email: 'mockuser123@mail.com',
    //         gender: Gender.M,
    //         photo: '',
    //     }
    // ))
    return axios.put(`${baseURL}/users/${id}`, values)
}