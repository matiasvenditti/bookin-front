import {User} from "../model";
import {AxiosResponse} from 'axios';
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
    var formData = new FormData();
    formData.append('photo', photo);
    return instance.put<ResponseUpdate>(`${baseURL}/users/${id}`, {user, formData});
}

/* Delete user */
export interface ResponseDelete {}

export function deleteProfile(id: number): Promise<AxiosResponse> {
    return instance.delete<ResponseDelete>(`${baseURL}/users/${id}`);
}
