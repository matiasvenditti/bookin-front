import {NewAuthor} from "../model/NewAuthor";
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import {instance} from "../utils/Interceptors/Inerceptors";
import {Book, UpdateAuthor} from "../model";
import { Author } from "../model/Author";



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
    return instance.put<Author>(`${baseURL}/authors/${author.id}`, changeAuthorForm, config)
}


const getAuthorData = (id: number): Promise<AxiosResponse<Author>> => {
    return instance.get<Author>(`${baseURL}/authors/${id}`)
}

const getAuthors = (): Promise<AxiosResponse<Author[]>> => {
    return instance.get<Author[]>(`${baseURL}/authors/`)
}

const deleteAuthor = (id: number): Promise<AxiosResponse<Author>> => {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.delete<Author>(`${baseURL}/authors/${id}`, config)
}

const getAuthorBooks = (id: number): Promise<AxiosResponse<Book[]>> => {
    return instance.get<Book[]>(`${baseURL}/authors/${id}/books`)
}

export {
    createAuthor,
    getAuthorData,
    deleteAuthor,
    changeAuthorData,
    getAuthors,
    getAuthorBooks
}