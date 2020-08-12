import {User} from "../model/User";
import axios, {AxiosResponse} from 'axios';

// User API calls to our server separated from component logic.
export function getAllUsers(): Promise<AxiosResponse<User[]>> {
    return axios.get<User[]>("http://localhost:8080/users");
}