import {NewAuthor} from "../model/NewAuthor";
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";


export interface Author {
    id: number,
    firstname: string,
    lastname: string,
    nationality: string,
    date_of_birth: Date,
    photo: string,
}

const createAuthor = (author: NewAuthor, photo: File): Promise<AxiosResponse<Author>> => {
    const createAuthorForm = new FormData();
    createAuthorForm.append("author", JSON.stringify(author)); 
    createAuthorForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    return axios.post<Author>(`${baseURL}/authors`, createAuthorForm, config)
}
export {
    createAuthor
}