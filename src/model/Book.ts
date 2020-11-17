import { Author } from "./Author";

export class Book {
    id: number;
    title: string;
    genre: string;
    language: string;
    date: Date;
    photo: string;
    stars: number;
    authors: Author[];

    constructor(){
        this.id = 0;
        this.title = '';
        this.genre = '';
        this.language = '';
        this.date = new Date();
        this.photo = '';
        this.stars = 0;
        this.authors = [];
    }
}
