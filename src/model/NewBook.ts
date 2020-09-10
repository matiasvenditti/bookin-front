import { Author } from "./Author";

export interface NewBook {
    title: string,
    genre: string, 
    language: string,
    date: string,
    authors: Author[]
}