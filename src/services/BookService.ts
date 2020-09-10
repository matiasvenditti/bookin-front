import {Book, BookID} from "../model";
import {AxiosResponse} from "axios";
import {instance} from "../utils/Interceptors/Inerceptors";
import {baseURL} from "./EnvironmentService";
import {Author} from "../model/Author";

const getBookData = (bookID: BookID): Promise<AxiosResponse<Book>> => {
    return instance.get<Book>(`${baseURL}/books/${bookID.id}`)
}

const getBookAuthors = (bookID: BookID): Promise<AxiosResponse<Author[]>> => {
    return instance.get<Author[]>(`${baseURL}/books/${bookID.id}/authors`)
}

const deleteBook = (bookID: BookID): Promise<AxiosResponse<Book>> => {
    return instance.delete <Book>(`${baseURL}/books/${bookID.id}`)
}

export {
    getBookData,
    deleteBook,
    getBookAuthors
}