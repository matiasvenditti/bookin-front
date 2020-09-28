import {NewUser} from "../model";
import axios, {AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import { LoginUser } from "../model/LoginUser";
import ResponseRegister from "../model/responses/ResponseRegister";
import ResponseLogin from "../model/responses/ResponseLogin";


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
}


export default SessionService;
