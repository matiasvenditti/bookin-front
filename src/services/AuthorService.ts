import {NewAuthor} from "../model/NewAuthor";
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import { instance } from "../utils/Interceptors/Inerceptors";


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
    createAuthorForm.append("author", new Blob([JSON.stringify(author)], {type: 'application/json'}));
    createAuthorForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.post<Author>(`${baseURL}/authors`, createAuthorForm, config)
}
export {
    createAuthor
}