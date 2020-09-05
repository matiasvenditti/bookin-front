import {User} from "../model";
import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {baseURL} from "./EnvironmentService";
import {instance} from "../utils/Interceptors/Inerceptors";

// User API calls to our server separated from component logic.
export function getAllUsers(): Promise<AxiosResponse<User[]>> {
    return instance.get(`${baseURL}/users`)
}

// User API calls to our server separated from component logic.
export function getUserData(): Promise<AxiosResponse<User[]>> {
    return instance.get(`${baseURL}/users/me`)
}

/* Update User  */
export interface ResponseUpdate {}

export function updateProfile(id: number, user: User, photo: any): Promise<AxiosResponse> {
    const formData = new FormData();
    delete user.photo;
    console.log('uploading', user, photo);
    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));
    formData.append('photo', photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.put<ResponseUpdate>(`${baseURL}/users/${id}`, formData, config)
}

/* Delete user */
export interface ResponseDelete {}

export function deleteProfile(id: number): Promise<AxiosResponse> {
    return instance.delete<ResponseDelete>(`${baseURL}/users/${id}`);
}
