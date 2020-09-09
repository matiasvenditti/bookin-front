import {Book, BookID} from "../model";
import {AxiosResponse} from "axios";
import {instance} from "../utils/Interceptors/Inerceptors";
import {baseURL} from "./EnvironmentService";

const getBookData = (bookID: BookID): Promise<AxiosResponse<Book>> => {
    return instance.get<Book>(`${baseURL}/books/${bookID.id}`)
}

const deleteBook = (bookID: BookID): Promise<AxiosResponse<Book>> => {
    return instance.delete <Book>(`${baseURL}/books/${bookID.id}`)
}

export {
    getBookData,
    deleteBook,
}