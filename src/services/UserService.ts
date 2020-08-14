import {User} from "../model/User";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";

// User API calls to our server separated from component logic.
export function getAllUsers(): Promise<AxiosResponse<User[]>> {
    return axios.get<User[]>(`${baseURL}/users`);
}