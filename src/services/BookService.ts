import { NewBook } from "../model/NewBook";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "../utils/Interceptors/Inerceptors";
import { baseURL } from "./EnvironmentService";
import { Book } from "../model/Book";
import { BookID } from "../model";
import { Author } from "../model/Author";
import {UpdateBook} from "../model";


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

const updateBook = (book: UpdateBook, photo: File): Promise<AxiosResponse<Book>> => {
    const updateBookForm = new FormData();
    updateBookForm.append("book", new Blob([JSON.stringify(book)], {type: 'application/json'}));
    updateBookForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.put<Book>(`${baseURL}/books/${book.id}`, updateBookForm, config)
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
    createBook,
    updateBook

}