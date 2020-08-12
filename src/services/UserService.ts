import {User} from "../model/User";
import axios, {AxiosResponse} from 'axios';

export function getAllUsers(): Promise<AxiosResponse<User[]>> {
    return axios.get<User[]>("http://localhost:8080/users");
}