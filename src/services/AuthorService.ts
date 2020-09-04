import {NewAuthor} from "../model/NewAuthor";
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import {instance} from "../utils/Interceptors/Inerceptors";
import {AuthorID} from "../model";
import {UpdateAuthor} from "../model/UpdateAuthor";


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

const changeAuthorData = (author: UpdateAuthor, photo: File): Promise<AxiosResponse<Author>> => {
    const changeAuthorForm = new FormData();
    changeAuthorForm.append("author", new Blob([JSON.stringify(author)], {type: 'application/json'}));
    changeAuthorForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.put<Author>(`${baseURL}/authors/update/${author.id}`, changeAuthorForm, config)
}


const getAuthorData = (authorID: AuthorID): Promise<AxiosResponse<Author>> => {
    return instance.get<Author>(`${baseURL}/authors/${authorID.id}`)
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
    deleteAuthor,
    changeAuthorData
}