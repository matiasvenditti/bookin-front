import { NewBook } from "../model/NewBook";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "../utils/Interceptors/Inerceptors";
import { baseURL } from "./EnvironmentService";
import { Book } from "../model";
import { Author } from "../model/Author";
import { UpdateBook } from "../model/UpdateBook";


class BooksService {

    static createBook = (book: NewBook, photo: File): Promise<AxiosResponse<Book>> => {
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
    
    static getBookData = (id: number): Promise<AxiosResponse<Book>> => {
        return instance.get<Book>(`${baseURL}/books/${id}`)
    }
    
    static getBookAuthors = (id: number): Promise<AxiosResponse<Author[]>> => {
        return instance.get<Author[]>(`${baseURL}/books/${id}/authors`)
    }
    
    static updateBook = (book: UpdateBook, photo: File): Promise<AxiosResponse<Book>> => {
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

    static deleteBook = (id: number): Promise<AxiosResponse<Book>> => {
        return instance.delete<Book>(`${baseURL}/books/${id}`)
    }

    // TODO: finish request to work
    static searchBooks = (query: string): Promise<AxiosResponse<Book[]>> => {
        return instance.get<Book[]>(`${baseURL}/books/search?key=${query}`)
    }
}


export default BooksService;
