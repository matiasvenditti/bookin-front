export class Review {
    id: number;
    comment: string;
    stars: number;
    createdAt: Date;
    userId: number;
    bookId: number;

    constructor(){
        this.id = 0;
        this.comment = '';
        this.stars = 0;
        this.createdAt = new Date;
        this.userId = 0;
        this.bookId = 0;
    }
}