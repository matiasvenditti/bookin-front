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

    static passwordRecovery = (email: string) => {
        console.log(`password recovery request for: ${email}, todo endpoint`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(() => console.log('yay'));
            }, 1500);
            // setTimeout(() => {
            //     reject(() => console.log('nay'));
            // }, 1500);
        })
    }

    static sendPasswordRecovery = (password: string) => {
        console.log(`send password recovery request for: ${password}, todo endpoint`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(() => console.log('yay'));
            }, 1500);
            // setTimeout(() => {
            //     reject(() => console.log('nay'));
            // }, 1500);
        })
    }
}


export default SessionService;
