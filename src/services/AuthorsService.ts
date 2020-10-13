import {NewAuthor} from "../model/NewAuthor";
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseURL} from "./EnvironmentService";
import {instance} from "../utils/Interceptors/Inerceptors";
import {Book, UpdateAuthor} from "../model";
import { Author } from "../model/Author";
import { Filters } from "../model/results/Filters";


class AuthorsService {

    static createAuthor = (author: NewAuthor, photo: File): Promise<AxiosResponse<Author>> => {
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
    
    static  changeAuthorData = (author: UpdateAuthor, photo: File): Promise<AxiosResponse<Author>> => {
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
    
    static  getAuthorData = (id: number): Promise<AxiosResponse<Author>> => {
        return instance.get<Author>(`${baseURL}/authors/${id}`)
    }
    
    static  getAuthors = (): Promise<AxiosResponse<Author[]>> => {
        return instance.get<Author[]>(`${baseURL}/authors/`)
    }
    
    static  deleteAuthor = (id: number): Promise<AxiosResponse<Author>> => {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': undefined,
            }
        }
        return instance.delete<Author>(`${baseURL}/authors/${id}`, config)
    }

    static getAuthorBooks = (id: number): Promise<AxiosResponse<Book[]>> => {
        return instance.get<Book[]>(`${baseURL}/authors/${id}/books`)
    }

    // filters wont be used for author searching, only text query
    static searchAuthors = (query: Filters): Promise<AxiosResponse<Author[]>> => {
        // TODO: back missing another parameters
        // &genre=${}&language=${} 
        return instance.get<Author[]>(`${baseURL}/authors/search?name=${query.text}`)
        // return instance.get<Author[]>(`${baseURL}/authors/search?fullName=${query.text}`)
    }
    
    // TODO: back missing simple search
    static searchAuthorsSimple = (query: string): Promise<AxiosResponse<Author[]>> => {
        return instance.get<Author[]>(`${baseURL}/authors/search?name=${query}`)
    }
    // filters wont be used for author searching, only text query
    // static searchAuthors = (query: string | Filters): Promise<AxiosResponse<Author[]>> => {
    //     if (typeof query === 'string') {
    //         return instance.get<Author[]>(`${baseURL}/authors/search?key=${query}`);
    //     } else {
    //         // TODO endpoint for filters
    //         return instance.get<Author[]>(`${baseURL}/authors/search?key=${query}`);
    //     }
    // }
}


export default AuthorsService;
