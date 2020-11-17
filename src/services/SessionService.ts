import {NewUser} from "../model";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import { LoginUser } from "../model/LoginUser";
import ResponseRegister from "../model/responses/ResponseRegister";
import ResponseLogin from "../model/responses/ResponseLogin";
import { instance } from "../utils/Interceptors/Inerceptors";


class SessionService {
        
    static register = (values: NewUser): Promise<AxiosResponse> => {
        return axios.post<ResponseRegister>(`${baseURL}/signup`, values)
    }
    
    static login = (values: LoginUser): Promise<AxiosResponse> => {
        return axios.post<ResponseLogin>(`${baseURL}/login`, values);
    }
    
    /* Logout */
    static logout = () => {
        localStorage.clear();
    }

    static passwordRecovery = (email: string) => {
        return instance.post(`${baseURL}/users/resetPassword?email=${email}`);
    }

    static resetPasswordValidateToken = (token: string) => {
        return instance.get(`${baseURL}/users/validateToken?token=${token}`);        
    }
    
    static sendPasswordRecovery = (passwordId: {id: number, password: string}) => {
        return instance.post(`${baseURL}/users/newPassword`, passwordId);        
    }
}


export default SessionService;
