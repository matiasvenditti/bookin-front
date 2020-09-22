import { NewBook } from "../model/NewBook";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "../utils/Interceptors/Inerceptors";
import { baseURL } from "./EnvironmentService";
import { Book } from "../model/Book";
import { BookID } from "../model/BookID";
import { Author } from "../model/Author";


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
    
    static getBookData = (bookID: BookID): Promise<AxiosResponse<Book>> => {
        return instance.get<Book>(`${baseURL}/books/${bookID.id}`)
    }
    
    static getBookAuthors = (bookID: BookID): Promise<AxiosResponse<Author[]>> => {
        return instance.get<Author[]>(`${baseURL}/books/${bookID.id}/authors`)
    }
    
    static deleteBook = (bookID: BookID): Promise<AxiosResponse<Book>> => {
        return instance.delete<Book>(`${baseURL}/books/${bookID.id}`)
    }

    // TODO: finish request to work
    static searchBooks = (query: string): Promise<AxiosResponse<Book[]>> => {
        return instance.get<Book[]>(`${baseURL}/books/search`)
    }
}


export default BooksService;
