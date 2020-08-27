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
    createAuthorForm.append("author", new Blob([JSON.stringify(author)], {type: 'application/json'}));
    createAuthorForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXRpYXN2ZW5kaXR0aUBnbWFpbC5jb20iLCJleHAiOjE1OTkyNzc1NzAsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXX0.I6iIYCxDHwNUeyO_5sNd0yxQSInujulW9BSz_o8HmWSOVgfZKH3ohUws9g00DdGG-42J2dYUuTDw3Shdh35eBA'
        }
    }
    return axios.post<Author>(`${baseURL}/authors`, createAuthorForm, config)
}
export {
    createAuthor
}