import {User} from "../model";
import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {baseURL} from "./EnvironmentService";
import {instance} from "../utils/Interceptors/Inerceptors";
import ResponseUpdate from "../model/responses/ResponseUpdate";
import ResponseDelete from "../model/responses/ResponseDelete";


class UserService {

    // User API calls to our server separated from component logic.
    static getAllUsers(): Promise<AxiosResponse<User[]>> {
        return instance.get(`${baseURL}/users`)
    }
    
    // User API calls to our server separated from component logic.
    static getUserData(): Promise<AxiosResponse<User>> {
        return instance.get<User>(`${baseURL}/users/me`)
    }
    
    /* Update User  */
    
    static updateProfile(id: number, user: User, photo: File): Promise<AxiosResponse> {
        const formData = new FormData();
        delete user.photo;
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
    
    static deleteProfile(id: number): Promise<AxiosResponse> {
        return instance.delete<ResponseDelete>(`${baseURL}/users/${id}`);
    }
}


export default UserService;
