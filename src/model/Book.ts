export class Book {
    id: number;
    title: string;   
    genre: string;
    languaje: string;
    release: Date;
    photo: string;
    rating: number;

    constructor(){
        this.id = 0;
        this.title = '';
        this.genre = '';
        this.languaje = '';
        this.release = new Date();
        this.photo = '';
        this.rating = 0;
    }
}
