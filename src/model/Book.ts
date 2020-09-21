export class Book {
    id: number;
    title: string;   
    genre: string;
    language: string;
    release: Date;
    photo: string;

    constructor(){
        this.id = 0;
        this.title = '';
        this.genre = '';
        this.language = '';
        this.release = new Date();
        this.photo = '';
    }

}

