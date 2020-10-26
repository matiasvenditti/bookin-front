import jwt_decode from 'jwt-decode';
import { AxiosResponse } from 'axios';
import { DecodedToken } from '../model/DecodedToken';
import {ACCESS_TOKEN} from "./EnvironmentService";
import ResponseLogin from '../model/responses/ResponseLogin';
import SessionService from './SessionService';


class AuthService {

    /**
     * @description auxiliary function
     * @return { DecodedToken } data included in the token
     */
    static getDecodedToken = (): DecodedToken => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            return jwt_decode(token);
        } else return {authorities: [], exp: -1, sub: ''};
    }
    
    static getEncodedToken = (): string => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token !== null) {
            return token;
        } else return '';
    }
    
    /**
     * @description saves token in localStorage, this method is called
     * when login request is successful.
     * @param { AxiosResponse<ResponseLogin> } response from back which has
     * token inside
     */
    static saveLoginResponse = (response: AxiosResponse<ResponseLogin>) => {
        const token = response.headers["authorization"].split(' ')[1];
        localStorage.setItem(ACCESS_TOKEN, token);
    }
     
    /**
     * @return { boolean } checks validity of token
     *  - token is null -> not logged in
     *  - token not null but expired -> logout -> not logged in
     *  - token not null and not expired -> logged in
     */
    static isLoggedIn = () => {
        const decodedToken: DecodedToken = AuthService.getDecodedToken();
        if (new Date().getTime() > decodedToken.exp * 1000) {
            // my token expired
            SessionService.logout(); 
            return false;
        } else {
            return true;
        }
    };
    
    /**
     * @description gets user role (stored in token in localStorage) and
     * tells whether the user has the requiredRoles
     * @param { string[] } requiredRoles roles that the user needs to have,
     * @return { boolean } whether any of the requiredRoles are not present
     * in the user data 
     */
    static isAuthorized = function(requiredRoles: string[]) {
        const userRoles: string[] = AuthService.getDecodedToken().authorities;
        return requiredRoles.every(role => userRoles.includes(role));
    };
}


export default AuthService;
