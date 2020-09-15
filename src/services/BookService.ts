import { NewBook } from "../model/NewBook";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "../utils/Interceptors/Inerceptors";
import { baseURL } from "./EnvironmentService";
import { Book } from "../model/Book";
import { BookID } from "../model/BookID";
import { Author } from "../model/Author";


const createBook = (book: NewBook, photo: File): Promise<AxiosResponse<Book>> => {
    const createBookForm = new FormData();
    createBookForm.append("book", new Blob([JSON.stringify(book)], {type: 'application/json'}));
    createBookForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.post<Book>(`${baseURL}/books`, createBookForm, config)
}

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
    getBookAuthors,
    createBook

}