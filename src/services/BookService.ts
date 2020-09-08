import { NewBook } from "../model/NewBook";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "../utils/Interceptors/Inerceptors";
import { baseURL } from "./EnvironmentService";
import { Book } from "../model/Book";


const createBook = (book: NewBook, photo: File): Promise<AxiosResponse<Book>> => {
    const createBookForm = new FormData();
    createBookForm.append("author", new Blob([JSON.stringify(book)], {type: 'application/json'}));
    createBookForm.append("photo", photo);
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': undefined,
        }
    }
    return instance.post<Book>(`${baseURL}/books`, createBookForm, config)
}

export{
    createBook
}