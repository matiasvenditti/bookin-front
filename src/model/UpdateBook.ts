import {Author} from "./Author";


export interface UpdateBook {
    id: string,
    title: string,
    genre: string,
    language: string,
    date: string,
    authors: Author[]
}