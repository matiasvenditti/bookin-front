import {NewAuthor} from "../model/NewAuthor";
<<<<<<< HEAD
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import { instance } from "../utils/Interceptors/Inerceptors";
=======
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import {instance} from "../utils/Interceptors/Inerceptors";
import {AuthorEditInterface, AuthorID} from "../model";
>>>>>>> origin/feature/AuthorView


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
<<<<<<< HEAD
export {
    createAuthor
=======

const getAuthorData = (authorID: AuthorID): Promise<AxiosResponse<Author>> => {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.post<Author>(`${baseURL}/authors/${authorID}`, config)
}

const changeAuthorData = (author: AuthorEditInterface, photo: File): Promise<AxiosResponse<Author>> => {
    const changeAuthorForm = new FormData();
    changeAuthorForm.append("author", new Blob([JSON.stringify(author)], {type: 'application/json'}));
    changeAuthorForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.post<Author>(`${baseURL}/authors/update/${author.id}`, changeAuthorForm, config)
}

const deleteAuthor = (author: AuthorID): Promise<AxiosResponse<Author>> => {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.post<Author>(`${baseURL}/authors/delete/${author.id}`, config)
}


export {
    createAuthor,
    getAuthorData,
    changeAuthorData,
    deleteAuthor
>>>>>>> origin/feature/AuthorView
}